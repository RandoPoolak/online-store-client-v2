import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {UsersComponent} from "./users/users.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import { UserEditComponent } from './user-edit/user-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    UserSettingsComponent,
    UsersComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class UserModule { }