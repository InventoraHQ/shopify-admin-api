import { ShopifyObject } from "./base";
import { Transaction } from "./transaction";
import { LineItem } from './line_item';

export interface Refund extends ShopifyObject {
    id: number;
    order_id: number;
    created_at?: string;
    note: string;
    restock?: boolean;
    user_id: number;
    processed_at?: string;
    refund_line_items: RefundLineItem;
    transactions: Transaction[];
    order_adjustments: OrderAdjustment[];
}

export interface RefundLineItem {
    /* API sample:
        "id": 14779449384
    */
    id: number;
    /* API sample:
        "quantity": 1
    */
    quantity: number;
    /* API sample:
        "line_item_id": 510442569768
    */
    line_item_id: number;
    /* API sample:
        "subtotal": 139
    */
    subtotal: number;
    /* API sample:
        "total_tax": 22.19
    */
    total_tax: number;
    line_item: LineItem;
};

export interface OrderAdjustment extends ShopifyObject {
    order_id: any;
    refund_id: number;
    amount: string;
    tax_amount: string;
    kind: string;
    reason: string;
}
