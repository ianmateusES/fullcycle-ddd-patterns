import { Product } from "../../entities";
import { EventInterface } from "../@shared";

export class ProductCreatedEvent implements EventInterface {
  data_time_occurred: Date;
  event_data: Product;

  constructor(eventData: Product) {
    this.data_time_occurred = new Date();
    this.event_data = eventData;
  }
}
