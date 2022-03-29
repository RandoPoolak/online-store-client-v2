import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {OrderLine} from "../../../shared/models/OrderLine";
import {Order} from "../../../shared/models/Order";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {OrderStatus} from "../../../shared/models/OrderStatus";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Address} from "../../../shared/models/Address";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderLines: any;
  user: User;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user') != null) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.orderService.getUserActiveAllOrderLines(this.user.id).subscribe(lines => {
        this.orderLines = lines as OrderLine[];
      });
    }else if(sessionStorage.getItem('tempCart') != null){
      this.orderLines = JSON.parse(sessionStorage.getItem('tempCart')!) as OrderLine[];
    }
  }

  deleteLine(id: Number) {
    if(sessionStorage.getItem('user') != null) {
      this.orderService.deleteOrderLine(id).subscribe(() => this.ngOnInit());
    }else{
      let orderLines = JSON.parse(sessionStorage.getItem('tempCart')!) as OrderLine[];
      orderLines = orderLines.filter( line => line.id !== id);
      sessionStorage.setItem('tempCart', JSON.stringify(orderLines));
      this.ngOnInit();
    }
  }

  updateOrderInfo(){
    sessionStorage.setItem('tempCart', JSON.stringify(this.orderLines));
  }

  confirmOrder() {
    // TODO Check product stock if there is enough products, if not show snackbar with message
    // TODO On adding to cart, check if product all ready in cart and update value based on that

    let defaultAddress = JSON.parse(sessionStorage.getItem('defaultAddress')!) as Address;

    for (let line of this.orderLines) {
      line.active = false;
    }

    let order = new Order(0, new Date(), defaultAddress,
      OrderStatus.PENDING, true, this.orderLines, this.user);
    this.orderService.createOrder(order).subscribe(() => {
      this.openSnackBar("Order status PENDING, until payment is completed", "Done")
      this.router.navigate(['orders']).then(r => console.log('Redirected => ' + r));
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}
