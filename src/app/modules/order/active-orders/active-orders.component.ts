import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../shared/models/Order";
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource = new MatTableDataSource<Order>([]);
  pageSizes = [10,25,50];
  displayColumns: string[] = ['id','date', 'status', 'products'];
  userId: number = 1;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAllActiveOrders(this.userId).subscribe(orders =>{
      this.dataSource.data = orders as Order[];
      this.dataSource.paginator = this.paginator;
    })
  }

}
