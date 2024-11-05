import { EventInterface } from "../../@shared/events";
import { Product } from "../entities";

export class ProductCreatedEvent implements EventInterface {
  data_time_occurred: Date;
  event_data: Product;

  constructor(eventData: Product) {
    this.data_time_occurred = new Date();
    this.event_data = eventData;
  }
}
