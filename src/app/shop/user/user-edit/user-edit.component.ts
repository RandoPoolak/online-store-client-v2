import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/User";
import {Role} from "../../../shared/models/Role";
import {ContactMethod} from "../../../shared/models/ContactMethod";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Address} from "../../../shared/models/Address";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
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

  addresses: Address[] = [];

  userEditForm = this.formBuilder.group({
    login: new FormControl(),
    password: new FormControl(),
    logoUrl: new FormControl(),
    role: new FormControl(),
    contactMethod: new FormControl(),
    addresses: new FormControl(),
    }
  )

  addressForm = this.formBuilder.group({
      country: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      zipCode: new FormControl("", Validators.required),
    }
  )

  requestId: number = 0;
  roles = Role;
  contactMethods = ContactMethod;
  enumRoles=[""];
  enumContactMethods=[""];

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router

  ) {
    this.enumRoles = Object.keys(this.roles);
    this.enumContactMethods = Object.keys(this.contactMethods);
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
      this.addresses = this.user.addresses;
      this.initForm();
    })
  }

  initForm(){
    let defaultAddress = this.addresses.find(address => address.defaultAddress)
    this.userEditForm = this.formBuilder.group({
        login: [this.user.login, Validators.required],
        password: [this.user.password, Validators.required],
        logoUrl: [this.user.logoUrl, Validators.required],
        role: [this.user.role, Validators.required],
        contactMethod: [this.user.contactMethod, Validators.required],
        addresses: [Validators.required],
      }
    )
    this.userEditForm.get("addresses")?.setValue(defaultAddress);
  }

  onSubmit():void {
    let updatedUser = this.userEditForm.value;
    for (let address of this.addresses) {
      address.defaultAddress = this.userEditForm.value.addresses.id == address.id;
    }
    updatedUser.addresses = this.addresses;
    updatedUser.id = this.user.id;
    updatedUser.active = this.user.active;
    this.userService.updateUser(updatedUser).subscribe(()=>{
      this.router.navigate(['/user']).then(r => console.log("Redirected ->"+r))
    });
  }

  onAddressSubmit():void {
    let newAddress = this.addressForm.value;
    newAddress.defaultAddress = false;
    newAddress.active = true;
    this.user.addresses.push(newAddress);
    this.userService.updateUser(this.user).subscribe(()=> {
      this.ngOnInit();
      this.addressForm.reset();
    });
  }
}
