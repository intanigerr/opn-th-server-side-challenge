import { describe, expect, it } from "vitest";
import { Cart } from "../../../domain/usecases/cart";
import { CartDiscountNotFoundException } from "../../../domain/usecases/exception";
import mockDiscountRepository from "../mock/mockDiscountRepository";
import mockProductRepository from "../mock/mockProductRepository";

describe("Cart::removeDiscount", () => {
  it("When `removeDiscount`, it should restore totalAmount correctly", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_100")
      .addProduct("MOCK_PRODUCT_100")
      .addProduct("MOCK_PRODUCT_100")
      .applyDiscount("MOCK_DISCOUNT_10_PERCENT");

    expect(() => cart.removeDiscount("MOCK_DISCOUNT_10_PERCENT")).not.toThrow();
    expect(cart.grandTotal).toBe(300);
  });

  it("When `removeDiscount` from multiple discounts, it should only remove specific discount and restore totalAmount correctly", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_100")
      .addProduct("MOCK_PRODUCT_100")
      .addProduct("MOCK_PRODUCT_100")
      .applyDiscount("MOCK_DISCOUNT_10_PERCENT")
      .applyDiscount("MOCK_DISCOUNT_30_BAHT");

    expect(() => cart.removeDiscount("MOCK_DISCOUNT_10_PERCENT")).not.toThrow();
    expect(cart.grandTotal).toBe(270);
  });

  it("When `removeDiscount` with non-exist discount, it should throw an error", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100");

    expect(() => cart.removeDiscount("MOCK_DISCOUNT_10_PERCENT")).toThrow(
      CartDiscountNotFoundException
    );
    expect(cart.grandTotal).toBe(100);
  });
});
