import { Product } from './product';

describe('Product unit tests', () => {
  it('should create a product', () => {
    const product = Product.create('1', 'Product 1', 100);
    expect(product.id).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
  });

  it('should change the name of the product', () => {
    const product = Product.create('1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should change the price of the product', () => {
    const product = Product.create('1', 'Product 1', 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });

  it('should throw error when id is empty', () => {
    expect(() => {
      Product.create('', 'Product 1', 100);
    }).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      Product.create('1', '', 100);
    }).toThrow('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      Product.create('1', 'Product 1', -1);
    }).toThrow('Price must be greater than zero');
  });
});
