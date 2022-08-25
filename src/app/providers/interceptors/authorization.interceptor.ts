import {
  HttpInterceptor, HttpRequest, HttpHandler,HttpEvent, 
  HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, 
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = window.localStorage.getItem('six-authToken');
    let headers : HttpHeaders = new HttpHeaders();
    // let authReq = req;

    // if (token) {

    //   let currentToken = token.replace("\"", "").replace("\"", "");
    //   let bearer = "Bearer ";
    //   headers = headers.append(TOKEN_HEADER_KEY, bearer + currentToken);


    //   // req = req.clone({
    //   //   headers: req.headers.set('Authorization', 'Bearer ' + token),
    //   // });
    //   authReq = req.clone({headers});
    // }

    return next.handle(req);
  }
}
