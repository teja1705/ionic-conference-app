import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { Observable } from 'rxjs';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { AppUtilService } from '../../providers/app.util.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { LoginRequest } from '../../store/auth/model';
import { TrackerService } from '../../providers/websocket/tracker.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit, OnDestroy{
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  actionInProgress$: Observable<any>;
  inputType = 'password';
  visible = false;



  constructor(
    public userData: UserData,
    public router: Router,
    private authFacade : AuthStoreFacade,
    private appUtilService : AppUtilService,
    private screenOrientation: ScreenOrientation,
    private cd: ChangeDetectorRef,
    private trackerService : TrackerService,
    public loadCtrl: LoadingController
  ) {
    this.actionInProgress$ = this.authFacade.actionInProgress$;
   }

   ngOnInit(): void {
    this.appUtilService.lockScreen(this.screenOrientation.ORIENTATIONS.PORTRAIT);

   }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      // this.router.navigateByUrl('/app/tabs/home');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  ngOnDestroy(): void {
    this.appUtilService.unlockScreen();
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

  keyDownFunction(event) {
    if(event.keyCode == 13) {
       this.loginUser();
    }
  }

  loginUser(){
    this.submitted = true;
    let loginRequest = new LoginRequest();
    loginRequest.username =  this.login.username?.trim().toLowerCase();
    loginRequest.password = this.login.password?.trim();
    loginRequest.rememberMe = true;
    
    // this.loginWithFingerprint();
    this.trackerService.disconnect();
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Wait Signing in..</span>`});
    setTimeout(() => {
      this.authFacade.login(loginRequest);
    }, 500);
  }

  closeLoginScreen($event){
    this.router.navigateByUrl('/app/tabs/home');
  }

  gotoRegister(){

    this.router.navigateByUrl('/signup');
  
  }

  gotoForgotPassword($event){
    this.router.navigateByUrl('/forgot-password');
  }

  ionViewWillEnter() {
    this.appUtilService.setWhiteBgStatusBar();
  }
}
