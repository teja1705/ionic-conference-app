import {
  HttpInterceptor, HttpRequest, HttpHandler,HttpEvent, 
  HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, 
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
const TOKEN_HEADER_KEY = 'Authorization';
import { Platform } from '@ionic/angular';
declare var cordova;

@Injectable()
export class StandardHeaderInterceptor implements HttpInterceptor {
  constructor(  
    private router: Router,
    private _injector: Injector,
    public platform: Platform,
) { 
  debugger
}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    let headers : HttpHeaders = new HttpHeaders();
    const token: string = window.localStorage.getItem('six-authToken');
    // const platform = 'corodova'; // Get this value from platform status  like android, ios...etc
    let urlParts:any = req.url.split('/');

    if(req.method == 'GET'){
      headers = headers.append('Accept',  'application/json');
      headers = headers.append('Cache-Control',  'no-cache');
      headers = headers.append('Pragma',  'no-cache');
  } else {
      headers = headers.append('Content-Type',  'application/json');

  }

   
      if(token){
      let tokenSplit = token.split('\\');
      let tempToken = token.replace("\\", "").replace("\\", "");
      let currentToken = tempToken.replace("\"", "").replace("\"", "");
      let bearer = "Bearer ";
       headers = headers.append(TOKEN_HEADER_KEY, bearer + currentToken);
      }

  authReq = req.clone({headers});
  // return (this.platform.is('android')
  // ? this.callNative(authReq.url, authReq.method, authReq.headers, authReq.params)
  // : next.handle(authReq)
  // ).pipe(

  return (next.handle(authReq)
).pipe(
    // We use the map operator to change the data from the response
    map(resp => {
       // Several HTTP events go through that Observable 
       // so we make sure that this is a HTTP response
      if (resp instanceof HttpHeaderResponse){
              console.log(resp);
              let token:any =  resp.headers.get('Access-Token');
              localStorage.setItem('authToken', JSON.stringify(token));
      }else if (resp instanceof HttpResponse) {
          let token:any =  resp.headers.get('Access-Token');
          if(token){
            localStorage.setItem('authToken', JSON.stringify(token));
          }
          // Just like for request, we create a clone of the response
          // and make changes to it, then return that clone     
          // return  resp.clone({ body: [{title: 'Replaced data in interceptor'}] });
          return  resp.clone();
      }
    })
  );

  // return next.handle(authReq)
  // .pipe(
  //   map(response => {
  //     if (response instanceof HttpErrorResponse) {
  //       return Observable.throw(response);
  //     }else if (response instanceof HttpErrorResponse) {
  //       if (response.status === 401) {
  //         this.router.navigate(['user']);
  //       }else if(response.status === 302 || response.status == 0){
  //       }
  //     }else if (response instanceof HttpHeaderResponse){
  //       console.log(response);
  //       let token:any =  response.headers.get('Access-Token');
  //       localStorage.setItem('UserToken', JSON.stringify(token));
  //     }else if(response instanceof HttpResponse){
  //       // 
        
  //       let token:any =  response.headers.get('Access-Token');
  //       if(token){
  //         localStorage.setItem('UserToken', JSON.stringify(token));
  //       }
  //     }
  //   })
  //   );
    
   
    // err => {
    //   switch (err.status) {
    //     case 404:
    //           const router = this._injector.get(Router);
    //           router.navigate(['/404']);
    //         break;
    //     case 500:
    //     this.logger.error(err)
    //         break;
    //   }
    // }
  // );
  }


  callNative(url, method, headers, params) {

    // alert('callNative  : started');
    return Observable.create(ob => {
    switch (method) {
    case 'GET':
    // alert('callNative  : started - GET');

    cordova.plugin.http.get(
    url,
    headers,
    params,
    this.successCallback(ob),
    this.errorCallback(ob)
    );
    break;
    case 'POST':
    // alert('callNative  : started - POST');

    cordova.plugin.http.post(
    url,
    headers,
    params,
    this.successCallback(ob),
    this.errorCallback(ob)
    );
    break;
    case 'PUT':
    cordova.plugin.http.put(
    url,
    headers,
    params,
    this.successCallback(ob),
    this.errorCallback(ob)
    );
    break;
    case 'DELTER':
    cordova.plugin.http.delete(
    url,
    headers,
    params,
    this.successCallback(ob),
    this.errorCallback(ob)
    );
    break;
    }
    });
    }

    successCallback(ob) {
      return (response: any) => {
      ob.next(new HttpResponse({ body: JSON.parse(JSON.stringify(response.data)) }));
      ob.complete();
      };
      }
      errorCallback(ob) {
      return (response: any) => {
      ob.next(new HttpErrorResponse({ error: JSON.parse(JSON.stringify(response.error)) }));
      ob.complete();
      };
      }
}
