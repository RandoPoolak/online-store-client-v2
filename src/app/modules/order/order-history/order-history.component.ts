import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../shared/models/Order";
import {OrderService} from "../../../shared/services/order.service";
import {Router} from "@angular/router";

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

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) {
    if(sessionStorage.getItem('user') == null){
      this.router.navigate(['/not-allowed']).then();
    }
  }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    this.orderService.getAllCompletedOrders(user.id).subscribe(orders =>{
      this.dataSource.data = orders as Order[];
      this.dataSource.paginator = this.paginator;
    })
  }

}
