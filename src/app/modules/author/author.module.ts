import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorEditComponent} from "./author-edit/author-edit.component";
import {AuthorsComponent} from "./authors/authors.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
    declarations: [
        AuthorsComponent,
        AuthorEditComponent,
    ],
    exports: [
        AuthorsComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        RouterModule,
        MatPaginatorModule,
        MatIconModule
    ]
})
export class AuthorModule { }
