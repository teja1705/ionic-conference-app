import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { ContestListPage } from '../contest-list/contest-list.page';
import { MyContestsPage } from '../my-contests/my-contests.page';
import { MyPredictionsPage } from '../my-predictions/my-predictions.page';
import {SuperTabsConfig } from '@ionic-super-tabs/core'
import { Contest, ContestMetaData, MatchInfo, PredictionInput, PredictionItem } from '../../store/prediction.model';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { AppUtilService } from '../../providers/app.util.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertBottomSheetComponent } from '../../components/alert-bottom-sheet/alert-bottom-sheet.component';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.page.html',
  styleUrls: ['./contest.page.scss'],
})
export class ContestPage implements OnInit, OnDestroy{

  contestListPage = ContestListPage;
  myContestsPage = MyContestsPage;
  myPredictionsPage = MyPredictionsPage;
  public contest : ContestMetaData;
  public myPredictions : Array<PredictionInput>
  public myContests : Array<Contest>
  public selectedMatch : MatchInfo;
  profile : Profile = new Profile();
  isAuthenticted : boolean
  count : number = 0;



  constructor(public predictionFacade : PredictionStoreFacade, private router : Router, private authFacade : AuthStoreFacade
    , private appUtilService : AppUtilService, private loadCtrl : LoadingController,
    private modalCtrl : ModalController) {
    this.predictionFacade.contestMetaData$.subscribe((contest)=>{
      this.contest = contest;
    })
    this.predictionFacade.myPredictions$.subscribe((predictions)=>{
      this.myPredictions = predictions;
    })
    this.predictionFacade.myContests$.subscribe((contest)=>{
      this.myContests = contest;
    })
    this.predictionFacade.selectedMatch$.subscribe((match)=>{
      this.selectedMatch = match;
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
    })
    this.authFacade.authenticated$.subscribe((e)=>{
      this.isAuthenticted = e;
    });
   }

  ngOnInit() {
    this.appUtilService.setWhiteBgStatusBar();
    this.predictionFacade.getMyMatchContests(this.selectedMatch.matchId, this.profile.login.userId);
    this.predictionFacade.getMatchScoreCard(this.selectedMatch.matchId);
    if(this.isAuthenticted){
      this.predictionFacade.getMyPredictions(this.selectedMatch.matchId, this.profile.login.userId);
      this.predictionFacade.getMatchPlayersList(this.selectedMatch.matchId);
    }
  }

  ngOnDestroy() {
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Loading..</span>`});
  }

  

  async moveToLive($event : any){
    // this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Loading..</span>`});
    this.predictionFacade.moveMatchToLiveList($event.date, $event.id);
    // this.appUtilService.stopAction();
    this.count = this.count + 1;
    if(this.count==1){
      const modal = await this.modalCtrl.create({
        component: AlertBottomSheetComponent,
        cssClass: 'alert-css',
        backdropDismiss:false
      });
      modal.present();
  
      const { data, role } = await modal.onWillDismiss();
  
      if(role === 'confirm') {
        this.count =0;
        this.router.navigateByUrl('/app/tabs/home')
      }
    }
    
  }

  backHome(){
    this.router.navigateByUrl('/app/tabs/home');
  }

  config: SuperTabsConfig = {
   
    sideMenu: 'left',
    nativeSmoothScroll:true,
    allowElementScroll:true,
    debug:true,
    avoidElements: true,
    dragThreshold: 250
  };

}
