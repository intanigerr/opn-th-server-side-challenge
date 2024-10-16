export class CartProductNotFoundException extends Error {
  constructor(public readonly productId: string) {
    super(`Product with ID ${productId} not found`);
  }
}

export class CartDiscountNotFoundException extends Error {
  constructor(public readonly discountId: string) {
    super(`Discount with ID ${discountId} not found`);
  }
}
