import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {CartComponent} from "./cart/cart.component";
import {ProductsComponent} from "./products/products.component";
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';




@NgModule({
    declarations: [
        OrderHistoryComponent,
        CartComponent,
        ProductsComponent,
        WeatherWidgetComponent,


    ],
    exports: [
        WeatherWidgetComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
        MatTreeModule,
        MatIconModule,
        RouterModule
    ]
})
export class ShopModule { }
