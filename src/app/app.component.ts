import {Component, Injectable} from '@angular/core';
import {User} from "./shared/models/User";
import {Role} from "./shared/models/Role";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent{
  title = 'online-store-client-v2';
  user: User;
  userRole: Role;

  constructor() {
    this.updateValuesFromStorage();
  }

  updateValuesFromStorage(){
    if(sessionStorage.getItem('user') != null){
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.userRole = JSON.parse(sessionStorage.getItem('userRole')!);
    }
  }

  logout(){
    sessionStorage.clear();
    window.history.replaceState({},'',"/shop");
    window.location.reload();
  }
}
