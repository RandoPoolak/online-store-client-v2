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
import {AdminModule} from "./modules/admin/admin.module";
import { ShopViewComponent } from './modules/shop-view/shop-view.component';
import {UserModule} from "./modules/user/user.module";
import {ProductModule} from "./modules/product/product.module";
import {AuthorModule} from "./modules/author/author.module";
import {WeatherWidgetComponent} from "./modules/weather-widget/weather-widget.component";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {OrderModule} from "./modules/order/order.module";


@NgModule({
  declarations: [
    AppComponent,
    ShopViewComponent,
    WeatherWidgetComponent,
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
        AdminModule,
        MatTreeModule,
        MatButtonModule,
        MatIconModule,
        MatButtonToggleModule,
        MatInputModule,
        OrderModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
