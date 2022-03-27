import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {OrderLine} from "../../../shared/models/OrderLine";
import {Order} from "../../../shared/models/Order";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {OrderStatus} from "../../../shared/models/OrderStatus";
import {Address} from "../../../shared/models/Address";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderLines: any;
  userId: number = 1;
  user: User;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe(user => this.user = user as User)
    this.orderService.getUserActiveAllOrderLines(this.userId).subscribe(lines => {
      this.orderLines = lines as OrderLine[];
    })
  }

  deleteLine(id:Number) {
    this.orderService.deleteOrderLine(id).subscribe(() => this.ngOnInit())
  }

  confirmOrder(){
    let defaultAddress: Address ={
      active: false,
      city: "",
      country: "",
      defaultAddress: false,
      id: 0,
      street: "",
      zipCode: ""
    };

    for(let address of this.user.addresses){
     if(address.defaultAddress){
       defaultAddress = address;
     }
    }
    for(let line of this.orderLines){
      line.active = false;
    }

    let order = new Order(0, new Date(), defaultAddress,
      OrderStatus.PENDING, true, this.orderLines, this.user);

    this.orderService.createOrder(order).subscribe(() => {
      this.openSnackBar("Order status PENDING, until payment is completed", "Done")
      this.router.navigate(['orders']).then(r => console.log('Redirected => '+r));
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}
