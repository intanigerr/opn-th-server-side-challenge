import { describe, expect, it, vi } from "vitest";
import { IDiscountRepository } from "../../../domain/repositories/discount";
import { Cart } from "../../../domain/usecases/cart";
import mockProductRepository from "../utils/mockProductRepository";

const mockDiscountRepository = {
  getByNameOrThrow: vi.fn(),
} satisfies IDiscountRepository;

describe("Cart::deleteProduct", () => {
  it("When `deleteProduct`, it should delete an existing product", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100");
    expect(cart.products).toHaveLength(1);
    expect(() => cart.deleteProduct("MOCK_PRODUCT_100")).not.toThrow();
    expect(cart.products).toHaveLength(0);
  });

  it("When `deleteProduct` with non-existing product, it should throw an error", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_200");
    expect(() => cart.deleteProduct("MOCK_PRODUCT_100")).toThrow();
    expect(cart.products).toHaveLength(1);
    expect(cart.products[0].quantity).toEqual(1);
    expect(cart.products[0].productId).toEqual("MOCK_PRODUCT_200");
  });
});
