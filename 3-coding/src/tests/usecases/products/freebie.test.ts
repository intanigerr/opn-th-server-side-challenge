import { describe, expect, it } from "vitest";
import { Cart } from "../../../domain/usecases/cart";
import mockDiscountRepository from "../utils/mockDiscountRepository";
import mockProductRepository from "../utils/mockProductRepository";

describe("Cart - Freebie", () => {
  it("When `addProduct` with freebie, it should add freebie to cart", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart.addProduct("MOCK_PRODUCT_WITH_FREEBIES");

    expect(cart.grandTotal).toBe(350);
    expect(cart.products).toHaveLength(2);
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 1,
      free: true,
    });
  });

  it("When `addProduct` with freebie and quantity more than 1, it should add freebie to cart", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_WITH_FREEBIES")
      .updateProduct("MOCK_PRODUCT_WITH_FREEBIES", 3);

    expect(cart.grandTotal).toBe(1050);
    expect(cart.products).toHaveLength(2);
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 3,
      free: true,
    });
  });

  it("When `addProduct` with freebie and then add a same product as freebie later, it should discriminate freebie and paid product", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_WITH_FREEBIES")
      .updateProduct("MOCK_PRODUCT_WITH_FREEBIES", 2)
      .addProduct("MOCK_PRODUCT_300");

    expect(cart.grandTotal).toBe(1000);
    expect(cart.products).toHaveLength(3);
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 2,
      free: true,
    });
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 1,
      free: false,
    });

    // Reverse order
    cart
      .reset()
      .addProduct("MOCK_PRODUCT_300")
      .addProduct("MOCK_PRODUCT_WITH_FREEBIES")
      .updateProduct("MOCK_PRODUCT_WITH_FREEBIES", 2);

    expect(cart.grandTotal).toBe(1000);
    expect(cart.products).toHaveLength(3);
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 2,
      free: true,
    });
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 1,
      free: false,
    });
  });

  it("When `updateProduct` with freebie, it should update freebie quantity", () => {
    const cart = new Cart(mockProductRepository, mockDiscountRepository);

    cart
      .addProduct("MOCK_PRODUCT_WITH_FREEBIES")
      .updateProduct("MOCK_PRODUCT_WITH_FREEBIES", 3);

    expect(cart.grandTotal).toBe(1050);
    expect(cart.products).toHaveLength(2);
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 3,
      free: true,
    });

    cart.updateProduct("MOCK_PRODUCT_WITH_FREEBIES", 2);

    expect(cart.grandTotal).toBe(700);
    expect(cart.products).toHaveLength(2);
    expect(cart.products).toContainEqual({
      productId: "MOCK_PRODUCT_300",
      quantity: 2,
      free: true,
    });
  });
});
