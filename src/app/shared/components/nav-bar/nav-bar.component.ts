import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/login/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  src = 'assets/logo.gif';
  login: string;

  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this.authService.loginStatusObs.subscribe(icon => {
      this.login = icon;
      console.log(icon);
    });
  }

  checkLogin() {
    this.authService.checkCredentials() ? this.authService.logout() : this._router.navigate(['/login']);
  }
}
