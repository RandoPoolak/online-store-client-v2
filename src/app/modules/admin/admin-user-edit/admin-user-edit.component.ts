import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/User";
import {Role} from "../../../shared/models/Role";
import {ContactMethod} from "../../../shared/models/ContactMethod";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit {
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

  userEditForm = this.formBuilder.group({
      email: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      logoUrl: new FormControl(),
      role: new FormControl(),
      contactMethod: new FormControl(),
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
    if(JSON.parse(sessionStorage.getItem('userRole')!) != "ADMIN"){
      this.router.navigate(['/not-allowed']).then();
    }
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
      this.initForm();
    })
  }

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
      this.router.navigate(['/admin/0']).then(r => console.log("Redirected ->"+r));
    });
  }
}
