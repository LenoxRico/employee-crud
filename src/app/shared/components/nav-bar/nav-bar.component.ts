import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/login/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  src = 'assets/logo.gif';
  login: string;

  constructor(private authService: AuthService) {
    this.login = 'account_circle';
  }

  ngOnInit() {}

  checkLogin() {
    //settings_power
    this.authService.checkCredentials();
  }
}
