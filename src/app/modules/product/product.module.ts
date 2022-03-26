import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductTreeComponent} from "./product-tree/product-tree.component";
import {ProductTypeNewSubComponent} from "./product-type-new-sub/product-type-new-sub.component";
import {CategoryNewSubComponent} from "./category-new-sub/category-new-sub.component";
import {ProductTypeEditComponent} from "./product-type-edit/product-type-edit.component";
import {CategoryEditComponent} from "./category-edit/category-edit.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ProductViewComponent } from './product-view/product-view.component';



@NgModule({
    declarations: [
        ProductTreeComponent,
        ProductTypeNewSubComponent,
        CategoryNewSubComponent,
        ProductTypeEditComponent,
        CategoryEditComponent,
        ProductEditComponent,
        AdminProductListComponent,
        ProductViewComponent,
    ],
    exports: [
        ProductTreeComponent,
        AdminProductListComponent
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
        RouterModule,
        MatCardModule,
        MatTableModule,
        FormsModule,
        MatPaginatorModule
    ]
})
export class ProductModule { }
