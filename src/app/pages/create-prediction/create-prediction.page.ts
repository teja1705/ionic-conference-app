import { Component, OnInit } from '@angular/core';
import { CricketPlayerRole, Prediction, PredictionItem, TeamsPlayerData, TeamVsTeam } from '../../store/prediction.model';
import {SuperTabsConfig } from '@ionic-super-tabs/core'
import { Router } from '@angular/router';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { ModalController } from '@ionic/angular';
import { PreviewComponent } from '../../components/preview/preview.component';
import * as _ from "lodash";


@Component({
  selector: 'app-create-prediction',
  templateUrl: './create-prediction.page.html',
  styleUrls: ['./create-prediction.page.scss'],
})
export class CreatePredictionPage implements OnInit {

  teamVsTeam : TeamVsTeam;
  _BattersCount : number = 0;
  _BowlersCount : number =0;
  _TeamsCount : number = 0;

  predictionItem : PredictionItem
  predictionList : Array<Prediction>;
  totalPointsPredictedFor : any = 0;
  selectedPredictionItem : PredictionItem;

  constructor(private router : Router, private predictionFacade : PredictionStoreFacade, private modalCtrl : ModalController) {
    this.predictionFacade.teamVsTeam$.subscribe((players)=>{
      console.log(players);
      this.teamVsTeam = players;
    })
    this.predictionFacade.createPredictionList$.subscribe((item)=>{
      this.predictionItem = item;
    })
    this.predictionFacade.predictionSet$.subscribe((list)=>{
      this.predictionList = list;
    })
    this.predictionFacade.selectedPredictionItem$.subscribe((e)=>{
      this.selectedPredictionItem = e;
    })
   }

  ngOnInit() {
    if(this.selectedPredictionItem.id){
      this._BattersCount = 3;
      this._BowlersCount = 2;
      this._TeamsCount = 1;
    }
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
    if($event.role == CricketPlayerRole.BATSMAN){
      this._BattersCount = $event.count;
    }
    else if($event.role == CricketPlayerRole.BOWLER){
      this._BowlersCount = $event.count;
    }
    else if($event.role == CricketPlayerRole.NONE){
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

  create(){
    let prediction : PredictionItem = _.cloneDeep(this.predictionItem);
    prediction.predictions = [...this.predictionList];
    this.predictionList.map((e)=>{
      this.totalPointsPredictedFor = this.totalPointsPredictedFor + e.ifPredictPoints;
    })
    prediction.toatlPointsPredicted = this.totalPointsPredictedFor;
    this.predictionFacade.saveMyPredictionAction(prediction);
    this.router.navigateByUrl('/contest');
  }

}
