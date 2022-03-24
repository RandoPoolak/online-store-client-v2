import { Component, OnInit } from '@angular/core';
import {Address} from "../../../shared/models/Address";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {AddressService} from "../../../shared/services/address.service";
import {User} from "../../../shared/models/User";
import {Role} from "../../../shared/models/Role";
import {ContactMethod} from "../../../shared/models/ContactMethod";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  user: User = {
    active: false,
    id: 0,
    login: "",
    logoUrl: "",
    password: "",
    role: Role.USER,
    contactMethod: ContactMethod.EMAIL,
    addresses: [{
      id: 0,
      country: "",
      city: "",
      street: "",
      zipCode: "",
      defaultAddress: true,
      active: false
    }],
  }

  requestId: number = 0;
  userAddresses: Address[] = [];
  displayColumns: string[] = ['id', 'country', 'city',
    'street', 'zipCode', 'isActive', 'edit', 'deactivate','makeDefault']

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.requestId = +params["id"];
      this.requestUser(this.requestId);
    })
  }

  requestUser(id: number) {
    this.userService.getUserById(id).subscribe(value => {
      this.user = <User>value;
      this.userAddresses = this.user.addresses;
    })
  }

  activateAddress(id: number): void {
    this.addressService.activateAddress(id).subscribe(() => {
      this.ngOnInit()
    });
  }

  deactivateAddress(id: number): void {
    this.addressService.deactivateAddress(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  setDefault(id: number): void{
    for (let address of this.userAddresses) {
      address.defaultAddress = address.id == id;
    }
    this.user.addresses = this.userAddresses;
    this.userService.updateUser(this.user).subscribe(() => {
      this.ngOnInit();
    })
  }
}
