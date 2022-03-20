import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { AddressesComponent } from './addresses/addresses.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AddressEditComponent,
    AddressesComponent
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
export class AddressModule { }
