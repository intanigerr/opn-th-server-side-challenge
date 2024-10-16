import { Id } from "./id";

export interface IProduct {
  id: Id;
  price: number;
  freebies: Id[];
}
