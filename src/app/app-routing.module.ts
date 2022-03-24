import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserEditComponent} from "./shop/user/user-edit/user-edit.component";
import {AuthorEditComponent} from "./shop/author/author-edit/author-edit.component";
import {AuthorNewComponent} from "./shop/author/author-new/author-new.component";
import {ProductsComponent} from "./shop/products/products.component";
import {ProductEditComponent} from "./shop/product/product-edit/product-edit.component";
import {ProductTypeEditComponent} from "./shop/product/product-type-edit/product-type-edit.component";
import {ProductTypeNewSubComponent} from "./shop/product/product-type-new-sub/product-type-new-sub.component";
import {CategoryEditComponent} from "./shop/product/category-edit/category-edit.component";
import {CategoryNewSubComponent} from "./shop/product/category-new-sub/category-new-sub.component";
import {AddressEditComponent} from "./shop/address/address-edit/address-edit.component";
import {AddressesComponent} from "./shop/address/addresses/addresses.component";
import {AdminComponent} from "./shop/admin/admin.component";
import {WeatherWidgetComponent} from "./shop/weather-widget/weather-widget.component";
import {UserSettingsComponent} from "./shop/user/user-settings/user-settings.component";


const routes: Routes = [
  {path: 'user-edit/:id', component: UserEditComponent},
  {path: 'author-edit/:id', component: AuthorEditComponent},
  {path: 'author-new', component: AuthorNewComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product/edit/:id', component: ProductEditComponent},
  {path: 'product-type/edit/:id', component: ProductTypeEditComponent},
  {path: 'product-type/new-sub/:id', component: ProductTypeNewSubComponent},
  {path: 'category/edit/:id', component: CategoryEditComponent},
  {path: 'category/new-sub/:id', component: CategoryNewSubComponent},
  {path: 'address-edit/:addressId/:userId', component: AddressEditComponent},
  {path: 'address/:id', component: AddressesComponent},
  {path: 'admin/:tabIndex', component: AdminComponent},
  {path: 'user-settings/:userId/:tabIndex', component: UserSettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
