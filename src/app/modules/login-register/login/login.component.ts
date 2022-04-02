import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginRegisterService} from "../../../shared/services/login-register.service";
import {Login} from "../../../shared/models/Login";
import {User} from "../../../shared/models/User";
import {Router} from "@angular/router";
import {UtilService} from "../../../shared/services/util.service";
import {AppComponent} from "../../../app.component";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  login: Login;

  loginForm = this.formBuilder.group({
    email: ["", [Validators.email, Validators.required]],
    pass: ["", Validators.required],
  })

  constructor(
    private loginRegisterService: LoginRegisterService,
    private router: Router,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private app: AppComponent,
  ) {
    if(sessionStorage.getItem('user') != null){
      this.router.navigate(["/shop"]).then();
    }
  }

  ngOnInit(): void {
  }

  requestLogin(){
    this.loginRegisterService.login(this.generateLogin()).subscribe(response =>{
      let user = response as User;
      this.util.updateUserSessionInfo(user);
      this.app.updateValuesFromStorage();

      if(sessionStorage.getItem('tempCart') != null) {
        this.util.linkTempCartToUser(user);
      }

      window.history.replaceState({},'',"/shop");
      window.location.reload();
    })
  }

  generateLogin(){
    return new Login(this.loginForm.value.email, this.loginForm.value.pass);
  }
}
