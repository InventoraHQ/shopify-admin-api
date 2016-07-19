/// <reference path="./../typings/index.d.ts" />
"use strict";
const config = process.env;
// Grab secret keys
const apiKey = config["shopify-prime-apiKey"] || config["apiKey"];
exports.apiKey = apiKey;
const secretKey = config["shopify-prime-secretKey"] || config["secretKey"];
exports.secretKey = secretKey;
const shopDomain = config["shopify-prime-shopDomain"] || config["shopDomain"];
exports.shopDomain = shopDomain;
const accessToken = config["shopify-prime-accessToken"] || config["accessToken"];
exports.accessToken = accessToken;
if (!apiKey) {
    throw new Error(`Expected 'apiKey' in process.env to exist.`);
}
if (!secretKey) {
    throw new Error(`Expected 'secretKey' in process.env to exist.`);
}
if (!shopDomain) {
    throw new Error(`Expected 'shopDomain' in process.env to exist.`);
}
if (!accessToken) {
    throw new Error(`Expected 'accessToken' in process.env to exist.`);
}
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
exports.createGuid = createGuid;