import { describe, expect, it, vi } from "vitest";
import { IDiscountRepository } from "../../../domain/repositories/discount";
import { Cart } from "../../../domain/usecases/cart";
import { CartProductNotFoundException } from "../../../domain/usecases/exception";
import mockProductRepository from "../utils/mockProductRepository";

const mockDiscountRepository = {
  getByNameOrThrow: vi.fn(),
} satisfies IDiscountRepository;

describe("Cart::updateProduct", () => {
  it("When `updateProduct`, it should update an existing product to specific quantity", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100");
    expect(() => cart.updateProduct("MOCK_PRODUCT_100", 20)).not.toThrow();
    expect(cart.products).toHaveLength(1);
    expect(cart.products[0].quantity).toEqual(20);
    expect(cart.grandTotal).toBe(20 * 100);
  });

  it("When `updateProduct` with non-existing product, it should throw an error", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    expect(() => cart.updateProduct("MOCK_PRODUCT_100", 20)).toThrow(
      CartProductNotFoundException
    );
    expect(cart.products).toHaveLength(0);
    expect(cart.grandTotal).toBe(0);
  });

  it("When `updateProduct` with invalid product, it should throw an error and still retaining saved product", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100");
    expect(() => cart.updateProduct("INVALID_PRODUCT", 20)).toThrow();
    expect(cart.products).toHaveLength(1);
    expect(cart.products[0].quantity).toEqual(1);
    expect(cart.grandTotal).toBe(100);
  });
});
