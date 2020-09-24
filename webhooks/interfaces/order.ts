/**
 * Generated with http://json2ts.com/
 */

export interface DiscountApplication {
    type: string;
    value: string;
    value_type: string;
    allocation_method: string;
    target_selection: string;
    target_type: string;
    description: string;
    title: string;
}

export interface ShopMoney {
    amount: string;
    currency_code: string;
}

export interface PresentmentMoney {
    amount: string;
    currency_code: string;
}

export interface TotalLineItemsPriceSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface TotalDiscountsSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface TotalShippingPriceSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface SubtotalPriceSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface TotalPriceSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface TotalTaxSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface PriceSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface DiscountedPriceSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface ShippingLine {
    id: number;
    title: string;
    price: string;
    code?: any;
    source: string;
    phone?: any;
    requested_fulfillment_service_id?: any;
    delivery_category?: any;
    carrier_identifier?: any;
    discounted_price: string;
    price_set: PriceSet;
    discounted_price_set: DiscountedPriceSet;
    discount_allocations: any[];
    tax_lines: any[];
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

export interface DefaultAddress {
    id: number;
    customer_id: number;
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
    id: number;
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
    admin_graphql_api_id: string;
    default_address: DefaultAddress;
}

export interface TotalDiscountSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface AmountSet {
    shop_money: ShopMoney;
    presentment_money: PresentmentMoney;
}

export interface DiscountAllocation {
    amount: string;
    discount_application_index: number;
    amount_set: AmountSet;
}

export interface LineItem {
    id: any;
    variant_id: number;
    title: string;
    quantity: number;
    sku: string;
    variant_title?: any;
    vendor?: any;
    fulfillment_service: string;
    product_id: number;
    requires_shipping: boolean;
    taxable: boolean;
    gift_card: boolean;
    name: string;
    variant_inventory_management: string;
    properties: any[];
    product_exists: boolean;
    fulfillable_quantity: number;
    grams: number;
    price: string;
    total_discount: string;
    fulfillment_status?: any;
    price_set: PriceSet;
    total_discount_set: TotalDiscountSet;
    discount_allocations: DiscountAllocation[];
    duties: any[];
    admin_graphql_api_id: string;
    tax_lines: any[];
}

export interface WebhookOrdersBase {
    id: number;
    email: string;
    closed_at?: any;
    created_at: Date;
    updated_at: Date;
    number: number;
    note?: any;
    token: string;
    gateway?: any;
    test: boolean;
    total_price: string;
    subtotal_price: string;
    total_weight: number;
    total_tax: string;
    taxes_included: boolean;
    currency: string;
    financial_status: string;
    confirmed: boolean;
    total_discounts: string;
    total_line_items_price: string;
    cart_token?: any;
    buyer_accepts_marketing: boolean;
    name: string;
    referring_site?: any;
    landing_site?: any;
    cancelled_at: Date;
    cancel_reason: string;
    total_price_usd?: any;
    checkout_token?: any;
    reference?: any;
    user_id?: any;
    location_id?: any;
    source_identifier?: any;
    source_url?: any;
    processed_at?: any;
    device_id?: any;
    phone?: any;
    customer_locale: string;
    app_id?: any;
    browser_ip?: any;
    landing_site_ref?: any;
    order_number: number;
    discount_applications: DiscountApplication[];
    discount_codes: any[];
    note_attributes: any[];
    payment_gateway_names: string[];
    processing_method: string;
    checkout_id?: any;
    source_name: string;
    fulfillment_status: string;
    tax_lines: any[];
    tags: string;
    contact_email: string;
    order_status_url: string;
    presentment_currency: string;
    total_line_items_price_set: TotalLineItemsPriceSet;
    total_discounts_set: TotalDiscountsSet;
    total_shipping_price_set: TotalShippingPriceSet;
    subtotal_price_set: SubtotalPriceSet;
    total_price_set: TotalPriceSet;
    total_tax_set: TotalTaxSet;
    total_tip_received: string;
    original_total_duties_set?: any;
    current_total_duties_set?: any;
    admin_graphql_api_id: string;
    shipping_lines: ShippingLine[];
    billing_address: BillingAddress;
    shipping_address: ShippingAddress;
    customer: Customer;
    line_items: LineItem[];
    fulfillments: any[];
    refunds: any[];
}

export interface WebhookOrdersCancelled extends WebhookOrdersBase {};
export interface WebhookOrdersCreate extends WebhookOrdersBase {};
export interface WebhookOrdersFulfilled extends WebhookOrdersBase {};
export interface WebhookOrdersPaid extends WebhookOrdersBase {};
export interface WebhookOrdersPartiallyFulfilled extends WebhookOrdersBase {};
export interface WebhookOrdersUpdated extends WebhookOrdersBase {};