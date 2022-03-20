import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../models/Address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private ADDRESS_BASE_URL = 'address;'

  constructor(private httpClient: HttpClient) { }

  public getAllAddresses() {
    return this.httpClient.get(this.ADDRESS_BASE_URL)
  }

  public activateAddress(id: number): Observable<unknown> {
    return this.httpClient.get(this.ADDRESS_BASE_URL + "/restore/" + id)
  }

  public deactivateAddress(id: number): Observable<unknown> {
    return this.httpClient.get(this.ADDRESS_BASE_URL + "/delete/" + id)
  }

  public createAddress(address: Address) {
    let newAddress = JSON.stringify(address)
    return this.httpClient.post(this.ADDRESS_BASE_URL + "/create", newAddress);
  }

  public getAddressById(id: number) {
    return this.httpClient.get(this.ADDRESS_BASE_URL + "/" + id);
  }

  public updateAddress(address: Address){
    let newAddress = JSON.stringify(address);
    return this.httpClient.post(this.ADDRESS_BASE_URL +"/update", newAddress);
  }
}
