import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UsersComponent } from './users/users.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { AuthorsComponent } from './authors/authors.component';
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    OrderHistoryComponent,
    UserSettingsComponent,
    UsersComponent,
    CartComponent,
    ProductsComponent,
    AuthorsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class ShopModule { }
