import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../shared/models/User";
import {Address} from "../../../shared/models/Address";
import {AddressService} from "../../../shared/services/address.service";
import {UserService} from "../../../shared/services/user.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {WeatherWidgetComponent} from "../../weather-widget/weather-widget.component";
import {UtilService} from "../../../shared/services/util.service";

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10,25,50];
  dataSource = new MatTableDataSource<Address>([])
  user: User;

  newAddressForm = this.formBuilder.group({
      country: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      zipCode: new FormControl("", Validators.required),
    }
  )


  displayColumns: string[] = ['address', 'edit', 'deactivate','makeDefault']

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private weather: WeatherWidgetComponent,
    private util: UtilService,
    ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.prepareData(this.user);
  }

  prepareData(user: User){
    this.dataSource.data = this.util.getUserActiveAddresses(user);
    this.dataSource.paginator = this.paginator;
  }


  deactivateAddress(id: Number): void {
    this.addressService.deactivateAddress(id).subscribe(() => {
      this.user.addresses.forEach(address => {
        if(address.id == id){
          address.active = false;
        }
      })
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.ngOnInit();
    })
  }

  setDefault(id: Number): void{
    for(let address of this.user.addresses){
      address.defaultAddress = address.id == id;
    }
    this.util.updateUserSessionInfo(this.user);
    this.userService.updateUser(this.user).subscribe(() => {
      this.weather.updateUserLocation();
      window.history.replaceState({}, '',"user-settings/1");
      window.location.reload();
    })
  }

  onAddressSubmit(): void {
    let newAddress = this.newAddressForm.value;
    newAddress.defaultAddress = false;
    newAddress.active = true;
    this.user.addresses.push(newAddress);
    this.userService.updateUser(this.user).subscribe(response => {
      let updatedUser = response as User;
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      this.ngOnInit();
      this.newAddressForm.reset();
    });
  }

}
