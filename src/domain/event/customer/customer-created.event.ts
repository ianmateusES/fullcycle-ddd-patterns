import { Customer } from "../../entities";
import { EventInterface } from "../@shared";

export class CustomerCreatedEvent implements EventInterface {
  data_time_occurred: Date;
  event_data: Customer;

  constructor(eventData: Customer) {
    this.data_time_occurred = new Date();
    this.event_data = eventData;
  }
}
