import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { AuthorsComponent } from './authors/authors.component';
import {MatTableModule} from "@angular/material/table";





@NgModule({
  declarations: [
    OrderHistoryComponent,
    CartComponent,
    ProductsComponent,
    AuthorsComponent,

  ],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class ShopModule { }
