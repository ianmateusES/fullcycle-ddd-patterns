import { RepositoryInterface } from "../../@shared/repositories";
import { Product } from "../entities";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
