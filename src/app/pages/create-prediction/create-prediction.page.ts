import { Component, OnInit } from '@angular/core';
import { CricketPlayerRole, MatchInfo, Prediction, PredictionInput, PredictionItem, TeamsPlayerData } from '../../store/prediction.model';
import {SuperTabsConfig } from '@ionic-super-tabs/core'
import { Router } from '@angular/router';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { PreviewComponent } from '../../components/preview/preview.component';
import * as _ from "lodash";
import { Profile } from '../../store/auth/model';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { ToastControllerService } from '../../providers/toast-controller.service';
import { AppUtilService } from '../../providers/app.util.service';
import { AlertBottomSheetComponent } from '../../components/alert-bottom-sheet/alert-bottom-sheet.component';
import { ODI_BAT_SCORE_RANGE, ODI_BOWL_WICKET_RANGE, ODI_TEAM_SCORE_RANGE, T20_BAT_SCORE_RANGE, T20_BOWL_WICKET_RANGE, T20_TEAM_SCORE_RANGE, TEST_BAT_SCORE_RANGE, TEST_BOWL_WICKET_RANGE, TEST_TEAM_SCORE_RANGE } from '../../store/prediction.model';



@Component({
  selector: 'app-create-prediction',
  templateUrl: './create-prediction.page.html',
  styleUrls: ['./create-prediction.page.scss'],
})
export class CreatePredictionPage implements OnInit {

  _BattersCount : number = 0;
  _BowlersCount : number =0;
  _TeamsCount : number = 0;
  _TotalCount : number= 0;
  count : number =0;

  predictionItem : PredictionItem
  predictionList : Array<Prediction>;
  totalPointsPredictedFor : any = 0;
  selectedPredictionItem : PredictionInput;
  selectedMatch : MatchInfo
  profile : Profile = new Profile();
  predictionSet : Array<Prediction>;
  isAuthenticted : boolean

  t20_bat = T20_BAT_SCORE_RANGE
  t20_bowl = T20_BOWL_WICKET_RANGE
  t20_team = T20_TEAM_SCORE_RANGE

  odi_bat = ODI_BAT_SCORE_RANGE
  odi_bowl = ODI_BOWL_WICKET_RANGE
  odi_team = ODI_TEAM_SCORE_RANGE

  test_bat = TEST_BAT_SCORE_RANGE
  test_bowl = TEST_BOWL_WICKET_RANGE
  test_team = TEST_TEAM_SCORE_RANGE


  constructor(private router : Router, private predictionFacade : PredictionStoreFacade, private modalCtrl : ModalController,
    private authFacade : AuthStoreFacade, private toastCtrl : ToastControllerService, private appUtilService : AppUtilService,
    private loadCtrl : LoadingController) {
      this.authFacade.authenticated$.subscribe((e)=>{
        this.isAuthenticted = e;
      });
    this.predictionFacade.createPredictionList$.subscribe((item)=>{
      this.predictionItem = item;
    })
    this.predictionFacade.predictionSet$.subscribe((list)=>{
      this.predictionList = list;
    })
    this.predictionFacade.selectedPredictionItem$.subscribe((e)=>{
      this.selectedPredictionItem = e;
    })
    this.predictionFacade.selectedMatch$.subscribe((match)=>{
      this.selectedMatch = match;
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
    })
    this.predictionFacade.predictionSet$.subscribe((match)=>{
      this.predictionSet = match;
      this._BattersCount = 0;
      this._BowlersCount = 0;
      this._TeamsCount = 0;
      this._TotalCount = 0;
      this.predictionSet.forEach((e)=>{
        debugger
        if(e.selectedRole == CricketPlayerRole.BATTER){
          this._BattersCount = this._BattersCount + 1;
        }
        else if(e.selectedRole == CricketPlayerRole.BOWLER){
          this._BowlersCount = this._BowlersCount + 1;
        }
        else if(e.selectedRole == CricketPlayerRole.TEAM){
          this._TeamsCount = this._TeamsCount + 1;
        }
        this._TotalCount = this._TotalCount + 1;
      })
    })
   }

  ngOnInit() {
  }

  backHome(){
    this.predictionFacade.setPredictionListAction([]);
    let predictionItem  : PredictionItem = new PredictionItem();
    this.predictionFacade.createPredictionItemAction(predictionItem);
    this.router.navigateByUrl('/contest');
  }

  config: SuperTabsConfig = {
   
    sideMenu: 'left',
    nativeSmoothScroll:true,
    allowElementScroll:true,
    debug:true,
  };

  changeCount($event){
    if($event.role == CricketPlayerRole.BATTER){
      this._BattersCount = $event.count;
    }
    else if($event.role == CricketPlayerRole.BOWLER){
      this._BowlersCount = $event.count;
    }
    else if($event.role == CricketPlayerRole.TEAM){
      this._TeamsCount = $event.count;
    }
  }

  async preview() {
    const modal = await this.modalCtrl.create({
      component: PreviewComponent,
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
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

  create(){
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Saving your prediction..</span>`});
   if(this.selectedPredictionItem.predictionGroup.id){
      let predictionInput : PredictionInput = new PredictionInput();
      let prediction : PredictionItem = _.cloneDeep(this.selectedPredictionItem.predictionGroup);
      predictionInput.predictionGroup = prediction;
      predictionInput.predictions = [...this.predictionList];
      this.predictionList.map((e)=>{
        this.totalPointsPredictedFor = this.totalPointsPredictedFor + e.predictPoints;
      })
      prediction.pointsPredicted = this.totalPointsPredictedFor;
      this.predictionFacade.updatePrediction(predictionInput);
    }
    else{
      let predictionInput : PredictionInput = new PredictionInput();
      let prediction : PredictionItem = _.cloneDeep(this.predictionItem);
      predictionInput.predictions = [...this.predictionList];
      this.predictionList.map((e)=>{
        this.totalPointsPredictedFor = this.totalPointsPredictedFor + e.predictPoints;
      })
      prediction.pointsPredicted = this.totalPointsPredictedFor;
      prediction.matchId = this.selectedMatch.matchId;
      prediction.pointsGained = "0";
      prediction.predictionsCorrectCount = "0";
      prediction.userId = this.profile.login.userId?this.profile.login.userId : "3";
      predictionInput.predictionGroup = prediction;
      this.predictionFacade.saveMyPredictionAction(predictionInput);
    }
    this.router.navigateByUrl('/contest');
  }

}
