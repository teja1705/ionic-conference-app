import { LoginRequest , SignUpRequest, Profile, ActivationCodeSubmitRequest, ActivationCodeRequest,
    PasswordResult, CheckUserNameRequest, BioProfileAddRequest, GetBioProfileRequest, Account, SignUpJHRequest, LoginProfileUpdateRequest, RegisterRequest
    , MessageDTO } from './model';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AppConstants } from '../../providers/app-constants.service';
import { throwError } from 'rxjs';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';

// import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class AuthService {
private actionUrl: string;

constructor(
  private http: HttpClient,
  private appConstants: AppConstants,
) {
}

signInPre(loginRequest: LoginRequest): Observable<any> {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SIGN_IN_PRE_URL;
  return this.http
    .post<any>(url, loginRequest)
    .pipe(catchError(this.handleError));
}

signIn(loginRequest: LoginRequest): Observable<any> {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SIGN_IN_URL;
  return this.http
    .post<any>(url, loginRequest)
    .pipe(catchError(this.handleError));
}

getAccountProfile() {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.ACCOUNT_URL;
  // 
  console.log('getAccount: api call');
  return this.http
    .get<any>(url)
    .pipe(catchError(this.handleError));
}

getLoginProfile(userName) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.GET_LOGIN_PROFILE_URL;
   url = url + '/' + userName;
  console.log('getAccount: api call');
  return this.http
    .get<any>(url)
    .pipe(catchError(this.handleError));
}



signOut(): Observable<any> {
  return this.http
  .get<any[]>(this.actionUrl)
  .pipe(catchError(this.handleError));
}

signUp(signUpRequest: RegisterRequest) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SIGNUP_URL;
  // 
  console.log('signup: api call');
  return this.http
    .post<any>(url, signUpRequest)
    .pipe(catchError(this.handleError));
}

checkUserName(userNameCheckRequest: CheckUserNameRequest) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.CHECK_USER_NAME_URL;
  // 
  console.log('checkUserName: api call');
  return this.http
    .post<any>(url, userNameCheckRequest)
    .pipe(catchError(this.handleError));
}

sendMessagetoUser() {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SEND_MESSAGE_TO_USER_URL + 'teja';
  // 
  console.log('sendMessagetoUser: api call');
  let msg: MessageDTO = new MessageDTO();
    msg.messageContent = 'this is Test User Message';
    msg.from = 'Jana';
    msg.to = 'all';

  return this.http
    .post<any>(url, msg)
    .pipe(catchError(this.handleError));
}

sendBroadMessagetoUser() {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SEND_BROADCAST_MESSAGE_URL;
  // 
  console.log('sendBroadMessagetoUser: api call');
  let msg: MessageDTO = new MessageDTO();
  msg.messageContent = 'this is Test Broadcast User Message';
  msg.from = 'Jana';
  msg.to = 'all';
  return this.http
    .post<any>(url, msg)
    .pipe(catchError(this.handleError));
}

saveLoginProfile(loginProfile: LoginProfileUpdateRequest) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SAVE_LOGIN_PROFILE_URL + '/' + loginProfile.id;
  // 
  console.log('saveLoginProfile: api call');
  //  let param: CheckUserNameRequest = new CheckUserNameRequest();
  // param.username = loginProfile.username;
  return this.http
    .put<any>(url, loginProfile)
    .pipe(catchError(this.handleError));
}




saveBioProfile(bioProfile: BioProfileAddRequest) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SAVE_BIO_PROFILE_URL;
  // 
  console.log('saveBioProfile: api call');
  return this.http
    .post<any>(url, bioProfile)
    .pipe(catchError(this.handleError));
}


updateBioProfile(bioProfile: BioProfileAddRequest) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SAVE_BIO_PROFILE_URL + '/' + bioProfile.id;
  // 
  console.log('UpdateBioProfile: api call');
  return this.http
    .put<any>(url, bioProfile)
    .pipe(catchError(this.handleError));
}


getBioProfile(userName: string) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.GET_BIO_PROFILE_URL;
  
  url = url + '/' + userName;
  return this.http
    .get<any>(url)
    .pipe(catchError(this.handleError));
}



submitActivationCode(activationCodeSubmitReqest: ActivationCodeSubmitRequest) {
 // let activate: CheckUserNameRequest = new CheckUserNameRequest();
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.SUBMIT_ACTIVATION_CODE_URL;
  url = url + '?activationCode=' + activationCodeSubmitReqest.activationCode + '&username=' + activationCodeSubmitReqest.username;
  // 
  //activate.username = 'jana';

  console.log('signup: api call');
  return this.http
  .post<any>(url, activationCodeSubmitReqest)
  .pipe(catchError(this.handleError));
}

getActivationCode(activationCodeReqest: ActivationCodeRequest) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.GET_ACTIVATION_CODE_URL;
  url = url + '?emailId='+activationCodeReqest.emailId + '&username=' + activationCodeReqest.username;
  console.log('signup: api call');
  return this.http
    .post<any>(url, activationCodeReqest)
    .pipe(catchError(this.handleError));
}

getPassword(passwordReqest: PasswordResult) {
  let url:string = this.appConstants.BASE_API_URL + this.appConstants.GET_PASSWORD_URL;
  // 
  console.log('Get Password: api call');
  return this.http
    .post<any>(url, passwordReqest)
    .pipe(catchError(this.handleError));
}

private handleError(error: HttpErrorResponse): Observable<never> {
  // alert('api: Error' + error.error);
  return throwError(error || 'Server error');
}

}
