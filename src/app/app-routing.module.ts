import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorsComponent} from "./shop/author/authors/authors.component";
import {AuthorEditComponent} from "./shop/author/author-edit/author-edit.component";
import {AuthorNewComponent} from "./shop/author/author-new/author-new.component";
import {ProductTreeComponent} from "./shop/product/product-tree/product-tree.component";
import {ProductsComponent} from "./shop/products/products.component";
import {ProductEditComponent} from "./shop/product/product-edit/product-edit.component";
import {ProductTypeEditComponent} from "./shop/product/product-type-edit/product-type-edit.component";
import {ProductTypeNewSubComponent} from "./shop/product/product-type-new-sub/product-type-new-sub.component";
import {CategoryEditComponent} from "./shop/product/category-edit/category-edit.component";
import {CategoryNewSubComponent} from "./shop/product/category-new-sub/category-new-sub.component";


const routes: Routes = [
  {path: 'author', component: AuthorsComponent},
  {path: 'author-edit/:id', component: AuthorEditComponent},
  {path: 'author-new', component: AuthorNewComponent},
  {path: 'product-tree', component: ProductTreeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product/edit/:id', component: ProductEditComponent},
  {path: 'product-type/edit/:id', component: ProductTypeEditComponent},
  {path: 'product-type/new-sub/:id', component: ProductTypeNewSubComponent},
  {path: 'category/edit/:id', component: CategoryEditComponent},
  {path: 'category/new-sub/:id', component: CategoryNewSubComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
