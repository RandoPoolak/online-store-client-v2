import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../shared/models/Order";
import {OrderService} from "../../../shared/services/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderStatus} from "../../../shared/models/OrderStatus";



@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})

export class AdminOrdersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource = new MatTableDataSource<Order>([]);
  pageSizes = [10,25,50];
  displayColumns: string[] = ['id','date', 'status', 'products','button'];

  statusList= OrderStatus;
  enumOrderStatus=[""];

  constructor(
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
  ) {
    this.enumOrderStatus = Object.keys(this.statusList);
  }

  ngOnInit(): void {

    this.orderService.getAllOrders().subscribe(orders =>{
      for(let order of orders as Order[]){
        // No idea how to get the date, Console log shows array. If you hover on order.orderDate its date value
        // order.orderDate = new Date(order.orderDate);
      }
      this.dataSource.data = orders as Order[];
      this.dataSource.paginator = this.paginator;

    })
  }

  update(order: Order){
    this.orderService.updateOrder(order).subscribe(() =>{
      this.openSnackBar("Order status updated to "+order.orderStatus, "Done")
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
