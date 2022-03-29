import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {OrderService} from "../../../shared/services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../shared/models/Product";
import {UtilService} from "../../../shared/services/util.service";


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productId: number;
  product: Product = {
    active: true,
    description: "",
    id: 0,
    price: 0,
    stock: 0,
    thumbnailUrl: "",
    author: {
      active: false,
      firstName: "",
      id: 0,
      lastName: ""
    },
  }

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private util: UtilService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['productId'];
      this.requestProduct(this.productId);
    })
  }

  requestProduct(id: number) {
    this.productService.getProductById(id).subscribe(product => this.product = product as Product);
  }

  addToCart(product: Product, value: string) {
    this.util.addToCart(product, value);
  }

}
