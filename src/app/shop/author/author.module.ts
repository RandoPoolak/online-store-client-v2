import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorEditComponent} from "./author-edit/author-edit.component";
import {AuthorsComponent} from "./authors/authors.component";
import {AuthorNewComponent} from "./author-new/author-new.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorEditComponent,
    AuthorNewComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    RouterModule
  ]
})
export class AuthorModule { }
