import {Role} from "./Role";
import {ContactMethod} from "./ContactMethod";
import {Address} from "./Address";

export class User{
  id: Number;
  email: String;
  userName: String;
  password: String;
  logoUrl: String;
  role: Role;
  contactMethod: ContactMethod;
  addresses: Address[];
  active: boolean

  constructor(id: Number, email: String, userName: String, password: String, logoUrl: String, role: Role, contactMethod: ContactMethod, addresses: Address[], active: boolean) {
    this.id = id;
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.logoUrl = logoUrl;
    this.role = role;
    this.contactMethod = contactMethod;
    this.addresses = addresses;
    this.active = active;
  }
}
