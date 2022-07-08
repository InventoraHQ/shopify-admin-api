import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Order, OrderCreate,Transaction } from '../interfaces';

export class Orders extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "orders");
    }

    /**
     * Gets a count of all of the shop's orders.
     * @param options Options for filtering the results.
     */
    public count(options?: Options.OrderCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's orders.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.OrderListOptions) {
        return this.createRequest<Partial<Order>[]>("GET", ".json", "orders", options);
    }

    /**
     * Gets a list of up to 250 orders from the given customer.
     * @param customerId The customer's id.
     * @param options Options for filtering the results.
     */
    public listForCustomer(customerId: number, options?: Options.OrderListOptions) {
        return this.createRequest<Partial<Order>[]>("GET", ".json", "orders", Object.assign({ customer_id: customerId }, options));
    }

    /**
     * Retrieves a list of fulfillment orders for a specific order.
     * @param orderId The ID of the order that is associated with the fulfillment orders.
     */
    public listFulfillmentOrders(orderId: string) {
        return this.createRequest("GET", `${orderId}/fulfillment_orders.json`, "fulfillment_orders");
    }

    /**
     * Gets the order with the given id.
     * @param orderId The order's id.
     * @param options Options for filtering the results.
     */
    public get(orderId: number, options?: Options.OrderGetOptions) {
        return this.createRequest<Partial<Order>>("GET", `${orderId}.json`, "order", options);
    }

    /**
     * Creates an order.
     * @param order The order being created.
     * @param options Options for creating the order.
     */
    public create(order: OrderCreate, transactions?: Transaction[], options?: Options.OrderCreateOptions) {
        return this.createRequest<Order>("POST", ".json", "order", { order: Object.assign({}, order, options, { transactions }) });
    }

    /**
     * Updates an order with the given id.
     * @param id The order's id.
     * @param order The updated order.
     */
    public update(id: number, order: Partial<OrderCreate>) {
        return this.createRequest<Order>("PUT", `${id}.json`, "order", { order });
    }

    /**
     * Deletes an order with the given id.
     * @param id The order's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }

    /**
     * Closes an order with the given id.
     * @param id The order's id.
     */
    public close(id: number) {
        return this.createRequest<Order>("POST", `${id}/close.json`, "order");
    }

    /**
     * Opens an order with the given id.
     * @param id The order's id.
     */
    public open(id: number) {
        return this.createRequest<Order>("POST", `${id}/open.json`, "order");
    }

    /**
     * Cancels an order with the given id.
     * @param id The order's id.
     * @param options Options for canceling the order.
     */
    public cancel(id: number, options?: Options.OrderCancelOptions) {
        return this.createRequest<Order>("POST", `${id}/cancel.json`, 'order', options);
    }
}

export default Orders;