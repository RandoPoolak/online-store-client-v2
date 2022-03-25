import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Address} from "../../../shared/models/Address";
import {AddressService} from "../../../shared/services/address.service";
import {UserService} from "../../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../shared/models/User";

@Component({
  selector: 'app-admin-addresses',
  templateUrl: './admin-addresses.component.html',
  styleUrls: ['./admin-addresses.component.css']
})
export class AdminAddressesComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  user: any;
  pageSizes = [10,25,50];
  requestId: number = 0;
  dataSource = new MatTableDataSource<Address>([]);
  displayColumns: string[] = ['id', 'country', 'city',
    'street', 'zipCode', 'isActive', 'edit', 'deactivate','makeDefault'];


  userAddresses: Address[] = [];



  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.requestId = +params["id"];
      this.requestUser(this.requestId);
    })
  }

  requestUser(id: number) {
    this.userService.getUserById(id).subscribe(value => {
      this.user = <User>value;
      this.dataSource.data = this.user.addresses;
      this.dataSource.paginator = this.paginator;
    })
  }

  activateAddress(id: number): void {
    this.addressService.activateAddress(id).subscribe(() => {
      this.ngOnInit()
    });
  }

  deactivateAddress(id: number): void {
    this.addressService.deactivateAddress(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  setDefault(id: number): void{
    for (let address of this.dataSource.data) {
      address.defaultAddress = address.id == id;
    }
    this.user.addresses = this.dataSource.data;
    this.userService.updateUser(this.user).subscribe(() => {
      this.ngOnInit();
    })
  }
}
