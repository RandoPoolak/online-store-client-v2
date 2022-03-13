import {Address} from "./Address";
import {OrderStatus} from "./OrderStatus";
import {OrderLine} from "./OrderLine";
import {User} from "./User";

export class Order{
  id: Number;
  orderDate: Date;
  deliveryAddress: Address;
  orderStatus: OrderStatus;
  active: boolean;
  orderLine: OrderLine[];
  user: User;

  constructor(id: Number, orderDate: Date, deliveryAddress: Address, orderStatus: OrderStatus, active: boolean, orderLine: OrderLine[], user: User) {
    this.id = id;
    this.orderDate = orderDate;
    this.deliveryAddress = deliveryAddress;
    this.orderStatus = orderStatus;
    this.active = active;
    this.orderLine = orderLine;
    this.user = user;
  }
}
