import {Category} from "./Category";

export class ProductType{
  id: Number;
  name: String;
  categories: Category[];
  active: boolean;

  constructor(id: Number, name: String, categories: Category[], active: boolean) {
    this.id = id;
    this.name = name;
    this.categories = categories;
    this.active = active;
  }
}
