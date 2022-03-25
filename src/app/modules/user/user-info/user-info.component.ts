import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/User";
import {Role} from "../../../shared/models/Role";
import {ContactMethod} from "../../../shared/models/ContactMethod";
import {UserService} from "../../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Address} from "../../../shared/models/Address";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

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

  primaryAddress: Address = {
    id: 0,
    country: "",
    city: "",
    street: "",
    zipCode: "",
    defaultAddress: false,
    active: false
  }

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.requestId = +params["userId"];
    })
    this.requestUser(this.requestId);
  }

  requestUser(id: number) {
    this.userService.getUserById(id).subscribe(value => {
      this.user = <User>value;
      for (let address of this.user.addresses) {
        if (address.defaultAddress){
          this.primaryAddress = address;
        }
      }
    });
  }
}
