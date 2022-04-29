import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { PaymentTransaction } from '../interfaces';

export class PaymentTransactions extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "shopify_payments/balance");
    }

    /**
     * Retrieves a list of all balance transactions ordered by processing time, with the most recent being first.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.PaymentTransactionListOptions) {
        return this.createRequest<Partial<PaymentTransaction[]>>("GET", "transactions.json", "transactions", options);
    }
}

export default PaymentTransactions;