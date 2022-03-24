import {Component, OnInit, ViewChild} from '@angular/core';
import {Address} from "../../../shared/models/Address";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {AddressService} from "../../../shared/services/address.service";
import {User} from "../../../shared/models/User";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  user: any;
  pageSizes = [10,25,50];
  requestId: number = 0;
  dataSource = new MatTableDataSource<Address>([]);
  displayColumns: string[] = ['id', 'country', 'city',
    'street', 'zipCode', 'isActive', 'edit', 'deactivate','makeDefault'];

  newAddressForm = this.formBuilder.group({
      country: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      zipCode: new FormControl("", Validators.required),
    }
  )

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
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

  onAddressSubmit(): void {
    let newAddress = this.newAddressForm.value;
    newAddress.defaultAddress = false;
    newAddress.active = true;
    this.user.addresses.push(newAddress);
    this.userService.updateUser(this.user).subscribe(() => {
      this.ngOnInit();
      this.newAddressForm.reset();
    });
  }
}
