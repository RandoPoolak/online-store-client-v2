import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../shared/models/Order";
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource = new MatTableDataSource<Order>([]);
  pageSizes = [10,25,50];
  displayColumns: string[] = ['id','date', 'status', 'products'];
  userId: number = 1;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAllCompletedOrders(this.userId).subscribe(orders =>{
      for(let order of orders as Order[]){
        // No idea how to get the date, Console log shows array. If you hover on order.orderDate its date value
        // order.orderDate = new Date(order.orderDate);
      }
      this.dataSource.data = orders as Order[];
      this.dataSource.paginator = this.paginator;
    })
  }

}
