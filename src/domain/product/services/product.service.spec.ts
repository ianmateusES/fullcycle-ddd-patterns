import { Product } from "../entities";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("should increase the price of all products by the given percentage", () => {
    const product1 = Product.create("1", "Product 1", 100);
    const product2 = Product.create("2", "Product 2", 200);
    const products = [product1, product2];

    ProductService.increasePrice(products, 10);

    expect(product1.price).toBe(110);
    expect(product2.price).toBe(220);
  });

  it("should handle an empty product list", () => {
    const products: Product[] = [];

    const result = ProductService.increasePrice(products, 10);

    expect(result).toEqual([]);
  });

  it("should handle a zero percentage increase", () => {
    const product1 = Product.create("1", "Product 1", 100);
    const product2 = Product.create("2", "Product 2", 200);
    const products = [product1, product2];

    ProductService.increasePrice(products, 0);

    expect(product1.price).toBe(100);
    expect(product2.price).toBe(200);
  });

  it("should handle a negative percentage increase", () => {
    const product1 = Product.create("1", "Product 1", 100);
    const product2 = Product.create("2", "Product 2", 200);
    const products = [product1, product2];

    ProductService.increasePrice(products, -10);

    expect(product1.price).toBe(90);
    expect(product2.price).toBe(180);
  });
});
