export interface AppliedDiscount {
    description: string;
    value: string;
    title: string;
    amount: string;
    value_type: string;
}

export interface LineItem {
    variant_id: number;
    product_id: number;
    title: string;
    variant_title: string;
    sku: string;
    vendor: string;
    quantity: number;
    requires_shipping: boolean;
    taxable: boolean;
    gift_card: boolean;
    fulfillment_service: string;
    grams: number;
    tax_lines: any[];
    applied_discount: AppliedDiscount;
    name: string;
    properties: any[];
    custom: boolean;
    price: string;
}

export interface ShippingAddress {
    first_name: string;
    address1: string;
    phone: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    last_name: string;
    address2?: any;
    company: string;
    latitude?: any;
    longitude?: any;
    name: string;
    country_code: string;
    province_code: string;
}

export interface BillingAddress {
    first_name: string;
    address1: string;
    phone: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    last_name: string;
    address2?: any;
    company: string;
    latitude?: any;
    longitude?: any;
    name: string;
    country_code: string;
    province_code: string;
}

export interface ShippingLine {
    title: string;
    custom: boolean;
    handle?: any;
    price: string;
}

export interface TaxLine {
    rate: number;
    title: string;
    price: string;
}

export interface DefaultAddress {
    id?: any;
    customer_id?: any;
    first_name?: any;
    last_name?: any;
    company?: any;
    address1: string;
    address2?: any;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone: string;
    name: string;
    province_code: string;
    country_code: string;
    country_name: string;
    default: boolean;
}

export interface Customer {
    id?: any;
    email: string;
    accepts_marketing: boolean;
    created_at?: any;
    updated_at?: any;
    first_name: string;
    last_name: string;
    orders_count: number;
    state: string;
    total_spent: string;
    last_order_id?: any;
    note?: any;
    verified_email: boolean;
    multipass_identifier?: any;
    tax_exempt: boolean;
    phone?: any;
    tags: string;
    last_order_name?: any;
    currency: string;
    accepts_marketing_updated_at?: any;
    marketing_opt_in_level?: any;
    default_address: DefaultAddress;
}

export interface WebhookDraftOrderBase {
    id: number;
    note?: any;
    email: string;
    taxes_included: boolean;
    currency: string;
    invoice_sent_at?: any;
    created_at: Date;
    updated_at: Date;
    tax_exempt: boolean;
    completed_at?: any;
    name: string;
    status: string;
    line_items: LineItem[];
    shipping_address: ShippingAddress;
    billing_address: BillingAddress;
    invoice_url: string;
    applied_discount: AppliedDiscount;
    order_id?: any;
    shipping_line: ShippingLine;
    tax_lines: TaxLine[];
    tags: string;
    note_attributes: any[];
    total_price: string;
    subtotal_price: string;
    total_tax: string;
    admin_graphql_api_id: string;
    customer: Customer;
}

export interface WebhookDraftOrderCreate extends WebhookDraftOrderBase {};
export interface WebhookDraftOrderUpdate extends WebhookDraftOrderBase {};