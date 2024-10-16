import Entities from "../entities";

export interface IDiscountRepository {
  getByNameOrThrow(id: Entities.Discount["name"]): Entities.Discount;
}
