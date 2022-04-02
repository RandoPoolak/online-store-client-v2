import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/User";
import {ContactMethod} from "../../../shared/models/ContactMethod";
import {UserService} from "../../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Address} from "../../../shared/models/Address";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User;

  primaryAddress: Address = {
    id: 0,
    country: "",
    city: "",
    street: "",
    zipCode: "",
    defaultAddress: false,
    active: false
  }

  userEditForm = this.formBuilder.group({
      email: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      logoUrl: new FormControl(),
      role: new FormControl(),
      contactMethod: new FormControl(),
    }
  );

  contactMethods = ContactMethod;
  enumContactMethods=[""];

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.enumContactMethods = Object.keys(this.contactMethods)
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.initForm();
  }

  initForm(){
    this.userEditForm = this.formBuilder.group({
        email: [this.user.email, Validators.required],
        userName: [this.user.userName, Validators.required],
        password: [this.user.password],
        logoUrl: [this.user.logoUrl, Validators.required],
        role: [this.user.role],
        contactMethod: [this.user.contactMethod, Validators.required]
      }
    )
  }

  onSubmit():void {
    let updatedUser = this.userEditForm.value;
    updatedUser.addresses = this.user.addresses;
    updatedUser.id = this.user.id;
    updatedUser.active = this.user.active;
    this.userService.updateUser(updatedUser).subscribe(()=>{
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      window.history.replaceState({}, '',"user-settings/0");
      window.location.reload();
    });
  }
}
