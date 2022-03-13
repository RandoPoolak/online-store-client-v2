export class Author{
  id: Number;
  firstName: String;
  lastName: String;
  active: boolean;

  constructor(id: Number, firstName: String, lastName: String, active: boolean) {

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.active = active;
  }
}
