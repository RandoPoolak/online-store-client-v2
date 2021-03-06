import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {UserEditComponent} from "./modules/user/user-edit/user-edit.component";
import {AuthorEditComponent} from "./modules/author/author-edit/author-edit.component";
import {ShopViewComponent} from "./modules/shop-view/shop-view.component";
import {ProductEditComponent} from "./modules/product/product-edit/product-edit.component";
import {ProductTypeEditComponent} from "./modules/product/product-type-edit/product-type-edit.component";
import {ProductTypeNewSubComponent} from "./modules/product/product-type-new-sub/product-type-new-sub.component";
import {CategoryEditComponent} from "./modules/product/category-edit/category-edit.component";
import {CategoryNewSubComponent} from "./modules/product/category-new-sub/category-new-sub.component";
import {UserAddressEditComponent} from "./modules/user/user-address-edit/user-address-edit.component";
import {AdminComponent} from "./modules/admin/admin/admin.component";
import {UserSettingsComponent} from "./modules/user/user-settings/user-settings.component";
import {AdminAddressesComponent} from "./modules/admin/admin-addresses/admin-addresses.component";
import {UserAddressesComponent} from "./modules/user/user-addresses/user-addresses.component";
import {AdminAddressEditComponent} from "./modules/admin/admin-address-edit/admin-address-edit.component";
import {AdminUserEditComponent} from "./modules/admin/admin-user-edit/admin-user-edit.component";
import {CartComponent} from "./modules/order/cart/cart.component";
import {OrdersComponent} from "./modules/order/orders/orders.component";
import {ProductViewComponent} from "./modules/product/product-view/product-view.component";
import {LoginComponent} from "./modules/login-register/login/login.component";
import {RegisterComponent} from "./modules/login-register/register/register.component";
import {NotAllowedComponent} from "./modules/bad-requests/not-allowed/not-allowed.component";




const routes: Routes = [
  {path: 'admin-user-edit/:id', component: AdminUserEditComponent},
  {path: 'author-edit/:id', component: AuthorEditComponent},
  {path: 'shop', component: ShopViewComponent},
  {path: 'product/edit/:id', component: ProductEditComponent},
  {path: 'product-type/edit/:id', component: ProductTypeEditComponent},
  {path: 'product-type/new-sub/:id', component: ProductTypeNewSubComponent},
  {path: 'category/edit/:id', component: CategoryEditComponent},
  {path: 'category/new-sub/:id', component: CategoryNewSubComponent},
  {path: 'user-address-edit/:addressId', component: UserAddressEditComponent},
  {path: 'admin-address-edit/:addressId/:userId', component: AdminAddressEditComponent},
  {path: 'admin-addresses/:id', component: AdminAddressesComponent},
  {path: 'user-addresses/:id', component: UserAddressesComponent},
  {path: 'admin/:tabIndex', component: AdminComponent},
  {path: 'user-settings/:tabIndex', component: UserSettingsComponent},
  {path: 'cart', component:CartComponent},
  {path: 'orders', component:OrdersComponent},
  {path: 'product/:productId', component:ProductViewComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'not-allowed', component:NotAllowedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
