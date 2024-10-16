import { Id } from "./id";

type PercentageDiscount = {
  type: "percentage";
  /**
   * The percentage value must be a number between 0 and 100.
   */
  percentage: number;
  maximumDiscountAmount: number;
};

type FixedDiscount = {
  type: "fixed";
  discount: number;
};

interface ICommonDiscount {
  name: Id;
}

export type IDiscount = ICommonDiscount & (PercentageDiscount | FixedDiscount);
