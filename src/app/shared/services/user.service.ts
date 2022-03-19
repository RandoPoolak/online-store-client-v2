import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {Address} from "../models/Address";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USER_BASE_URL = 'user';
  private ADDRESS_BASE_URL = 'address';

  constructor(private httpClient: HttpClient) { }

  public getAllUsers() {
    return this.httpClient.get(this.USER_BASE_URL)
  }

  public activateUser(id: number): Observable<unknown> {
    return this.httpClient.get(this.USER_BASE_URL + "/restore/" + id)
  }

  public deactivateUser(id: number): Observable<unknown> {
    return this.httpClient.get(this.USER_BASE_URL + "/delete/" + id)
  }

  public createUser(user: User) {
    let newUser = JSON.stringify(user)
    return this.httpClient.post(this.USER_BASE_URL + "/create", newUser);
  }

  public getUserById(id: number) {
    return this.httpClient.get(this.USER_BASE_URL + "/" + id);
  }

  public updateUser(user: User){
    let newUser = JSON.stringify(user);
    return this.httpClient.post(this.USER_BASE_URL +"/update", newUser);
  }

  public getAddressById(id: number) {
    return this.httpClient.get(this.ADDRESS_BASE_URL + "/" + id);
  }

  public updateAddress(address: Address){
    let newAddress = JSON.stringify(address);
    return this.httpClient.post(this.ADDRESS_BASE_URL+"/update", newAddress);
  }


}
