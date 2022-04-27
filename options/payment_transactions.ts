import { DateOptions, FieldOptions, ListOptions, ProcessedOptions } from "./base";

export interface PaymentTransactionListOptions extends FieldOptions, DateOptions, ProcessedOptions, ListOptions {
    /**
     * Filter response by order ID
     */
     orderId?: number;

    /**
     * Filter response to transactions exclusively before the specified ID
     */
    last_id?: number;

    /**
     * Filter response to transactions paid out in the specified payout.
     */
    payout_id?: number;

    /**
     * Filter response to transactions with the specified payout status
     */
    payout_status?: string;

    /**
     * Filter response to transactions exclusively after the specified ID.
     */
    since_id?: number;

    /**
     * Filter response to transactions placed in test mode.
     */
    test?: boolean;
}