import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {Address} from "../models/Address";
import {Product} from "../models/Product";
import {OrderLine} from "../models/OrderLine";
import {OrderService} from "./order.service";
import {ContactMethod} from "../models/ContactMethod";
import {Role} from "../models/Role";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../../app.component";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  tempUser: User = {
    active: true,
    addresses: [],
    contactMethod: ContactMethod.MAIL,
    email: "",
    id: 0,
    logoUrl: "",
    password: "",
    role: Role.USER,
    userName: ""
  }

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private app: AppComponent
  ) {
  }

  getUserDefaultAddress(user: User) {
    let defaultAddress;
    for (let address of user.addresses) {
      if (address.defaultAddress) {
        defaultAddress = address
      }
    }
    return defaultAddress;
  }

  getUserActiveAddresses(user: User) {
    let activeAddresses: Address[] = [];
    user.addresses.forEach(address => {
      if (address.active) {
        activeAddresses.push(address);
      }
    })
    return activeAddresses;
  }

  updateUserSessionInfo(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('userRole', JSON.stringify(user.role));
    sessionStorage.setItem('defaultAddress', JSON.stringify(this.getUserDefaultAddress(user)));
  }

  userHasAddress(user: User, addressId: number) {
    let contains = false;
    user.addresses.forEach(address => {
      if (address.id == addressId) {
        contains = true;
      }
    })
    return contains;
  }

  addToCart(product: Product, value: string) {
    if (sessionStorage.getItem('user') != null) {
      this.addOrderLineToDb(product, value);
    } else {
      this.tempOrder(product, value);
    }
  }

  private addOrderLineToDb(product: Product, value: string) {
    let user: User = JSON.parse(sessionStorage.getItem('user')!);
    let orderLines: OrderLine[] = [];
    this.orderService.getUserActiveAllOrderLines(user.id).subscribe(response => {
      orderLines = response as OrderLine[];
      let contains = this.cartContainsProduct(orderLines, product, value);
      if (!contains) {
        let newOrderLine = new OrderLine(0, product, Number(value), true, user)
        this.orderService.createOrderLine(newOrderLine).subscribe(() => {
            let message = "Product added to cart"
            this.openSnackBar(message, "Done", 5000)
            this.app.updateValuesFromStorage();
          }
        )
      }

    });

  }

  private tempOrder(product: Product, value: string) {
    if (sessionStorage.getItem('tempCart') != null) {
      let orderLines: OrderLine[];
      orderLines = JSON.parse(sessionStorage.getItem('tempCart')!);
      let contains = this.cartContainsProduct(orderLines, product, value);
      if (!contains) {
        orderLines.push(new OrderLine(orderLines.length + 1, product, Number(value), true, this.tempUser));
        sessionStorage.setItem('tempCart', JSON.stringify(orderLines));
        let message = "Product added to cart"
        this.openSnackBar(message, "Done", 5000)
      }

    } else {
      let orderLines: OrderLine[] = [];
      orderLines.push(new OrderLine(1, product, Number(value), true, this.tempUser));
      sessionStorage.setItem('tempCart', JSON.stringify(orderLines));
      let message = "Product added to cart"
      this.openSnackBar(message, "Done", 5000)
    }
  }

  private cartContainsProduct(orderLines: OrderLine[], product: Product, value: string) {
    let contains = false;
    let message = "Product all ready in cart. Updated value"
    orderLines.forEach((line) => {
      if (line.product.id == product.id) {
        line.quantity = line.quantity.valueOf() + Number(value)
        contains = true;
        if (sessionStorage.getItem('user') != null) {
          this.orderService.updateOrderLine(line).subscribe(() => {
            this.openSnackBar(message, "Done", 5000)
          });
        } else if (sessionStorage.getItem('tempCart') != null) {
          sessionStorage.setItem('tempCart', JSON.stringify(orderLines));
          this.openSnackBar(message, "Done", 5000)
        }
      }
    });
    return contains;
  }

  openSnackBar(message: string, action: string, durationMS: number) {
    this.snackBar.open(message, action, {
      duration: durationMS
    });
  }

  linkTempCartToUser(user: User) {
    let orderLines = JSON.parse(sessionStorage.getItem('tempCart')!) as OrderLine[];
    orderLines.forEach(line => {
      line.user = user;
      this.orderService.createOrderLine(line).subscribe();
    })
    sessionStorage.removeItem('tempCart');
  }
}
