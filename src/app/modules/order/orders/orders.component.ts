import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private router: Router) {
    if(sessionStorage.getItem('user') == null){
      this.router.navigate(['/not-allowed']).then();
    }
  }

  ngOnInit(): void {
  }

}
