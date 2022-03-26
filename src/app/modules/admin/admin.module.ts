import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AdminAddressesComponent } from './admin-addresses/admin-addresses.component';
import { AdminAddressEditComponent } from './admin-address-edit/admin-address-edit.component';
import {AdminComponent} from "./admin/admin.component";
import {MatTabsModule} from "@angular/material/tabs";
import {AuthorModule} from "../author/author.module";
import {ProductModule} from "../product/product.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import {MatOptionModule} from "@angular/material/core";
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    AdminComponent,
    AdminUsersComponent,
    AdminAddressesComponent,
    AdminAddressEditComponent,
    AdminUserEditComponent,
    AdminOrdersComponent,

  ],
  exports: [
    AdminUsersComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatTabsModule,
    AuthorModule,
    ProductModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
