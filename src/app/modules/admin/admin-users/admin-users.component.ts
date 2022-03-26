import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../shared/models/User";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../shared/services/user.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  pageSizes = [10,25,50];
  displayColumns: string[] = ['id','login','password',
    'logoUrl','role','contactMethod','isActive',
    'address','edit','deactivate'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(value =>{
      this.users= <User[]>value;
      this.dataSource.data = this.users as User[];
      this.dataSource.paginator = this.paginator;
    })
  }

  activateUser(id:number):void{
    this.userService.activateUser(id).subscribe(() => this.ngOnInit());
  }

  deactivateUser(id:number):void{
    this.userService.deactivateUser(id).subscribe(() =>{
      this.ngOnInit();
    })
  }

}
