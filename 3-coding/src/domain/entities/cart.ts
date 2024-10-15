import { Id } from "./id";

type CartProduct = { productId: Id; quantity: number };

export interface ICart {
  id: Id;
  productIds: CartProduct[];
  discountId: Id;
  /**
   * Omitting subTotal from the cart entity because it can be calculated from the productIds.
   */
  // subTotal: number;
  grandTotal: number;
}
