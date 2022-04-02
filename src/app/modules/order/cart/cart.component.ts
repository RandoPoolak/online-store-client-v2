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
import {ProductService} from "../../../shared/services/product.service";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderLines: OrderLine[];
  user: User;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService,
    private app: AppComponent
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
      this.app.updateValuesFromStorage();
      this.ngOnInit();
    }
  }

  updateOrderInfo(){
    sessionStorage.setItem('tempCart', JSON.stringify(this.orderLines));
    this.openSnackBar('Order items updated', "Done", 99999);
  }

  confirmOrder() {
    let defaultAddress = JSON.parse(sessionStorage.getItem('defaultAddress')!) as Address;
    let enoughInStock = true;
    let stockMessage = "";
    for(let line of this.orderLines){
      if(line.quantity > line.product.stock){
        enoughInStock = false;
        stockMessage += "Not enough "+line.product.description+"'s in stock. "
      }
    }
    if(enoughInStock){
      for (let line of this.orderLines) {
        line.active = false;
        line.product.stock = line.product.stock.valueOf() - line.quantity.valueOf();
        this.productService.updateProduct(line.product).subscribe();
      }
      let order = new Order(0, new Date(), defaultAddress,
        OrderStatus.PENDING, true, this.orderLines, this.user);
      this.orderService.createOrder(order).subscribe(() => {
        this.openSnackBar("Thank you for your order!", "Done", 5000)
        this.router.navigate(['orders']).then(r => console.log('Redirected => ' + r));
      })
    }else{
      this.openSnackBar(stockMessage, "Done", 99999)
    }
  }

  openSnackBar(message: string, action: string, durationMS:number) {
    this._snackBar.open(message, action, {
      duration: durationMS
    });
  }
}
