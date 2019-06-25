import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services';
import { nextTick } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginData = { username: '', password: '' };

  constructor(private _service: AuthService) {}

  login() {
    this._service.obtainAccessToken(this.loginData);
  }
}
