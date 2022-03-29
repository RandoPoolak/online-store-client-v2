import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ContactMethod} from "../../../shared/models/ContactMethod";
import {User} from "../../../shared/models/User";
import {Role} from "../../../shared/models/Role";
import {Address} from "../../../shared/models/Address";
import {LoginRegisterService} from "../../../shared/services/login-register.service";
import {Router} from "@angular/router";

import {UtilService} from "../../../shared/services/util.service";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  contactMethods = ContactMethod;
  enumContactMethods = [""]

  userRegisterForm = this.formBuilder.group({
    id: [0],
    active: [true],
    role: [Role.USER],
    email: ['', [Validators.required, Validators.email]],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    logoUrl: ['', Validators.required],
    contactMethod: ['', Validators.required],
    addresses: this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      defaultAddress: [true],
      active: [true],
      id: [0],
    })
  })


  constructor(
    private formBuilder: FormBuilder,
    private loginRegisterService: LoginRegisterService,
    private router: Router,
    private util: UtilService,
    private app: AppComponent
  ) {
    if(sessionStorage.getItem('user') != null){
      this.router.navigate(["/shop"]).then();
    }
    this.enumContactMethods = Object.keys(this.contactMethods);
  }

  ngOnInit(): void {
  }

  generateUser(){
    let user = this.userRegisterForm.value;
    let addresses: Address[] = []
    let address = user.addresses;
    addresses.push(address);
    user.addresses = addresses;
    return user;
  }

  onSubmit(){
    this.loginRegisterService.registerUser(this.generateUser()).subscribe(data=>{
      let user = data as User;
      this.util.updateUserSessionInfo(user);
      this.app.updateValuesFromStorage();

      if(sessionStorage.getItem('tempCart') != null) {
        this.util.linkTempCartToUser(user);
      }

      this.router.navigate(['/shop']).then(()=> {})
    })
  }


}
