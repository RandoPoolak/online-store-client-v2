import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../shared/models/User";
import {Role} from "../../../shared/models/Role";
import {ContactMethod} from "../../../shared/models/ContactMethod";
import {Address} from "../../../shared/models/Address";
import {AddressService} from "../../../shared/services/address.service";
import {UserService} from "../../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10,25,50];
  dataSource = new MatTableDataSource<Address>([])

  user: User = {
    active: false,
    id: 0,
    email: "",
    userName: "",
    logoUrl: "",
    password: "",
    role: Role.USER,
    contactMethod: ContactMethod.EMAIL,
    addresses: [{
      id: 0,
      country: "",
      city: "",
      street: "",
      zipCode: "",
      defaultAddress: true,
      active: false
    }],
  }

  newAddressForm = this.formBuilder.group({
      country: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      zipCode: new FormControl("", Validators.required),
    }
  )

  requestId: number = 0;
  activeAddresses: Address[] = [];

  displayColumns: string[] = ['address', 'edit', 'deactivate','makeDefault']

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.requestId = +params["userId"];
      this.requestUser(this.requestId);
    })

  }

  requestUser(id: number) {
    this.activeAddresses = [];
    this.userService.getUserById(id).subscribe(value => {
      this.user = <User>value;
      this.dataSource.paginator = this.paginator;
      for (let address of this.user.addresses) {
        if (address.active) {
          this.activeAddresses.push(address)
        }
      }
      this.dataSource.data = this.activeAddresses;
    })
  }

  deactivateAddress(id: Number): void {
    this.addressService.deactivateAddress(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  setDefault(id: Number): void{
    for (let address of this.user.addresses) {
      address.defaultAddress = address.id == id;
    }
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
