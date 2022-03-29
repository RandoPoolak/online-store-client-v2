import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
    if (sessionStorage.getItem('user') == null) {
      this.router.navigate(['/not-allowed']).then();
    }
  }

  tabIndex: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.tabIndex = +params['tabIndex']
    })
  }
}
