import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  loginStatus = new BehaviorSubject('account_circle');
  loginStatusObs = this.loginStatus.asObservable();
  private authApi: string;

  constructor(private _router: Router, private _http: HttpClient) {
    this.authApi = 'http://192.168.207.46:8281/oauth/token?grant_type=client_credentials';
  }

  obtainAccessToken(loginData) {
    this.loginStatus.next('settings_power');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${loginData.username}:${loginData.password}`)}`
    });
    const options = { headers };

    this._http
      .post(this.authApi, { grant_type: 'client_credentials' }, options)
      .subscribe(data => this.saveToken(data), err => alert('Invalid Credentials'));
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + 1000 * token.expires_in;
    Cookie.set('access_token', token.access_token, expireDate);
    this._router.navigate(['/customer']);
  }

  checkCredentials() {
    return Cookie.check('access_token') ? true : false;
  }

  logout() {
    Cookie.delete('access_token');
    this.loginStatus.next('account_circle');
    this._router.navigate(['/login']);
  }
}
