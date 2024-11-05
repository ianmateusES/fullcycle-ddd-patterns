import { Customer } from "../../entities";
import { Address } from "../../value-object/address";
import { EventDispatcher } from "../@shared";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";
import { CustomerCreatedEvent } from "./customer-created.event";
import {
  SendConsoleLog1WhenCustomerIsCreatedHandler,
  SendConsoleLog2WhenCustomerIsCreatedHandler,
  SendConsoleLogWhenAddressHasChangedHandler
} from "./handler"

const CUSTOMER_CREATED_EVENT = "CustomerCreatedEvent";
const CUSTOMER_ADDRESS_CHANGED_EVENT = "CustomerAddressChangedEvent";

describe('Customer events test', () => {
  it("should be able to trigger an event when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

    const eventHandler1Spy = jest.spyOn(eventHandler1, "handle");
    const eventHandler2Spy = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register(CUSTOMER_CREATED_EVENT, eventHandler1);
    eventDispatcher.register(CUSTOMER_CREATED_EVENT, eventHandler2);

    const customer = Customer.create("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(eventHandler1Spy).toHaveBeenCalledTimes(1);
    expect(eventHandler2Spy).toHaveBeenCalledTimes(1);
  });

  it("SendConsoleLog1WhenCustomerIsCreatedHandler logs correctly message", () => {
    const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const customer = Customer.create("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    const consoleSpy = jest.spyOn(console, "log");

    eventHandler.handle(customerCreatedEvent);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
  });

  it("SendConsoleLog2WhenCustomerIsCreatedHandler logs correctly message", () => {
    const eventHandler = new SendConsoleLog2WhenCustomerIsCreatedHandler();
    const customer = new Customer("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    const consoleSpy = jest.spyOn(console, "log");

    eventHandler.handle(customerCreatedEvent);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });

  it("should be able to trigger an event when the customer address changes", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenAddressHasChangedHandler();

    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(CUSTOMER_ADDRESS_CHANGED_EVENT, eventHandler);


    const customer = new Customer("2", "Customer 2");
    const address = new Address("Rua 1", 123, "65002-100", "São Paulo");

    customer.changeAddress(address);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it("SendConsoleLogWhenAddressHasChangedHandler logs correctly message", () => {
    const eventHandler = new SendConsoleLogWhenAddressHasChangedHandler();
    const customer = Customer.create("1", "Customer 1");
    const address = new Address("Rua 1", 123, "65002-100", "São Paulo");

    customer.changeAddress(address);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    const consoleSpy = jest.spyOn(console, "log");

    eventHandler.handle(customerAddressChangedEvent);

    const expectedMessage = `Endereço do cliente: ${customer.id}, ${
      customer.name
    } alterado para: ${address.toString()}`;

    expect(consoleSpy).toHaveBeenCalledWith(expectedMessage);
  });
});
