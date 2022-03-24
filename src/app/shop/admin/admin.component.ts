import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }
  tabIndex: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.tabIndex = +params['tabIndex'];
    })
  }

}
