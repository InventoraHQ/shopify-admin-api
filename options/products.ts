import { FieldOptions, ListOptions, PublishedOptions, DateOptions } from './base';

export interface ProductBaseOptions {

    /**
     * Filter by product vendor
     */
    vendor?: string;

    /**
     * Filter Redirects with given target
     */
    product_type?: string;

    /**
     * Filter by collection id
     */
    collection_id?: string;
}

export interface ProductCountOptions extends ProductBaseOptions, DateOptions, PublishedOptions {}

export interface ProductListOptions extends ProductBaseOptions, ListOptions, DateOptions, PublishedOptions, FieldOptions {

    /**
     * A comma-separated list of product ids
     */
    ids?: string;

    title?: string

    vendor?: string

    product_type?: string

    collection_id?: string
}

export interface ProductGetOptions extends FieldOptions {}