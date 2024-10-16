import { vi } from "vitest";
import Entities from "../../../domain/entities";
import { IProductRepository } from "../../../domain/repositories/product";

const mockProductRepository = {
  getByIdOrThrow: vi.fn(),
} satisfies IProductRepository;

const mockProducts: { [k: Entities.ID]: Entities.Product } = {
  MOCK_PRODUCT_100: {
    id: "MOCK_PRODUCT_100",
    price: 100,
    freebies: null,
  },
  MOCK_PRODUCT_200: {
    id: "MOCK_PRODUCT_200",
    price: 200,
    freebies: null,
  },
  MOCK_PRODUCT_300: {
    id: "MOCK_PRODUCT_300",
    price: 300,
    freebies: null,
  },
};

mockProductRepository.getByIdOrThrow.mockImplementation((id) => {
  const p = mockProducts[id];
  if (!p) throw new Error("Product not found");
  return p;
});

export default mockProductRepository;
