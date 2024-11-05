import { EventHandlerInterface } from "../../@shared";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendConsoleLog1WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}