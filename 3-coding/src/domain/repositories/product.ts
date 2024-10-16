import Entities from "../entities";

export interface IProductRepository {
  getByIdOrThrow(id: Entities.Product["id"]): Entities.Product;
}
