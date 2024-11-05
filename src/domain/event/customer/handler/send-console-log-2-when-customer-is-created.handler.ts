import { EventHandlerInterface } from "../../@shared";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendConsoleLog2WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
