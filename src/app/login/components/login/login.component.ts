import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginData = { username: '', password: '' };

  constructor(private _service: AuthService) {}

  ngOnInit() {}

  login() {
    this._service.obtainAccessToken(this.loginData);
  }
}
