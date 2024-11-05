import { OrderService } from "./order.service";
import { Order, OrderItem } from "../entities";
import { Customer } from "../../customer/entities";

describe("Order service unit tests", () => {
  it("should calculate the total of all orders", () => {
    const item1 = OrderItem.create("i1", "Item 1", 100, "p1", 1);
    const item2 = OrderItem.create("i2", "Item 2", 200, "p2", 2);

    const order1 = Order.create("o1", "c1", [item1]);
    const order2 = Order.create("o2", "c2", [item2]);
    const orders = [order1, order2];

    const result = OrderService.total(orders);

    expect(result).toBe(500);
  });

  it("should handle an empty order list", () => {
    const orders: Order[] = [];
    const result = OrderService.total(orders);

    expect(result).toBe(0);
  });

  it("should place an order", () => {
    const customer = Customer.create("c1", "Customer 1");
    const item1 = OrderItem.create("i1", "Item 1", 100, "p1", 1);
    const item2 = OrderItem.create("i2", "Item 2", 200, "p2", 2);
    const items = [item1, item2];

    const order = OrderService.placeOrder(customer, items);

    expect(order).toBeDefined();
    expect(order.customerId).toBe("c1");
    expect(order.items).toEqual(items);
    expect(customer.rewardPoints).toBe(250);
  });

  it("should throw error if no items are provided", () => {
    const customer = Customer.create("c1", "Customer 1");
    const items: OrderItem[] = [];

    expect(() => OrderService.placeOrder(customer, items)).toThrow(
      "Order must have at least one item"
    );
  });
});
