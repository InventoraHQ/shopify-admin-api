const joinPaths = require('url-join');
import fetch from 'node-fetch';
import ShopifyError from './shopify_error';
import uri = require("jsuri");
// TODO use https://www.npmjs.com/package/bottleneck
// used on https://github.com/dcworldwide/Shopify-Prime/blob/master/infrastructure/base_service.ts?
import PQueue from 'p-queue';

export interface CallLimits {
    timestamp: number | undefined;
    remaining: number | undefined;
    current: number | undefined;
    max: number | undefined;
}

class ApiInfo {
    accessToken: string;
    requestQueue: PQueue;
    constructor(accessToken: string) {
        this.accessToken = accessToken;
        this.requestQueue = new PQueue({ concurrency: 30 });
    }
    private _callLimits: CallLimits = {
        timestamp: undefined,
        remaining: undefined,
        current: undefined,
        max: undefined,
    }
    setCallLimits(val: string): CallLimits {
        const [current, max] = val.split('/').map(s => parseInt(s));
        this._callLimits.timestamp = Date.now();
        this._callLimits.remaining = max - current;
        this._callLimits.max = max;
        this._callLimits.current = current;
        return this._callLimits;
    }
    getCallLimits(): CallLimits {
        let limits = { ...this._callLimits};
        const secondsPassed = (Date.now()-limits.timestamp)/1000;
        limits.current = Math.max(0, limits.current - 2*(secondsPassed));
        limits.remaining = limits.max - limits.current;
        return limits;
    }
}

export class BaseService {
    private static apiInfo: { [key: string]: ApiInfo } = {};

    constructor(private shopDomain: string, private accessToken: string, private resource: string) {
        //Ensure resource starts with admin/
        if (! /^[\/]?admin\//ig.test(resource)) {
            this.resource = "admin/api/2024-07/" + resource;
        }
        if (!BaseService.apiInfo[shopDomain] || BaseService.apiInfo[shopDomain].accessToken !== accessToken) {
            BaseService.apiInfo[shopDomain] = new ApiInfo(accessToken);
        }
    }

    public getCallLimits(): CallLimits {
        return BaseService.apiInfo[this.shopDomain].getCallLimits();
    }

    public static buildDefaultHeaders() {
        const headers = {
            "Accept": "application/json",
            "User-Agent": `Shopify Admin API (https://github.com/ArtCodeStudio/shopify-admin-api)`
        }

        return headers;
    }

    /**
     * Joins URI paths into one single string, replacing bad slashes and ensuring the path doesn't end in /.json.
     */
    protected joinUriPaths(...paths: string[]): string {
        return joinPaths(...paths).replace(/\/\.json/ig, ".json");
    }

    protected async createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, rootElement?: string, payload?: Object) {
        method = method.toUpperCase() as any;

        const options = {
            headers: BaseService.buildDefaultHeaders(),
            method: method,
            body: undefined as string,
        };

        if (this.accessToken) {
            options.headers["X-Shopify-Access-Token"] = this.accessToken;
        }

        const url = new uri(this.shopDomain);
        url.protocol("https");
        url.path(this.joinUriPaths(this.resource, path));

        if ((method === "GET" || method === "DELETE") && payload) {
            for (const prop in payload) {
                const value = payload[prop];

                // Shopify expects qs array values to be joined by a comma, e.g. fields=field1,field2,field3
                url.addQueryParam(prop, Array.isArray(value) ? value.join(",") : value);
            }
        }
        else if (payload) {
            options.body = JSON.stringify(payload);

            options.headers["Content-Type"] = "application/json";
        }


        //Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.

        /**
         *  Queue requests and keep the call limit in check.
         *
         *  NOTE: this method is provisory. There are two problems with it:
         *
         *  1. the queue can become arbitrary large, with longer and longer wait times and
         *  eventually memory problems, if an app just keeps on adding request after request.
         *
         *  2. There is still no guarantee that a `too many requests` (code 429) will not happen if a big number of requests is added at once.
         */
        const result = await BaseService.apiInfo[this.shopDomain].requestQueue.add(async () => {
            // Check that we don't hit call limit
            let remaining = this.getCallLimits().remaining;
            if (remaining < 5) {
                return (new Promise(res => setTimeout(res, 10000 - remaining)))
                .then(() => fetch(url.toString(), options));
            }
            // console.log('Fetch url:', url.toString());
            // console.log('options:', options)
            return fetch(url.toString(), options);
        });

        const callLimits = result.headers.get('x-shopify-shop-api-call-limit');

        if (callLimits) {
            BaseService.apiInfo[this.shopDomain].setCallLimits(callLimits);
        }

        // Shopify implement 204 - no content for DELETE requests 
        if (result.status == 204) {
            return
        }

        let json = await result.text() as any;

        try {
            json = JSON.parse(json);
        }
        catch (e) {
            throw new ShopifyError(result, json);
        }

        if (!result.ok) {
            throw new ShopifyError(result, json);
        }

        return rootElement ? json[rootElement] as T : json as T;
    }

    protected async createPaginatedRequest<T>(path: string, rootElement?: string, payload?: Object) {
        const options = {
            headers: BaseService.buildDefaultHeaders(),
            method: "GET",
            body: undefined as string,
        };

        if (this.accessToken) {
            options.headers["X-Shopify-Access-Token"] = this.accessToken;
        }

        let url = new uri(this.shopDomain);
        url.protocol("https");
        url.path(this.joinUriPaths(this.resource, path));

        if (payload) {
            for (const prop in payload) {
                const value = payload[prop];

                // Shopify expects qs array values to be joined by a comma, e.g. fields=field1,field2,field3
                url.addQueryParam(prop, Array.isArray(value) ? value.join(",") : value);
            }
        }


        //Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.

        /**
         *  Queue requests and keep the call limit in check.
         *
         *  NOTE: this method is provisory. There are two problems with it:
         *
         *  1. the queue can become arbitrary large, with longer and longer wait times and
         *  eventually memory problems, if an app just keeps on adding request after request.
         *
         *  2. There is still no guarantee that a `too many requests` (code 429) will not happen if a big number of requests is added at once.
         * 
         *  3. Page links inside of the headers are circular, with the final page link pointing at the first page of results.
         */
        let result = [];

        // The final page of results will be linked back to the first page as the "next" page.
        const visited = new Set();

        while (url) {
            const response = await BaseService.apiInfo[this.shopDomain].requestQueue.add(async () => {
                // Check that we don't hit call limit
                let remaining = this.getCallLimits().remaining;
                if (remaining < 5) {
                    return (new Promise(res => setTimeout(res, 10000 - remaining)))
                    .then(() => fetch(url.toString(), options));
                }
                // console.log('Fetch url:', url.toString());
                // console.log('options:', options)
                return fetch(url.toString(), options);
            });

            const callLimits = response.headers.get('x-shopify-shop-api-call-limit');
    
            if (callLimits) {
                BaseService.apiInfo[this.shopDomain].setCallLimits(callLimits);
            }
    
            // Shopify implement 204 - no content for DELETE requests 
            if (response.status == 204) {
                break;
            }

            let json = await response.text() as any;

            try {
                json = JSON.parse(json);
            }
            catch (e) {
                throw new ShopifyError(response, json);
            }
    
            if (!response.ok) {
                throw new ShopifyError(response, json);
            }

            result = result.concat(rootElement ? json[rootElement] as T : json as T);

            const link: string = response.headers.get('link');

            if (!link) {
                break;
            }

            const links: string[] = link.match(/(?<=\<)(.*?)(?=\>)/) || [];
            // If the request is on the first page, the "next" link will be the first element of the result.
            // If a "previous" link is present, it will be the first element of the result and the "next" link will be the second element.
            const nextLink: string = links.length === 2 ? links[1] : links[0];

            // The final page of results will be linked back to the first page as the "next" page.
            if (visited.has(nextLink)) {
                break;
            } else {
                url = new uri(nextLink);
                visited.add(nextLink);
            }
        }

        return result;
    }
}

export default BaseService;
