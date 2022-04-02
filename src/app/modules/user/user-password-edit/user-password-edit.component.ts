import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {UtilService} from "../../../shared/services/util.service";

@Component({
  selector: 'app-user-password-edit',
  templateUrl: './user-password-edit.component.html',
  styleUrls: ['./user-password-edit.component.css']
})
export class UserPasswordEditComponent implements OnInit {
  hideOld = true;
  hideNew = true;

  passwordForm = this.formBuilder.group({
    passwordOld: ['', Validators.required],
    passwordNew: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private util: UtilService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.getUserById((JSON.parse(sessionStorage.getItem('user')!).id)).subscribe(response => {
      let user = response as User;
      if(user.password == this.passwordForm.value.passwordOld){
        user.password = this.passwordForm.value.passwordNew;
        console.log(user)
        this.userService.updateUser(user).subscribe(()=> this.util.openSnackBar("Password changed", "Done", 7000))
      }else{
        this.util.openSnackBar("Old password does not match", "Done", 7000);
      }
    });
  }

}
