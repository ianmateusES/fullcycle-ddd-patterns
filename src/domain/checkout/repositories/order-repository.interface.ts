import { RepositoryInterface } from "../../@shared/repositories";
import { Order } from "../entities";

export interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
