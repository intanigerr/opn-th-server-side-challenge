import { vi } from "vitest";
import Entities from "../../../domain/entities";
import { IDiscountRepository } from "../../../domain/repositories/discount";

const mockDiscountRepository = {
  getByNameOrThrow: vi.fn(),
} satisfies IDiscountRepository;

const mockDiscounts: { [k: string]: Entities.Discount } = {
  MOCK_DISCOUNT_10_PERCENT: {
    name: "MOCK_DISCOUNT_10_PERCENT",
    type: "percentage",
    percentage: 10,
    maximumDiscountAmount: 50,
  },
  MOCK_DISCOUNT_20_PERCENT: {
    name: "MOCK_DISCOUNT_20_PERCENT",
    type: "percentage",
    percentage: 20,
    maximumDiscountAmount: 100,
  },
  MOCK_DISCOUNT_30_BAHT: {
    name: "MOCK_DISCOUNT_30_BAHT",
    type: "fixed",
    discount: 30,
  },
  MOCK_DISCOUNT_50_BAHT: {
    name: "MOCK_DISCOUNT_50_BAHT",
    type: "fixed",
    discount: 50,
  },
  MOCK_DISCOUNT_100_BAHT: {
    name: "MOCK_DISCOUNT_100_BAHT",
    type: "fixed",
    discount: 100,
  },
  MOCK_INVALID_DISCOUNT_PERCENTAGE: {
    name: "MOCK_INVALID_DISCOUNT_PERCENTAGE",
    type: "percentage",
    percentage: 100,
    maximumDiscountAmount: 50,
  },
};

mockDiscountRepository.getByNameOrThrow.mockImplementation((name) => {
  const d = mockDiscounts[name];
  if (!d) throw new Error("Discount not found");
  return d;
});

export default mockDiscountRepository;
