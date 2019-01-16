import { ListOptions, PublishedOptions, FieldOptions, DateOptions } from "./base";

export interface CollectionListOptions extends ListOptions, FieldOptions, PublishedOptions, DateOptions, PublishedOptions {
    ids?: string;
    title?: string;
    product_id?: number;
    handle?: string;
    since_id?: number;
}

export interface CollectionCountOptions extends DateOptions, PublishedOptions {
    title?: string;
    product_id?: number
}

export interface CollectionGetOptions extends FieldOptions {}