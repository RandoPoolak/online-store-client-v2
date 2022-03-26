import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { OrdersComponent } from './orders/orders.component';
import {MatTabsModule} from "@angular/material/tabs";
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    CartComponent,
    OrdersComponent,
    OrderHistoryComponent,
    ActiveOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule
  ]
})
export class OrderModule { }
