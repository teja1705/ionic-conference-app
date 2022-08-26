import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BioProfileOptions, UserOptions } from '../../interfaces/user-options';
import { AppUtilService } from '../../providers/app.util.service';

import { UserData } from '../../providers/user-data';
import { TrackerService } from '../../providers/websocket/tracker.service';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { BioProfileAddRequest, Profile } from '../../store/auth/model';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit, AfterViewInit {
  username: string="teja1705";

  visible = false

  inputType = 'password'

  login: UserOptions = { username: '', password: '' };
  bioProfile : BioProfileOptions = { firstName : '', lastName : '', gender : '', age : ''}
  submitted = false;
  profile : Profile
  editBio : boolean = false
  actionInProgress$ : Observable<any>

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public authFacade : AuthStoreFacade,
    private cd: ChangeDetectorRef,
    private appUtilService : AppUtilService,
    private loadCtrl : LoadingController,
    private trackerService : TrackerService
  ) { }

  ngOnInit(): void {
   this.login.username = window.localStorage.getItem('six-username');
   this.login.password = window.localStorage.getItem('six-password');
   this.authFacade.userProfile$.subscribe((e)=>{
    this.profile = e;
    this.bioProfile.firstName = e.bio.firstName;
    this.bioProfile.lastName = e.bio.lastName;
    this.bioProfile.gender = e.bio.gender;
    this.bioProfile.age = e.bio.dob;
   })
   this.actionInProgress$ = this.authFacade.actionInProgress$;
  }

  ngAfterViewInit() {
    // this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
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

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.authFacade.logout();
    window.localStorage.setItem('six-username' , '');
    window.localStorage.setItem('six-password' , '');
    this.trackerService.unsubscribeUser();
  }

  support() {
    this.router.navigateByUrl('/support');
  }

  onSubmit(form: NgForm) {
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Updating..</span>`});
    this.submitted = true;
    let newBioProfile : BioProfileAddRequest = new BioProfileAddRequest();
    newBioProfile.userId = this.profile.login.userId;
    newBioProfile.firstName = this.bioProfile.firstName;
    newBioProfile.lastName = this.bioProfile.lastName;
    newBioProfile.dob = this.bioProfile.age;
    newBioProfile.gender = this.bioProfile.gender;
    newBioProfile.id = this.profile.bio.id;
    newBioProfile.imageUrl = "assets/img/appicon.svg"
    this.authFacade.updateBioProfile(newBioProfile);
    this.editBio = !this.editBio;
  }

  toggleEditBioProfile(){
    this.editBio = !this.editBio;
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
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
