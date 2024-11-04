import { Customer } from "./customer";
import { Address } from "../value-object/address";

describe('Customer unit tests', () => {
  it('should create a customer', () => {
    const customer = Customer.create('1', 'John Doe');
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBe('1');
    expect(customer.name).toBe('John Doe');
  });

  it('should throw error when id is empty', () => {
    expect(() => {
      Customer.create('', 'John Doe');
    }).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      Customer.create('1', '');
    }).toThrow('Name is required');
  });

  it('should change name', () => {
    const customer = Customer.create('1', 'John Doe');
    customer.changeName('Jane Doe');
    expect(customer.name).toBe('Jane Doe');
  });

  it('should activate customer', () => {
    const customer = Customer.create('1', 'John Doe');
    const address = new Address('Street 1', 123, '12345', 'City');
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = Customer.create('1', 'John Doe');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined when activating a customer', () => {
    const customer = Customer.create('1', 'John Doe');
    expect(() => {
      customer.activate();
    }).toThrow('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = Customer.create('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});
