import Entities from "../entities";
import { IDiscountRepository } from "../repositories/discount";
import { IProductRepository } from "../repositories/product";
import {
  CartDiscountNotFoundException,
  CartInvalidDiscountPercentage,
  CartProductNotFoundException,
} from "./exception";
import { ICart } from "./interface";

export class Cart implements ICart {
  private _products: Map<Entities.ID, number> = new Map();
  private _discounts: Set<Entities.ID> = new Set();

  constructor(
    private readonly productRepository: IProductRepository,
    private readonly discountRepository: IDiscountRepository,

    initialProducts: ICart["products"] = []
  ) {
    initialProducts.forEach(({ productId, quantity }) => {
      this.productRepository.getByIdOrThrow(productId);
      this._products.set(productId, quantity);
    });
  }

  reset(): Cart {
    this._products.clear();
    this._discounts.clear();
    return this;
  }

  addProduct(productId: Entities.ID): Cart {
    this.productRepository.getByIdOrThrow(productId);
    const cnt = this._products.get(productId);
    if (cnt) {
      this._products.set(productId, cnt + 1);
    } else {
      this._products.set(productId, 1);
    }

    return this;
  }

  updateProduct(productId: Entities.ID, quantity: number): Cart {
    if (!this._products.has(productId))
      throw new CartProductNotFoundException(productId);

    this._products.set(productId, quantity);
    return this;
  }

  deleteProduct(productId: Entities.ID): Cart {
    if (!this._products.delete(productId))
      throw new CartProductNotFoundException(productId);

    return this;
  }

  isProductExist(productId: Entities.ID): boolean {
    return this._products.has(productId);
  }

  applyDiscount(discountName: Entities.ID): Cart {
    const discount = this.discountRepository.getByNameOrThrow(discountName);
    if (
      discount.type === "percentage" &&
      (discount.percentage <= 0 || discount.percentage >= 100)
    )
      throw new CartInvalidDiscountPercentage(
        discountName,
        discount.percentage
      );
    this._discounts.add(discountName);
    return this;
  }

  removeDiscount(discountName: Entities.ID): ICart {
    if (!this._discounts.delete(discountName))
      throw new CartDiscountNotFoundException(discountName);
    return this;
  }

  public get products(): ICart["products"] {
    return Array.from(this._products.entries(), ([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }

  public get grandTotal(): number {
    const subtotal = this.products.reduce((acc, { productId, quantity }) => {
      const product = this.productRepository.getByIdOrThrow(productId);
      return acc + product.price * quantity;
    }, 0);

    const discount = Array.from(this._discounts).reduce((acc, discountName) => {
      const discount = this.discountRepository.getByNameOrThrow(discountName);
      if (discount.type === "fixed") return acc + discount.discount;

      return (
        acc +
        Math.min(
          (discount.percentage / 100) * subtotal,
          discount.maximumDiscountAmount
        )
      );
    }, 0);

    return Math.max(subtotal - discount, 0);
  }

  public get isEmpty(): boolean {
    return this._products.size === 0;
  }
}
