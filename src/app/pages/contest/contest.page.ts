import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { ContestListPage } from '../contest-list/contest-list.page';
import { MyContestsPage } from '../my-contests/my-contests.page';
import { MyPredictionsPage } from '../my-predictions/my-predictions.page';
import {SuperTabsConfig } from '@ionic-super-tabs/core'
import { Contest, ContestMetaData, PredictionItem } from '../../store/prediction.model';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.page.html',
  styleUrls: ['./contest.page.scss'],
})
export class ContestPage implements OnInit {

  contestListPage = ContestListPage;
  myContestsPage = MyContestsPage;
  myPredictionsPage = MyPredictionsPage;
  public contest : ContestMetaData;
  public myPredictions : Array<PredictionItem>
  public myContests : Array<Contest>


  constructor(public predictionFacade : PredictionStoreFacade, private router : Router) {
    this.predictionFacade.contestMetaData$.subscribe((contest)=>{
      this.contest = contest;
    })
    this.predictionFacade.myPredictions$.subscribe((predictions)=>{
      this.myPredictions = predictions;
    })
    this.predictionFacade.myContests$.subscribe((contest)=>{
      this.myContests = contest;
    })
   }

  ngOnInit() {
    this.predictionFacade.getMatchContests("1");//matchId
    this.predictionFacade.getMatchPlayersList("1");
  }

  moveToLive($event : any){
    this.predictionFacade.moveMatchToLiveList($event.date, $event.id);
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
