import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private loginStatus;
  private authApi: string;
  private loginStatusObservable;
  constructor(private _router: Router, private _http: HttpClient) {
    this.authApi = 'http://192.168.207.46:8281/oauth/token?grant_type=client_credentials';
    this.loginStatus = new BehaviorSubject<string>(!this.checkCredentials() ? 'account_circle' : 'power_settings_new');
    this.loginStatusObservable = this.loginStatus.asObservable();
  }

  getLoginStatus(): Observable<string> {
    return this.loginStatusObservable;
  }

  obtainAccessToken(loginData) {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${loginData.username}:${loginData.password}`)}`
    });
    const options = { headers };

    return this._http.post(this.authApi, { grant_type: 'client_credentials' }, options);
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + 1000 * token.expires_in;
    Cookie.set('access_token', token.access_token, expireDate);
    this.loginStatus.next('power_settings_new');
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
