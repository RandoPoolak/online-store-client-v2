export class Author{
  id: bigint;
  firstName: String;
  lastName: String;
  active: boolean;


  constructor(id: bigint, firstName: String, lastName: String, active: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.active = active;
  }
}
