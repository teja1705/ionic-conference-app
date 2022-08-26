import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AppUxStoreFacade } from '@app/store/ux/store';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';

import { Observable } from 'rxjs';
import { SignUpResult, ActivationCodeRequest } from '../../store/auth/model';
import { AppUtilService } from '../../providers/app.util.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-activate',
  templateUrl: './activate.page.html',
  styleUrls: ['./activate.page.scss'],
})
export class ActivatePage implements OnInit , OnDestroy {

  public inputType = 'password';
  public visible = false;
  
  public activationForm: FormGroup;
  public requestForm: FormGroup;

  deviceSize$: Observable<any>;
  isLandScaped$: Observable<any>;

  isLandScaped: boolean;
  deviceSize: any;

  isProfileActive$: Observable<any>;
  activationInfo$: Observable<SignUpResult>;
  actionInProgress$: Observable<any>;
  email: string;
  userName: string;
  userId: string;
  // private _subscriptions: Array<ISubscription> = new Array<ISubscription>();

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              public appUtilService: AppUtilService,
              public loadCtrl: LoadingController,
              public authFacade: AuthStoreFacade,
              // public uxFacade: AppUxStoreFacade
  ) { 

    this.activationInfo$ = this.authFacade.activationInfo$;
    this.actionInProgress$ = this.authFacade.actionInProgress$;


    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.activationForm = this.fb.group({
      activationCode: ['', Validators.required],
    });

    this.requestForm = this.fb.group({
      // username: ['', Validators.required],
      email: ['', [Validators.required,  Validators.email, Validators.pattern(emailPattern)]]
      // mobile: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]]
    });

    this.requestForm.get('email').valueChanges.subscribe(v => {
      if(v){
        // this.activationForm.get('activationCode').disable();
      }else{
        // this.activationForm.get('activationCode').enable();
      }
    });

    this.activationInfo$.subscribe(info =>{
      // this.requestForm.controls['username'].setValue(info.username);
      debugger
      this.email = info.emailId;
      this.userId = info.userId;
      this.userName = info.username?info.username : info.userName;
      this.requestForm.controls['email'].setValue(info.emailId);
      // this.requestForm.controls['mobile'].setValue(info.phoneNumber);

    });

  }

  ngOnInit() {
    this.appUtilService.setWhiteBgStatusBar();
  }

  ngOnDestroy() {
    // this._subscriptions.forEach(sub =>{
    //   sub.unsubscribe();
    // });

    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Loading..</span>`});

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

  submitActivationCode() {
    this.authFacade.submitActivationCode(this.userId,this.userName, this.activationForm.controls['activationCode'].value);
  }

  requestCode(){

    let activationCodeRequest: ActivationCodeRequest = new ActivationCodeRequest();
    activationCodeRequest.username = this.userName;
    activationCodeRequest.emailId = this.requestForm.controls['email'].value
    // activationCodeRequest.phoneNumber = this.requestForm.controls['mobile'].value
    activationCodeRequest.activated = '';
    // activationCodeRequest.activationCode = '';
    activationCodeRequest.password = '';
    activationCodeRequest.type = '';
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Please wait Sending..</span>`});

    this.authFacade.requestActivationCode(activationCodeRequest);
  }
  



  getLogoHeight(){

    let result  = '200px';
    if(this.deviceSize){
      if(this.isLandScaped){
        if((this.deviceSize.height / 2) > 400){
          result = '250px';
        }else if((this.deviceSize.height / 2) < 200){
          result = '200px';
        }else{
          let x = (this.deviceSize.height / 2) - 100;
          if(x < 200){
            x = 200;
          }
          result = x + 'px';
        }
      }else{

        if((this.deviceSize.height / 2) > 400){
          result = '250px';
        }else if((this.deviceSize.height / 2) < 200){
          result = '100px';
        }else{
          result = ((this.deviceSize.height / 2) - 100) + 'px';
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
          x = 300;
        }
       result = x + 'px';
      }
    }

    return result;

  }
  
  gotoSignIn($event){

    this.router.navigateByUrl('/login');
  
  }
}

