import { EventHandlerInterface } from "../../../@shared/events";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";

export class SendConsoleLogWhenAddressHasChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, Address } = event.event_data;

    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${Address.toString()}`
    );
  }
}
