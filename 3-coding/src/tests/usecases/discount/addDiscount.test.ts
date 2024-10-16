import { describe, expect, it } from "vitest";
import { Cart } from "../../../domain/usecases/cart";
import {
  CartAddDiscountToEmptyCartException,
  CartInvalidDiscountPercentageException,
} from "../../../domain/usecases/exception";
import mockDiscountRepository from "../mock/mockDiscountRepository";
import mockProductRepository from "../mock/mockProductRepository";

describe("Cart::applyDiscount", () => {
  it("When `applyDiscount`, it should deduct a grandTotal", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_100")
      .applyDiscount("MOCK_DISCOUNT_10_PERCENT");

    expect(cart.grandTotal).toBe(90);
  });

  it("When apply multiple discounts, it should deduct a grandTotal", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_100")
      .applyDiscount("MOCK_DISCOUNT_10_PERCENT")
      .applyDiscount("MOCK_DISCOUNT_30_BAHT");

    expect(cart.grandTotal).toBe(60);
  });

  it("When cart contain multiple products, it should deduct a grandTotal", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_100")
      .addProduct("MOCK_PRODUCT_300")
      .applyDiscount("MOCK_DISCOUNT_10_PERCENT")
      .applyDiscount("MOCK_DISCOUNT_30_BAHT");

    expect(cart.grandTotal).toBe(330);
  });

  it("When apply percentage discount more than a maximum discount amount, it should deduct a grandTotal at most `maximumDiscountAmount`", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_100")
      .addProduct("MOCK_PRODUCT_300")
      .addProduct("MOCK_PRODUCT_300")
      .addProduct("MOCK_PRODUCT_300")
      .applyDiscount("MOCK_DISCOUNT_10_PERCENT");

    expect(cart.grandTotal).toBe(950);
  });

  it("When apply discount more than a price of product, it should return 0 BAHT", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_100")
      .applyDiscount("MOCK_DISCOUNT_10_PERCENT")
      .applyDiscount("MOCK_DISCOUNT_100_BAHT");

    expect(cart.grandTotal).toBe(0);
  });

  it("When apply a discount that have invalid percentage, it should throw an error", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100");

    expect(() =>
      cart.applyDiscount("MOCK_INVALID_DISCOUNT_PERCENTAGE")
    ).toThrow(CartInvalidDiscountPercentageException);
  });

  it("When apply non-exist discount, it should throw an error", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100");

    expect(() => cart.applyDiscount("MOCK_DISCOUNT_NON_EXIST")).toThrow();
  });

  it("When apply a discount to an empty cart, it should throw an error", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    expect(() => cart.applyDiscount("MOCK_DISCOUNT_10_PERCENT")).toThrow(
      CartAddDiscountToEmptyCartException
    );
  });
});
