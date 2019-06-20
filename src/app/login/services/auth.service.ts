import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class AuthService {
  private clientId: string;
  private authApi: string;

  constructor(private _router: Router, private _http: HttpClient) {
    this.clientId = 'clientSecret';
    this.authApi = 'http://192.168.207.46:8281/oauth/token?grant_type=client_credentials';
  }

  obtainAccessToken(loginData) {
   /* const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', '');*/
    //params.append('client_id', this.clientId);
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${loginData.username}:${loginData.password}`)}`
    });
    const options = { headers };

    this._http.post(this.authApi, {grant_type:'client_credentials'}, options).subscribe(data => this.saveToken(data), err => alert('Invalid Credentials'));
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + 1000 * token.expires_in;
    Cookie.set('access_token', token.access_token, expireDate);
    this._router.navigate(['/customer']);
  }

  /*getResource(resourceUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    const options = { headers };
    return this._http.get(resourceUrl, options).pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }*/

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
   // this._router.navigate(['/customer']);
  }

  logout() {
    Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}
