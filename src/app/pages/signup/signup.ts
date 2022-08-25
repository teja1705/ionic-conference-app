import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
// import { Subscription } from "rxjs/Subscription";

import { SignUpResult, RegisterRequest } from '../../store/auth/model';
import { AuthStoreFacade} from '../../store/auth/auth-store.facade';
// import { AppUtilService } from '@app/core/providers/app.util.service';
import { LoadingController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage implements OnInit, OnDestroy {

  public signUpForm: FormGroup;
  public inputType = 'password';
  public visible = false;

  public deviceSize$: Observable<any>;
  public isLandScaped$: Observable<any>;
  public actionInProgress$: Observable<any>;
  public userNameCheckIsInProgress$: Observable<any>;
  public isUserNameAvailable$: Observable<boolean>;
  public isAuthError$: Observable<any>;
  // private _subscriptions: Array<Subscription> = new Array<Subscription>();
  public isLandScaped: boolean;
  public deviceSize: any;
  public activationInfo$: Observable<SignUpResult>;
  public activationInfo: SignUpResult;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              public authFacade: AuthStoreFacade,
              // public appUtilService: AppUtilService,
              public loadCtrl: LoadingController,
  ) { 

    this.activationInfo = new SignUpResult();
    this.actionInProgress$ = this.authFacade.actionInProgress$;
    this.activationInfo$ = this.authFacade.activationInfo$;

    this.isUserNameAvailable$ = this.authFacade.isUserNameAvailable$
    this.userNameCheckIsInProgress$ = this.authFacade.userNameCheckIsInProgress$;
    // this.isAuthError$ = this.authFacade.isAuthError$;
    
    this.activationInfo$.subscribe(actInfo => {
      this.activationInfo = actInfo;
    });
  }

  ngOnInit() {
    // let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    // this.appUtilService.setWhiteBgStatusBar();
    
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required]],
      // businessType: ['', [Validators.required]],
      email: ['', [Validators.required]],
      // mobile: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });

    this.signUpForm.get('userName').valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(val => {
        this.authFacade.clearUserNameCheck();
    });
    // this.signUpForm.get("email").disable();
    // this.signUpForm.get("mobile").disable();
    // this.signUpForm.get("userName").disable();

    // this.signUpForm.controls['userName'].setValue('jana');
    // this.signUpForm.controls['mobile'].setValue(this.activationInfo.email '1234567890');
    // this.signUpForm.controls['email'].setValue(this.activationInfo.email);

  }

  ngOnDestroy(){

    this.authFacade.clearUserNameCheck();

    // this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Loading..</span>`});

  }

  doRegister() {

    let loginProfile: RegisterRequest  = new RegisterRequest();

    loginProfile.email = this.signUpForm.controls.email.value.trim().toLowerCase();
    loginProfile.password = this.signUpForm.controls.password.value.trim();
    loginProfile.login = this.signUpForm.controls.userName.value.trim().toLowerCase();
    loginProfile.langKey = 'en';
    this.authFacade.signUp(loginProfile);

  }



  getLogoHeight(){

    let result:any  = '200';
    if(this.deviceSize){
      if(this.isLandScaped){
        if((this.deviceSize.height / 2) > 250){
          result = '200px';
        }else if((this.deviceSize.height / 2) < 150){
          result = '150px';
        }else{
          let x = (this.deviceSize.height / 2) - 100;
          if(x < 200){
            x = 150;
          }
          result = x + 'px';
        }
      }else{

        if((this.deviceSize.height / 2) > 250){
          result = '200px';
        }else if((this.deviceSize.height / 2) < 100){
          result = '100px';
        }else{
          result = ((this.deviceSize.height / 2) - 100);
          
          if(+result < 200){
            result = 150;
          }else if(+result > 250){
            result = 200;
          }

          result = result + 'px';
        }
      }
    }
    return result;

  }

  getLogoWidth(){

    let result  = '300px';
    if(this.isLandScaped){
      if((this.deviceSize.height / 2) > 400){
        result = '375px';
      }else if((this.deviceSize.height / 2) < 200){
        result = '325px';
      }else{
        result = (this.deviceSize.height / 2) + 'px';
      }
    }else{

      if((this.deviceSize.height / 2) > 400){
        result = '375px';
      }else if((this.deviceSize.height / 2) < 200){
        result = '325px';
      }else{
        let x = (this.deviceSize.height / 2) - 100;
        if(x < 200){
          x = 325;
        }
       result = x + 'px';
      }
    }

    return result;

  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  checkUserNameAvailabilityHandler(){
    this.authFacade.checkUserName(this.signUpForm.controls.userName.value.trim())
  }
  
  gotoSignIn($event){
    this.router.navigateByUrl('/app/tabs/home');
  }

  
}
