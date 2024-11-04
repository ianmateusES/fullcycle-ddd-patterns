import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      Order.create("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      Order.create("123", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should throw error when items are empty", () => {
    expect(() => {
      Order.create("123", "123", []);
    }).toThrow("Items are required");
  });

  it("should throw error if the item quantity is less than or equal to 0", () => {
    expect(() => {
      const item = OrderItem.create("1", "Item 1", 100, "p1", 0);
      Order.create("123", "123", [item]);
    }).toThrow("Quantity must be greater than 0");
  });

  it("should calculate total", () => {
    const item1 = OrderItem.create("1", "Item 1", 100, "p1", 2);
    const item2 = OrderItem.create("2", "Item 2", 200, "p2", 2);
    const order = Order.create("123", "123", [item1, item2]);
    expect(order.total()).toBe(600);
  });

  it("should create an order with valid parameters", () => {
    const item1 = OrderItem.create("1", "Item 1", 100, "p1", 2);
    const order = Order.create("123", "123", [item1]);
    expect(order.id).toBe("123");
    expect(order.customerId).toBe("123");
    expect(order.items).toEqual([item1]);
    expect(order.total()).toBe(200);
  });
});
