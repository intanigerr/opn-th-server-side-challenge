import { IDiscount } from "./discount";
import { Id } from "./id";
import { IProduct } from "./product";

namespace Entities {
  export type Product = IProduct;
  export type Discount = IDiscount;
  export type ID = Id;
}

export default Entities;
