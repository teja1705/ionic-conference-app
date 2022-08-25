
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Profile, LoginRequest, SignUpRequest, ActivationCodeRequest, Account,
     ActivationCodeSubmitRequest, SignUpResult, LoginProfile, CheckUserNameRequest, BioProfileAddRequest, 
     GetBioProfileRequest, SignUpJHRequest, LoginProfileUpdateRequest, RegisterRequest, 
     } from './model';

import * as fromActions from '../prediction.action';
import * as fromReducers from '../prediction.reducer';
import * as fromSelectors from '../prediction.selector';
import * as fromPredictionState from '../prediction.state';



@Injectable({ providedIn: 'root' })
export class AuthStoreFacade {
  actionInProgress$ = this.store.pipe(select(fromSelectors.getAuthorizationIsLoading));
  userAccountProfile$ = this.store.pipe(select(fromSelectors.getUserAccountProfile));
  userProfile$ = this.store.pipe(select(fromSelectors.getUserProfile));
  userBioProfile$ = this.store.pipe(select(fromSelectors.getUserBioProfile));
  authenticated$ = this.store.pipe(select(fromSelectors.getIsAuthenticated));
  activationInfo$ = this.store.pipe(select(fromSelectors.getActivationInfo));
  isPasswordSent$ = this.store.pipe(select(fromSelectors.getIsPasswordSent));

  isUserNameAvailable$ = this.store.pipe(select(fromSelectors.getUserNameCheckAvailable));
  userNameCheckIsInProgress$ = this.store.pipe(select(fromSelectors.getUserNameCheckInProgress));
  userAccountProfile:Account = new Account();
  userProfile: Profile = new Profile();

  activationInfo: SignUpResult = new SignUpResult();

  constructor(private store: Store<fromPredictionState.PredictionState>) {
    this.userAccountProfile$.subscribe( (x:any) =>{ 
      // 
       this.userAccountProfile =  x;
      console.log(`Subscribe event for userLoginProfile$ fired: counter=${x}`);
    });

    this.userProfile$.subscribe( (x:any) =>{ 
      // 
       this.userProfile =  x;
      console.log(`Subscribe event for userProfile$ fired: counter=${x}`);
    });

    this.activationInfo$.subscribe( (x:any) =>{ 
      // 
       this.activationInfo =  x;
      console.log(`Subscribe event for activationInfo$ fired: counter=${x}`);
    });

  }
  
  getUserName(){
    return this.userAccountProfile.email;
  }

  login(loginRequest:LoginRequest) {
    this.store.dispatch(fromActions.LoginPreAction({loginRequest}));
  }

  logout() {
    this.store.dispatch(fromActions.LogoutConfirmRequestedAction());
  }

  signUp(registerRequest: RegisterRequest){
    // 
    this.store.dispatch(fromActions.SignUpRequestAction({registerRequest}));
  }

  submitActivationCode(userid : any,usrName:string, code:any){
    let activationCodeSubmitRequest: ActivationCodeSubmitRequest = new ActivationCodeSubmitRequest();
    activationCodeSubmitRequest.activationCode = code;
    activationCodeSubmitRequest.username = usrName;
    activationCodeSubmitRequest.userId = userid;
    this.store.dispatch(fromActions.SubmitActivationCodeAction({activationCodeSubmitRequest}))
  }

  requestActivationCode(activationCodeRequest: ActivationCodeRequest){
    this.store.dispatch(fromActions.ActivationCodeRequestAction({activationCodeRequest}));
  }

  checkUserName(userName: string){
    let userNameRequest: CheckUserNameRequest = new CheckUserNameRequest();
    userNameRequest.login = userName;
    this.store.dispatch(fromActions.CheckUserNameRequestAction({userNameRequest}));
  }
  
  clearUserNameCheck() {
    this.store.dispatch(fromActions.ClarUserNameCheckAction());
}

  requestPassword(){

  }

  routeToLogin() {
    this.store.dispatch(fromActions.LoginRedirectAction());
  }
  
  loadUserProfile(loginProfile) {
    this.store.dispatch(fromActions.LoginProfileGetSuccessAction({loginProfile}));
  }
  saveLoginProfile(loginProfile: LoginProfileUpdateRequest) {
      this.store.dispatch(fromActions.SaveLoginProfileAction({loginProfile}));
  }

  saveBioProfile(bioProfile: BioProfileAddRequest) {
      this.store.dispatch(fromActions.SaveBioProfileAction({bioProfile}));
  }

  updateBioProfile(bioProfile: BioProfileAddRequest) {
    this.store.dispatch(fromActions.UpdateBioProfileAction({bioProfile}));
}


  getBioProfile(userName: string) {
      this.store.dispatch(fromActions.BioProfileGetAction({userName: userName}));
  }
 
  getLoginProfile(userName: string) {
    this.store.dispatch(fromActions.LoginProfileGetAction({userName: userName}));
}

  clearProgress() {
    this.store.dispatch(fromActions.ClearProgressAction());
}


}