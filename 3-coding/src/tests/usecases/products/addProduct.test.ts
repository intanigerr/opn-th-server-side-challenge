import { describe, expect, it, vi } from "vitest";
import { IDiscountRepository } from "../../../domain/repositories/discount";
import { Cart } from "../../../domain/usecases/cart";
import mockProductRepository from "../utils/mockProductRepository";

const mockDiscountRepository = {
  getByNameOrThrow: vi.fn(),
} satisfies IDiscountRepository;

describe("Cart::addProduct", () => {
  it("When `addProduct`, it should add a new product to cart", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    expect(() => cart.addProduct("MOCK_PRODUCT_100")).not.toThrow();
    expect(cart.products).toHaveLength(1);
    expect(cart.products[0].quantity).toEqual(1);
    expect(cart.grandTotal).toBe(100);
  });

  it("When `addProduct` with invalid product, it should throw an error", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    expect(() => cart.addProduct("INVALID_PRODUCT")).toThrow();
    expect(cart.products).toHaveLength(0);
    expect(cart.grandTotal).toBe(0);
  });

  it("When `addProduct` with existing product, it should increment the quantity", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100").addProduct("MOCK_PRODUCT_100");

    expect(cart.products).toHaveLength(1);
    expect(cart.products[0].quantity).toEqual(2);
    expect(cart.grandTotal).toBe(200);
  });

  it("When `addProduct` with multiple difference products, it should add all products", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_100").addProduct("MOCK_PRODUCT_200");

    expect(cart.products).toHaveLength(2);
    expect(cart.products[0].quantity).toEqual(1);
    expect(cart.products[1].quantity).toEqual(1);
    expect(cart.grandTotal).toBe(300);
  });
});
