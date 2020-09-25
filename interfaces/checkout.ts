import { Address } from './address';
import { Customer } from './customer';
import { DiscountCode } from './discount_code';
import { LineItem } from './line_item';
import { NoteAttribute } from './note_attribute';
import { ShippingLine } from './shipping_line';
import { TaxLine } from './tax_line';

/**
 * Represents an abandoned checkout.
 */
export interface Checkout {
    /**
     * The ID for the checkout.
     */ 
    id: number;

    /**
     * The recovery URL that's sent to a customer so they can recover their checkout.
     */
    abandoned_checkout_url: string;

    /**
     *  The mailing address associated with the payment method.
     */
    billing_address?: Address;

    /**
     * Whether the customer would like to receive email updates from the shop.
     * This is set by the "I want to receive occasional emails about new products, promotions and other news" checkbox during checkout.
     */
    buyer_accepts_marketing: boolean;

    /**
     * The ID for the cart that's attached to the checkout.
     */
    cart_token: string | null;

    /**
     * The date and time (ISO 8601 format) when the checkout was closed. If the checkout was not closed, then this value is null.
     */
    closed_at: string | null;

    /**
     * The date and time (ISO 8601 format) when the checkout was completed. For abandoned checkouts, this value is always null.
     */
    completed_at: string | null;

    /**
     * The date and time (ISO 8601 format) when the checkout was created.
     */
    created_at: string;

    /**
     * The three-letter code (ISO 4217 format) of the shop's default currency at the time of checkout.
     * For the currency that the customer used at checkout, see presentment_currency.
     */
    currency: string;

    /**
     * Information about the customer. For more information, see the Customer resource.
     */
    customer: Customer;

    /**
     * The two or three-letter language code, optionally followed by a region modifier.
     * Example values: en, en-CA.
     */
    customer_locale: string | null;

    /**
     * The ID of the Shopify POS device that created the checkout.
     */
    device_id: number | null;

    /**
     * Discount codes applied to the checkout. Returns an empty array when no codes are applied. 
     */
    discount_codes: DiscountCode[];

    /**
     * The customer's email address.
     */
    email: string | null;

    /**
     * The payment gateway used by the checkout. For abandoned checkouts, this value is always null for abandoned checkouts.
     */
    gateway: string | null;

    /**
     * The URL for the page where the customer entered the shop.
     */
    landing_site: string;

    /**
     * A list of line items, each containing information about an item in the checkout.
     */
    line_items: LineItem[];

    /**
     * The ID of the physical location where the checkout was processed.
     */
    location_id: number | null;

    /**
     * The text of an optional note that a shop owner can attach to the order.
     */
    note: string | null;

    /**
     * Extra information that is added to the order.
     */
    note_attributes: NoteAttribute[];

    /**
     * The customer's phone number.
     */
    phone: string | null;

    /**
     * The three-letter code (ISO 4217 format) of the currency that the customer used at checkout.
     * For the shop's default currency, see currency. 
     *
     * (BETA)
     */
    presentment_currency: string;

    /**
     * The website that referred the customer to the shop.
     */
    referring_site: string | null;

    /**
     * The mailing address where the order will be shipped to.
     */
    shipping_address?: Address;

    /**
     * Information about the chosen shipping method.
     */
    shipping_lines: ShippingLine[];

    /**
     * undocumented; always null in test data
     */
    source?: null | any;

    /**
     * undocumented string, which seems to be of the format `${location_id}-${POS_DEVICE_ID}-${POS_ORDER_NUMBER}` for POS orders, where `POS_DEVICE_ID` is an id associated with the device and `POS_ORDER_NUMBER` is counted up for each separate device
     */
    source_identifier: string | null;

    /**
     * Where the checkout originated.
     * Valid values: web, pos, iphone, android.
     */
    source_name: string;

    /**
     * undocumented; always null in test data
     */
    source_url?: null | any;

    /**
     * The price of the checkout before shipping and taxes.
     */
    subtotal_price: string;

    /**
     * An array of tax line objects, each of which details a tax applicable to the checkout.
     */
    tax_lines: TaxLine[];

    /**
     * Whether taxes are included in the price.
     */
    taxes_included: boolean;

    /**
     * A unique ID for a checkout.
     */
    token: string;

    /**
     * The total amount of discounts to be applied.
     */
    total_discounts: string;

    /**
     * The sum of the prices of all line items in the checkout.
     */
    total_line_items_price: string;

    /**
     * The sum of the prices of all line items in the checkout, discounts, shipping costs, and taxes.
     */
    total_price: string;

    /**
     * The sum of all the taxes applied to the checkout.
     */
    total_tax: string;

    /**
     * The sum of all the weights in grams of the line items in the checkout.
     */
    total_weight: number;

    /**
     * The date and time (ISO 8601 format) when the checkout was last modified.
     */
    updated_at: string;

    /**
     * The ID of the user who created the checkout.
     */
    user_id: number | null;
}