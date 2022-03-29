import { Component, OnInit } from '@angular/core';
import {Address} from "../../../shared/models/Address";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../../shared/services/address.service";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {UtilService} from "../../../shared/services/util.service";

@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.css']
})
export class UserAddressEditComponent implements OnInit {
  user: User;
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
    private router: Router,
    private util: UtilService
  ) {
    this.activeRoute.params.subscribe(params => {
      this.requestAddressId = +params["addressId"];
    })

    if(sessionStorage.getItem('user') != null){
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }else{
      this.router.navigate(["/shop"]).then();
    }

    if(!this.util.userHasAddress(this.user, this.requestAddressId)){
      this.router.navigate(["/shop"]).then();
    }
  }

  ngOnInit(): void {
    this.requestAddress(this.requestAddressId);
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
      let index = this.user.addresses.findIndex(address => address.id == this.address.id);
      this.user.addresses[index] = updatedAddress;
      this.util.updateUserSessionInfo(this.user);

      this.router.navigate(['/user-settings/1']).then(r => console.log("Redirected ->"+r))
    });
  }

}
