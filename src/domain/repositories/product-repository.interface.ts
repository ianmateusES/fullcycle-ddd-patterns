import { Product } from "../entities";
import { RepositoryInterface } from "./repository.interface";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
