import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let formattedRequest = request;
    if (!request.headers.has('Accept')) {
      formattedRequest = request.clone({
        headers: request.headers.set('Accept', 'application/json, text/plain, */*').set('Content-Type', 'application/json; charset=utf-8').set('Access-Control-Allow-Origin', '*')
      });
    }
    return next.handle(formattedRequest);

    /*  return Observable.create(observer => {}).pipe(
      switchMap(refreshed => {
        const authReq = formattedRequest.clone({
          headers: formattedRequest.headers.set('Authorization', 'Bearer ' + token)
        });
        return next.handle(authReq);
      })
    ); */
  }
}
