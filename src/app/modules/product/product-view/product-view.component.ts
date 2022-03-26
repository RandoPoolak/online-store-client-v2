import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {OrderService} from "../../../shared/services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../shared/models/Product";
import {OrderLine} from "../../../shared/models/OrderLine";
import {User} from "../../../shared/models/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  orderLine: OrderLine;
  productId: number;
  product: Product;
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.productId = +params['productId'];
      this.requestProduct(this.productId);
    })
  }

  requestProduct(id:number){
    this.productService.getProductById(id).subscribe(product => this.product = product as Product);
  }

  addToCart(product: Product, value: string) {
    let userId = 1
    let user;
    this.userService.getUserById(userId).subscribe(request => {
      user = <User>request
      let newOrderLine = new OrderLine(0, product, Number(value),true, user)
      this.orderService.createOrderLine(newOrderLine).subscribe(() => {
        let message = "Product added to cart"
        this.openSnackBar(message, "Done")
      })
    } )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}
