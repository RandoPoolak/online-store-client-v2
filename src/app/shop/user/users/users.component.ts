import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/User";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  displayColumns: string[] = ['id','login','password',
    'logoUrl','role','contactMethod','isActive',
    'addressId','addressCountry','addressCity',
    'addressStreet','addressZipCode','addressDefaultAddress','addressActive','edit','deactivate'];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(value => this.users= <User[]>value);
    console.log(this.users)
  }

  activateUser(id:number):void{
    this.userService.activateUser(id).subscribe((data) => {console.log(data);
    this.ngOnInit()});
  }

  deactivateUser(id:number):void{
    this.userService.deactivateUser(id).subscribe((data) =>{
      console.log(data);
      this.ngOnInit();
    })
  }

}
