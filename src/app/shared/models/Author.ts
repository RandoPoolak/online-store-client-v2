export class Author{
  id: number;
  firstName: String;
  lastName: String;
  active: boolean;


  constructor(id: number, firstName: String, lastName: String, active: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.active = active;
  }
}
