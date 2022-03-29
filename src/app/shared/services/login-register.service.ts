import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Login} from "../models/Login";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  private LOGIN_BASE_URL = 'login';
  private REGISTER_BASE_URL = 'register';

  constructor(private httpClient: HttpClient) {
  }

  public registerUser(user: User){
    let userRegister = JSON.stringify(user)
    return this.httpClient.post(this.REGISTER_BASE_URL, userRegister);
  }

  public login(login:Login){
    let loginInfo = JSON.stringify(login)
    return this.httpClient.post(this.LOGIN_BASE_URL, loginInfo)
  }
}
