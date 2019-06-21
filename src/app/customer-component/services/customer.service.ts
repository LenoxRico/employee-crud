import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class CustomerService {
  constructor(private _http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${Cookie.get('access_token')}`
    });
    return this._http.get<Customer[]>(`http://192.168.207.46:8281/api/secure/profile`, { headers });
  }
}
