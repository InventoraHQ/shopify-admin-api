import { ShopifyObject } from "./base";

export interface PaymentTransaction extends ShopifyObject {
    /**
     * The unique identifier of the transaction.
     * @readonly
     */
    id: number;

    /**
     * The type of the balance transaction. The value will be one of the following:
     * 
     * * charge
     * * refund
     * * dispute
     * * reserve
     * * adjustment
     * * credit
     * * debit
     * * payout
     * * payout_failure
     * * payout_cancellation
     * @readonly
     */
    type: object;

    /**
     * If the transaction was created for a test mode Order or payment.
     * 
     * @example
     * "test": {
     *   "test": false
     * }
     * @readonly
     */
    test: object;

    /**
     * The id of the payout the transaction was paid out in.
     * 
     * @example
     * "payout_id": {
     *   "payout_id": 1234
     * }
     * @readonly
     */
    payout_id: object;

    /**
     * The status of the payout the transaction was paid out in, or `pending` if the transaction has not yet been included in a payout.
     * 
     * @example
     * "payout_status": {
     *   "payout_status": "scheduled"
     * }
     * @readonly
     */
    payout_status: object;

    /**
     * The ISO 4217 currency code of the transaction.
     * 
     * @example
     * "currency": {
     *   "currency": "USD"
     * }
     * @readonly
     */
    currency: object;

    /**
     * The gross amount of the transaction, in a decimal formatted string.
     * 
     * @example
     * "amount": {
     *   "amount": "102.53"
     * }
     * @readonly
     */
    amount: object;

    /**
     * The total amount of fees deducted from the transaction amount.
     * 
     * @example
     * "fee": {
     *   "fee": "3.07"
     * }
     * @readonly
     */
    fee: object;

    /**
     * The net amount of the transaction.
     * 
     * @example
     * "net": {
     *   "net": "102.53"
     * }
     * @readonly
     */
    net: object;

    /**
     * The id of the resource leading to the transaction.
     * 
     * @example
     * "source_id": {
     *   "source_id": 1234
     * }
     * @readonly
     */
    source_id: object;

    /**
     * The type of the resource leading to the transaction.
     * 
     * @example
     * "source_type": {
     *   "source_type": "charge"
     * }
     * @readonly
     */
    source_type: object;

    /**
     * The id of the Order Transaction that resulted in this balance transaction.
     * 
     * @example
     * "source_order_transaction_id": {
     *   "source_order_transaction_id": 12
     * }
     * @readonly
     */
    source_order_transaction_id: object;

    /**
     * The id of the Order that this transaction ultimately originated from.
     * 
     * @example
     * "source_order_id": {
     *   "source_order_id": 1
     * }
     * @readonly
     */
    source_order_id: object;

    /**
     * The time the transaction was processed.
     * 
     * @example
     * "processed_at": {
     *   "processed_at": "2018-03-23T16:32:45Z"
     * }
     * @readonly
     */
    processed_at: object;
}
