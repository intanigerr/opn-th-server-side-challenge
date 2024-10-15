import { assertType, test } from "vitest";
import { IDiscount } from "../../domain/entities/discount";

test("Discount discriminated union type", () => {
  assertType<IDiscount>({
    name: "foo",
    type: "fixed",
    discount: 10,
  });

  assertType<IDiscount>({
    name: "foo",
    type: "percentage",
    percentage: 10,
    maximumDiscountAmount: 100,
  });

  /**
   * If type is percentage, maximumDiscountAmount is required.
   */
  // assertType<IDiscount>({
  //   name: "foo",
  //   type: "percentage",
  //   percentage: 10,
  // })
});
