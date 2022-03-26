import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderLine} from "../models/OrderLine";
import {Order} from "../models/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ORDER_BASE_URL = 'order'
  private ORDER_LINE_BASE_URL = 'order-line'
  constructor(private httpClient: HttpClient) { }

  public getUserActiveAllOrderLines(id:number){
    return this.httpClient.get(this.ORDER_LINE_BASE_URL+"/user/"+id);
  }

  public createOrderLine(orderLine: OrderLine){
    let newOrderLine = JSON.stringify(orderLine)
    return this.httpClient.post(this.ORDER_LINE_BASE_URL+"/create", newOrderLine)
  }

  public deleteOrderLine(id:number){
    return this.httpClient.get(this.ORDER_LINE_BASE_URL+"/delete/"+id)
  }

  public createOrder(order: Order){
    let newOrder = JSON.stringify(order)
    console.log(newOrder)
    return this.httpClient.post(this.ORDER_BASE_URL+"/create", newOrder)
  }

  public getAllActiveOrders(id:number){
    return this.httpClient.get(this.ORDER_BASE_URL+"/active/"+id);
  }

  public getAllCompletedOrders(id:number){
    return this.httpClient.get(this.ORDER_BASE_URL+"/completed/"+id);
  }

  public getAllOrders(){
    return this.httpClient.get(this.ORDER_BASE_URL);
  }

  public updateOrder(order: Order){
    let newOrder = JSON.stringify(order);
    return this.httpClient.post(this.ORDER_BASE_URL+"/update", newOrder);
  }
}
