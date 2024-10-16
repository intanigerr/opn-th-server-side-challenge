import Entities from "../entities";

type ProductIdWithQuantity = { productId: Entities.ID; quantity: number };

export interface ICart {
  readonly products: ProductIdWithQuantity[];
  readonly grandTotal: number;
  readonly isEmpty: boolean;

  addProduct(productId: Entities.ID): ICart;
  updateProduct(productId: Entities.ID, quantity: number): ICart;
  deleteProduct(productId: Entities.ID): ICart;
  isProductExist(productId: Entities.ID): boolean;
  applyDiscount(discountName: Entities.ID): ICart;
  removeDiscount(discountName: Entities.ID): ICart;
  reset(): ICart;
}
