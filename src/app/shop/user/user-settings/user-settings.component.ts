import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  tabIndex: number = 0;
  userId: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.userId = +params['userId'];
      this.tabIndex = +params['tabIndex'];
    })
  }
}
