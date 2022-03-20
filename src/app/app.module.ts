import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {AppInterceptor} from "./shared/interceptor/app.interceptor";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserModule} from "./shop/user/user.module";
import {AuthorModule} from "./shop/author/author.module";
import {ProductModule} from "./shop/product/product.module";
import {ShopModule} from "./shop/shop.module";
import {AddressModule} from "./shop/address/address.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    UserModule,
    AuthorModule,
    ProductModule,
    ShopModule,
    AddressModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
