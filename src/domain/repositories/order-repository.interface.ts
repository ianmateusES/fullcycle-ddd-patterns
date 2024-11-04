import { Order } from "../entities";
import { RepositoryInterface } from "./repository.interface";

export interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
