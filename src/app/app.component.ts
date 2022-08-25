import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { AlertController, LoadingController, MenuController, Platform, ToastController } from '@ionic/angular';

import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { AppUtilService } from './providers/app.util.service';
import { TrackerService } from './providers/websocket/tracker.service';
import { AuthStoreFacade } from './store/auth/auth-store.facade';
import { LoginRequest } from './store/auth/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy{
  appPages = []
  loggedIn = false;
  dark = false;
  isAuthenticted : boolean

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    private appUtilService : AppUtilService,
    private trackerService : TrackerService,
    private authFacade : AuthStoreFacade,
    private allertController : AlertController
  ) {
    this.initializeApp();
    this.authFacade.authenticated$.subscribe((e)=>{
      this.isAuthenticted = e;
      if(e){
        this.appPages = [
          {
            title: 'Home',
            url: '/app/tabs/home',
            icon: 'home'
          },
          {
            title: 'My Matches',
            url: '/app/tabs/myMatches',
            icon: 'trophy'
          },
          {
            title: 'Shop',
            url: '/app/tabs/shop',
            icon: 'cart'
          }
        ]
      }
      else{
        this.appPages = [
          {
            title: 'Home',
            url: '/app/tabs/home',
            icon: 'home'
          },
          {
            title: 'Shop',
            url: '/app/tabs/shop',
            icon: 'cart'
          },
        ];
      }
    });
  }

  async ngOnInit() {
    let username = window.localStorage.getItem('six-username');
    let password = window.localStorage.getItem('six-password');
    if(username && password){
      let loginRequest = new LoginRequest();
      loginRequest.username =  username;
      loginRequest.password = password;
      loginRequest.rememberMe = true;
      
      // this.loginWithFingerprint();
      this.trackerService.disconnect();
      this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Wait Signing in..</span>`});
      setTimeout(() => {
        this.authFacade.login(loginRequest);
      }, 500);
    }
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
      }
    });
  }

  ngOnDestroy(){
    // this._subscriptions.forEach(sub =>{
    //   sub.unsubscribe();
    // });

    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Loading..</span>`});
    this.trackerService.disconnect();

  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.authFacade.logout();
    window.localStorage.setItem('six-username' , '');
    window.localStorage.setItem('six-password' , '');
    this.trackerService.unsubscribeUser();
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  async presentAlert() {
    const alert = await this.allertController.create({
      header: 'Are you sure. You want to Logout.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => { 
            this.appUtilService.startAction(this.loadCtrl, {content: `<span>Loading..</span>`})
           this.logout();
          }
        }
      ]
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    // console.log(this.predictionItem.predictions);
  }
  
}
