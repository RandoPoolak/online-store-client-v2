import { Component, OnInit } from '@angular/core';
import {Address} from "../../../shared/models/Address";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../../shared/services/address.service";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  address: Address = {
    id: 0,
    country: "",
    city: "",
    street: "",
    zipCode: "",
    defaultAddress: false,
    active: true
  }

  requestAddressId: number = 0;
  requestUserId: number = 0;

  addressEditForm = this.formBuilder.group({
      country: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      zipCode: new FormControl("", Validators.required),
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private addressService: AddressService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.requestAddressId = +params["addressId"];
      this.requestUserId = +params["userId"];
      this.requestAddress(this.requestAddressId);
  })
  }

  requestAddress(id: number) {
    this.addressService.getAddressById(id).subscribe(value => {
      this.address = <Address>value;
      this.initForm();
    })
  }

  initForm() {
    this.addressEditForm = this.formBuilder.group({
      country: [this.address.country, Validators.required],
      city: [this.address.city, Validators.required],
      street: [this.address.street, Validators.required],
      zipCode: [this.address.zipCode, Validators.required],
    })
  }

  onSubmit() {
    let updatedAddress = this.addressEditForm.value;
    updatedAddress.id = this.address.id;
    updatedAddress.defaultAddress = this.address.defaultAddress;
    updatedAddress.active = this.address.active;

    this.addressService.updateAddress(updatedAddress).subscribe(()=>{
      this.router.navigate(['/address/' + this.requestUserId]).then(r => console.log("Redirected ->"+r))
    });
  }


}
