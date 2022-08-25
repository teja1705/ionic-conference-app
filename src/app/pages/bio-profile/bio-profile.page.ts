import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BioProfileOptions } from '../../interfaces/user-options';
import { AppUtilService } from '../../providers/app.util.service';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NgForm } from '@angular/forms';
import { BioProfile, BioProfileAddRequest, Profile } from '../../store/auth/model';

@Component({
  selector: 'app-bio-profile',
  templateUrl: './bio-profile.page.html',
  styleUrls: ['./bio-profile.page.scss'],
})
export class BioProfilePage implements OnInit, OnDestroy {

  bioProfile : BioProfileOptions = { firstName: '', lastName: '', gender : '', age : ''};
  submitted = false;
  actionInProgress$: Observable<any>;

  profile : Profile



  constructor(
    public router: Router,
    private authFacade : AuthStoreFacade,
    private appUtilService : AppUtilService,
    private screenOrientation: ScreenOrientation,
    private cd: ChangeDetectorRef,
    public loadCtrl: LoadingController
  ) {
    this.actionInProgress$ = this.authFacade.actionInProgress$;
    this.authFacade.userProfile$.subscribe((e)=>{
      this.profile = e;
    })
   }

   ngOnInit(): void {
    this.appUtilService.lockScreen(this.screenOrientation.ORIENTATIONS.PORTRAIT);

   }

  onSubmit(form: NgForm) {
    this.submitted = true;
    let newBioProfile : BioProfileAddRequest = new BioProfileAddRequest();
    newBioProfile.userId = this.profile.login.userId;
    newBioProfile.firstName = this.bioProfile.firstName;
    newBioProfile.lastName = this.bioProfile.lastName;
    newBioProfile.dob = this.bioProfile.age;
    newBioProfile.gender = this.bioProfile.gender;
    newBioProfile.imageUrl = "assets/img/appicon.svg"
    this.authFacade.saveBioProfile(newBioProfile);
  }


  ngOnDestroy(): void {
    this.appUtilService.unlockScreen();
  }


  closeLoginScreen($event){
    this.router.navigateByUrl('/app/tabs/home');
  }

  ionViewWillEnter() {
    this.appUtilService.setWhiteBgStatusBar();
  }

}
