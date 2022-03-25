import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import { UserEditComponent } from './user-edit/user-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import { UserAddressEditComponent } from './user-address-edit/user-address-edit.component';
import { UserAddressesComponent } from './user-addresses/user-addresses.component';
import { UserPasswordEditComponent } from './user-password-edit/user-password-edit.component';
import {MatTabsModule} from "@angular/material/tabs";
import { UserInfoComponent } from './user-info/user-info.component';
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    UserSettingsComponent,
    UserEditComponent,
    UserAddressEditComponent,
    UserAddressesComponent,
    UserPasswordEditComponent,
    UserInfoComponent,
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
        MatSnackBarModule,
        MatPaginatorModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
    ]
})
export class UserModule { }
