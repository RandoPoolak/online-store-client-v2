import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/User";
import {Role} from "../../../shared/models/Role";
import {ContactMethod} from "../../../shared/models/ContactMethod";
import {UserService} from "../../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../shared/models/Address";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User = {
    active: false,
    id: 0,
    email: "",
    userName: "",
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

  primaryAddress: Address = {
    id: 0,
    country: "",
    city: "",
    street: "",
    zipCode: "",
    defaultAddress: false,
    active: false
  }

  requestId: number = 0;
  contactMethods = ContactMethod;
  enumContactMethods=[""];

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.enumContactMethods = Object.keys(this.contactMethods)
  }

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
      this.initForm();
    });
  }

  userEditForm = this.formBuilder.group({
      email: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      logoUrl: new FormControl(),
      role: new FormControl(),
      contactMethod: new FormControl(),
    }
  )

  initForm(){
    this.userEditForm = this.formBuilder.group({
        email: [this.user.email, Validators.required],
        userName: [this.user.userName, Validators.required],
        password: [this.user.password, Validators.required],
        logoUrl: [this.user.logoUrl, Validators.required],
        role: [this.user.role, Validators.required],
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
      this.router.navigate(['/user-settings/' + this.requestId as String + '/0']).then(r => console.log("Redirected ->"+r));
      location.reload();
    });
  }
}
