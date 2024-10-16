export class CartProductNotFoundException extends Error {
  constructor(public readonly productId: string) {
    super(`Product with ID ${productId} not found`);
  }
}

export class CartDiscountNotFoundException extends Error {
  constructor(public readonly discountName: string) {
    super(`Discount name: ${discountName} not found`);
  }
}

export class CartInvalidDiscountPercentage extends Error {
  constructor(
    public readonly discountName: string,
    public readonly percentage: number
  ) {
    super(`Invalid discount name ${discountName} percentage: ${percentage}`);
  }
}
