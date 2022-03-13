import {Product} from "./Product";

export class OrderLine{
  id: Number;
  product: Product;
  quantity: Number;
  active: boolean;

  constructor(id: Number, product: Product, quantity: Number, active: boolean) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.active = active;
  }
}
