import { Address } from "./address";
import { TaxLine } from "./tax_line";
import { Customer } from "./customer";
import { ShopifyObject } from "./base";
import { LineItem } from "./line_item";
import { Fulfillment } from "./fulfillment";
import { Refund } from "./refund";
import { ShippingLine } from "./shipping_line";
import { DiscountCode } from "./discount_code";
import { DiscountApplication } from "./discount_application";
import { ClientDetails } from "./client_details";
import { PaymentDetails } from "./payment_details";
import { PriceSet } from "./price_set";
import { NoteAttribute } from "./note_attribute";

// Enum imports
import { FinancialStatus } from "../enums/financial_status";
import { FulfillmentStatus } from "../enums/fulfillment_status";

export interface Order extends ShopifyObject {
    /// The ID of the app that created the order.
    app_id: number;

    /// The mailing address associated with the payment method. This address is an optional field that will not be available on orders that do not require one.
    billing_address?: Address;

    /// The IP address of the browser used by the customer when placing the order.
    browser_ip: null | string;

    /// Indicates whether or not the person who placed the order would like to receive email updates from the shop. 
    /// This is set when checking the "I want to receive occasional emails about new products, promotions and other news" checkbox during checkout.    
    buyer_accepts_marketing: boolean;

    /// The reason why the order was cancelled. If the order was not cancelled, this value is null. Known values are "customer", "fraud", "inventory" and "other".
    cancel_reason: null | string;

    /// The date and time when the order was cancelled. If the order was not cancelled, this value is null.    
    cancelled_at: null | string;

    /// Unique identifier for a particular cart that is attached to a particular order.    
    cart_token: null | string;

    // TODO - what is this?
    checkout_id: null | number;

    // TODO - what is this?
    checkout_token: null | string;

    /// A <see cref="ShopifyClientDetails"/> object containing information about the client.
    client_details?: ClientDetails;

    /// The date and time when the order was closed. If the order was not clsoed, this value is null.
    closed_at: string | null;

    // TODO - what is this?
    confirmed: boolean;

    /// The customer's contact email address.
    contact_email: string | null;

    /// The date and time when the order was created in Shopify.    
    created_at: string;

    /// The three letter code (ISO 4217) for the currency used for the payment.    
    currency: string;

    /// A <see cref="ShopifyCustomer"/> object containing information about the customer. This value may be null if the order was created through Shopify POS.    
    customer?: Customer;

    /// Locale string, i.e. 'de', 'en', or null
    customer_locale: null | string;

    /// An ordered list of stacked discount applications.    
    discount_applications: DiscountApplication[];

    /// Applicable discount codes that can be applied to the order.    
    discount_codes: DiscountCode[];

    /// The order's email address. Note?: On and after 2015-11-03, you should be using <see cref="ContactEmail"/> to refer to the customer's email address. 
    /// Between 2015-11-03 and 2015-12-03, updates to an order's email will also update the customer's email. This is temporary so apps can be migrated over to 
    /// doing customer updates rather than order updates to change the contact email. After 2015-12-03, updating updating an order's email will no longer update 
    /// the customer's email and apps will have to use the customer update endpoint to do so.
    email: string;

    /// The financial status of an order. Known values are "authorized", "paid", "pending", "partially_paid", "partially_refunded", "refunded" and "voided".    
    financial_status: FinancialStatus;

    /// An array of <see cref="ShopifyFulfillment"/> objects for this order.
    fulfillments: Fulfillment[];

    /// The fulfillment status for this order. Known values are 'fulfilled', 'partial' or null.
    fulfillment_status: "fulfilled" | "partial" | string | null;

    /// The payment gateway used.
    /// (deprecated: use Transaction resource instead)
    gateway: string | null;

    /// The URL for the page where the buyer landed when entering the shop.
    /// (can be null)
    landing_site: string | null;

    /// TODO: What is this? Probably landing_site referrer? (always null in available test data)
    /// (can be null)
    landing_site_ref: string | null;

    /// An array of <see cref="ShopifyLineItem"/> objects, each one containing information about an item in the order.
    line_items: LineItem[];

    // The ID of the physical location where the order was processed.
    location_id: number | null;

    /// The customer's order name as represented by a number, e.g. '#1001'.
    name: string;

    /// The text of an optional note that a shop owner can attach to the order.    
    note: null | string;

    /// Extra information that is added to the order.    
    note_attributes: NoteAttribute[];

    /// Numerical identifier unique to the shop. A number is sequential and starts at 1000.    
    number: number;

    /// A unique numeric identifier for the order. This one is used by the shop owner and customer. 
    /// This is different from the id property, which is also a unique numeric identifier for the order, but used for API purposes.
    order_number: number;

    /// URL to see the order status
    order_status_url: string;

    /// Payment details for this order. May be null or undefined if the order was created via API without payment details.
    /// (deprecated: use the Transaction resource instead)
    payment_details?: PaymentDetails | null;

    /// The list of payment gateways used for the order.
    payment_gateway_names: string[];

    /// The customer's phone number.
    phone: string;

    /// The presentment currency that was used to display prices to the customer.
    presentment_currency: string;

    /// The date that the order was processed at.
    processed_at: string;

    /// The type of payment processing method. Known values are 'checkout', 'direct', 'manual', 'offsite', 'express', 'free' and 'none'.    
    processing_method: string;

    /// The website that the customer clicked on to come to the shop.    
    referring_site: null | string;

    /// A reference string (8-4-4-4-12 uppercase hexadecimal digits), not documented, can be null
    reference: null | string;

    refunds: Refund[];

    /// The mailing address to where the order will be shipped. This address is optional and will not be available on orders that do not require one.
    shipping_address?: Address;

    /// An array of <see cref="ShopifyShippingLine"/> objects, each of which details the shipping methods used.
    shipping_lines: ShippingLine[];

    /// undocumented string, which seems to be of the format `${location_id}-${POS_DEVICE_ID}-${POS_ORDER_NUMBER}` for POS orders, where `POS_DEVICE_ID` is an id associated with the device and `POS_ORDER_NUMBER` is counted up for each separate device
    /// (can be null)
    source_identifier: string | null;

    /// Where the order originated. May only be set during creation, and is not writeable thereafter.
    /// Orders created via the API may be assigned any string of your choice except for "web", "pos", "iphone", and "android". 
    /// Default is "api".    
    source_name: string;

    /// not documented; always null in test data
    source_url?: null | any;

    /// Price of the order before shipping and taxes    
    subtotal_price: string;

    /// Price of the order before shipping and taxes, in shop and presentment currencies
    /// (BETA)
    subtotal_price_set: PriceSet;

    /// Tags are additional short descriptors, commonly used for filtering and searching, formatted as a string of comma-separated values.
    tags: string;

    /// An array of <see cref="ShopifyTaxLine"/> objects, each of which details the total taxes applicable to the order.    
    tax_lines: TaxLine[];

    /// States whether or not taxes are included in the order subtotal.     
    taxes_included: boolean;

    /// whether this is a test order
    test: boolean;

    /// Unique identifier for a particular order.    
    token: string;

    /// The total amount of the discounts applied to the price of the order.
    total_discounts: string;

    /// The total amount of the discounts applied to the price of the order, in shop and presentment currencies.
    /// (BETA)
    total_discounts_set: PriceSet;

    /// The sum of all the prices of all the items in the order.    
    total_line_items_price: string;

    /// The sum of all the prices of all the items in the order, in shop and presentment currencies.
    /// (BETA)
    total_line_items_price_set: PriceSet;

    /// The sum of all the prices of all the items in the order, with taxes and discounts included (must be positive).
    total_price: string;

    /// The sum of all the prices of all the items in the order, in shop and presentment currencies, with taxes and discounts included (must be positive).
    /// (BETA)
    total_price_set: PriceSet;

    /// The sum of all the shipping prices in the order, in shop and presentment currencies, with taxes and discounts included (must be positive).
    /// (BETA)
    total_shipping_price_set: PriceSet;

    /// The sum of all the prices of all the items in the order, in USD, with taxes and discounts included (must be positive).    
    total_price_usd: string;

    /// The sum of all the taxes applied to the order (must be positive).    
    total_tax: string;

    /// The sum of all the taxes applied to the order, in shop and presentment currencies (must be positive).
    /// (BETA)
    total_tax_set: PriceSet;

    // The sum of all the tips in the order.
    total_tip_received: string;

    /// The sum of all the weights of the line items in the order, in grams.
    total_weight: number | null;

    /// The date and time when the order was last modified.    
    updated_at: string;

    /// POS device user id for POS sales, or Shopify staff user id for draft orders
    /// null if not applicable
    user_id: number | null;
}