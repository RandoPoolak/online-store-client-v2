import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    ) {
    if(JSON.parse(sessionStorage.getItem('userRole')!) != "ADMIN"){
      this.router.navigate(['/not-allowed']).then();
    }
  }

  tabIndex: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.tabIndex = +params['tabIndex'];
    })
  }

}
