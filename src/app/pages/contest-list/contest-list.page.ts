import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SelectPredictionComponent } from '../../components/select-prediction/select-prediction.component';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest, PredictionItem } from '../../store/prediction.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.page.html',
  styleUrls: ['./contest-list.page.scss'],
})
export class ContestListPage implements OnInit {

  contestList : Array<Contest>;
  myPredictions : Array<PredictionItem>;

  constructor(private predictionFacade : PredictionStoreFacade, private router : Router, private modalCtrl : ModalController) { }

  ngOnInit() {
    this.predictionFacade.matchContests$.subscribe((contest)=>{
      this.contestList = contest;
    })
    this.predictionFacade.myPredictions$.subscribe((prediction)=>{
      this.myPredictions = prediction;
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  moveToCreatePrediction(){
    this.router.navigateByUrl('/create-prediction');
  }


  viewContestDashboard(contest : Contest){
    this.predictionFacade.getContestJoinedUsersAction(contest.id);
    this.router.navigateByUrl('/contest-view');
    this.predictionFacade.setSelectedContest(contest);
  }

  async joinContestAlert(contest : Contest) {
    if(!this.myPredictions.length){
      this.router.navigateByUrl('create-prediction');
    }
    else{
      const modal = await this.modalCtrl.create({
        component: SelectPredictionComponent,
      });
      modal.present();
  
      const { data, role } = await modal.onWillDismiss();
  
      if(role === 'confirm') {
        let predictionItem : PredictionItem = _.cloneDeep(data);
        predictionItem.contestId = contest.id;
        predictionItem.isContestStarted = contest.isStarted;
        predictionItem.isJoined = true;
        let selectedContest : Contest = _.cloneDeep(contest);
        selectedContest.isJoined = true;
        this.predictionFacade.joinContestAction(predictionItem);
        this.predictionFacade.setContesttoMyContestAction(selectedContest);
      }
    }
    // console.log(this.predictionItem.predictions);
  }


}
