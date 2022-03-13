import {Product} from "./Product";

export class Category {
  id: Number;
  name: String;
  products: Product[];
  active: boolean;

  constructor(id: Number, name: String, products: Product[], active: boolean) {
    this.id = id;
    this.name = name;
    this.products = products;
    this.active = active;
  }
}
