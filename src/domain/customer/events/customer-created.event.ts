import { EventInterface } from "../../@shared/events";
import { Customer } from "../entities";

export class CustomerCreatedEvent implements EventInterface {
  data_time_occurred: Date;
  event_data: Customer;

  constructor(eventData: Customer) {
    this.data_time_occurred = new Date();
    this.event_data = eventData;
  }
}
