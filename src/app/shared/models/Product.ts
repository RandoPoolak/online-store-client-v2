import {Author} from "./Author";

export class Product{
  id: Number;
  description: String;
  thumbnailUrl: String;
  price: Number;
  stock: Number;
  author: Author;
  active: boolean;

  constructor(id: Number, description: String, thumbnailUrl: String, price: Number, stock: Number, author: Author, active: boolean) {
    this.id = id;
    this.description = description;
    this.thumbnailUrl = thumbnailUrl;
    this.price = price;
    this.stock = stock;
    this.author = author;
    this.active = active;
  }
}
