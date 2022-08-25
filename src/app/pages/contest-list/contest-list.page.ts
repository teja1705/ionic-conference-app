import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { SelectPredictionComponent } from '../../components/select-prediction/select-prediction.component';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest, ContestJoinRequest, MatchInfo, PredictionInput, PredictionItem } from '../../store/prediction.model';
import * as _ from 'lodash';
import { Profile } from '../../store/auth/model';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { ToastControllerService } from '../../providers/toast-controller.service';
import { AppUtilService } from '../../providers/app.util.service';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.page.html',
  styleUrls: ['./contest-list.page.scss'],
})
export class ContestListPage implements OnInit {

  contestList : Array<Contest>;
  myPredictions : Array<PredictionInput>;
  selectedMatch : MatchInfo
  profile : Profile = new Profile();
  isAuthenticted : boolean

  constructor(private predictionFacade : PredictionStoreFacade, private router : Router, private modalCtrl : ModalController,
    private authFacade : AuthStoreFacade, private toastCtrl : ToastControllerService, private appUtilService : AppUtilService, private loadCtrl : LoadingController) { }

  ngOnInit() {
    this.appUtilService.setWhiteBgStatusBar();
    this.predictionFacade.matchContests$.subscribe((contest)=>{
      this.contestList = contest;
    })
    this.predictionFacade.myPredictions$.subscribe((prediction)=>{
      this.myPredictions = prediction;
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

  doRefresh(event) {
    console.log('Begin async operation');
    this.predictionFacade.getMatchContests(this.selectedMatch.matchId, this.profile.login.userId);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  moveToCreatePrediction(){
    if(!this.isAuthenticted){
      this.toastCtrl.toastMessage('Login to join contest', 2500, 'warning')
      this.router.navigateByUrl('/login')
    }
    else{
      this.router.navigateByUrl('/create-prediction');
    }
  }


  viewContestDashboard(contest : Contest){
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Please wait..</span>`});
    this.predictionFacade.getContestJoinedUsersAction(contest.id, this.profile.login.userId);
    this.router.navigateByUrl('/contest-view');
    this.predictionFacade.setSelectedContest(contest);
  }

  async joinContestAlert(contest : Contest) {
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Please wait..</span>`});
    if(!this.isAuthenticted){
      this.toastCtrl.toastMessage('Login to join contest', 2500, 'warning')
      this.router.navigateByUrl('/login')
    }
    else if(!this.myPredictions.length){
      this.router.navigateByUrl('create-prediction');
    }
    else{
      const modal = await this.modalCtrl.create({
        component: SelectPredictionComponent,
      });
      modal.present();
  
      const { data, role } = await modal.onWillDismiss();
  
      if(role === 'confirm') {
        let request = Object.create({});
        request.contestId = contest.id;
        request.matchId = this.selectedMatch.matchId;
        request.userId = this.profile.login.userId?this.profile.login.userId : "3" ;
        request.predictionGroupId = data.predictionGroup.id;
        request.points = "0";
        request.currentRank = "1";
        request.previousRank = "1";
        request.isWinner = false;
        request.coinsGained = "0"
        debugger
        this.predictionFacade.joinContestAction(request);
      }
    }
    // console.log(this.predictionItem.predictions);
  }


}
