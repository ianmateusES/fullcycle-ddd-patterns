import { RepositoryInterface } from "../../@shared/repositories";
import { Customer } from "../entities";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
