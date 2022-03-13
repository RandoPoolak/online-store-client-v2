export class Address{
  id: Number;
  country: String;
  city: String;
  street: String;
  zipCode: String;
  DefaultAddress: boolean;
  active: boolean;

  constructor(id: Number, country: String, city: String, street: String, zipCode: String, DefaultAddress: boolean, active: boolean) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.street = street;
    this.zipCode = zipCode;
    this.DefaultAddress = DefaultAddress;
    this.active = active;
  }
}
