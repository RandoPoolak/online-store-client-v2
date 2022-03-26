import {Product} from "./Product";
import {User} from "./User";

export class OrderLine{
  id: Number;
  product: Product;
  quantity: Number;
  active: boolean;
  user: User;

  constructor(id: Number, product: Product, quantity: Number, active: boolean, user: User) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.active = active;
    this.user = user;
  }
}
