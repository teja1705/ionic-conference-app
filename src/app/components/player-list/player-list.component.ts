import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketPlayerRole, CricketWayOfPoints, MatchInfo, PlayerData, Prediction, PredictionItem, TeamData, TeamsPlayerData, TeamVsTeam, USER_ID, USER_NAME } from '../../store/prediction.model';
import { PredictPlayerScoreComponent } from '../predict-player-score/predict-player-score.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {

  _ROLE : CricketWayOfPoints
  blueColor = "#20a1fef0";
  whiteColor = "white";

  @Output()
  valueChange = new EventEmitter()

  _BattersCount : number = 0;
  _BowlersCount : number =0;
  _TeamsCount : number = 0;
  _TotalCount : number = 0;

  public _isBatter : boolean = false;
  public _isBowler : boolean = false;

  predictionItem : PredictionItem = new PredictionItem();

  predictionList : PredictionItem;

  predictionSet : Array<Prediction>

  @Input()
  public set role(value: CricketWayOfPoints) {
    this._ROLE = value;
  }

  teamVsTeam : TeamVsTeam;
  selectedMatch : MatchInfo


  displayPlayers : Array<PlayerData>
  isTeam : boolean;
  isPlayers : boolean
  displayTeams : Array<TeamData>
  selectedPredictionItem : PredictionItem;

  constructor(private predictionFacade : PredictionStoreFacade, private modalCtrl: ModalController, private toastCtrl : ToastController, private allertController : AlertController) {
    this.predictionFacade.selectedMatch$.subscribe((match)=>{
      this.selectedMatch = match;
    })
    this.predictionFacade.teamVsTeam$.subscribe((match)=>{
      this.teamVsTeam = match;
    })
    this.predictionFacade.createPredictionList$.subscribe((match)=>{
      this.predictionList = match;
    })
    this.predictionFacade.predictionSet$.subscribe((match)=>{
      this.predictionSet = match;
    })
    this.predictionFacade.selectedPredictionItem$.subscribe((e)=>{
      this.selectedPredictionItem = e;
    })
   }

  ngOnInit() {
    this.predictionItem.matchId = this.selectedMatch.id;
    this.predictionItem.userId = USER_ID;
    this.predictionItem.userName = USER_NAME;
    if(this._ROLE == CricketWayOfPoints.TEAM){
      if(!this.selectedPredictionItem.id){
        this.predictionFacade.createPredictionItemAction(this.predictionItem);
      }
      else{
        this._BattersCount = 3;
        this._BowlersCount = 2;
        this._TeamsCount = 1;
      }
    }
    if(this._ROLE == CricketWayOfPoints.BATTING){
      this.predictionFacade.selectedBattersList$.subscribe((players)=>{
        console.log(players);
        this.displayPlayers = players;
      })
      this.isPlayers = true;
      this.isTeam = false;
      this._isBatter = true;
    }
    else if(this._ROLE == CricketWayOfPoints.BOWLING){
      this.predictionFacade.selectedBowlersList$.subscribe((players)=>{
        console.log(players);
        this.displayPlayers = players;
      })      
      this.isPlayers = true;
      this.isTeam = false;
      this._isBowler = true;
    }
    else if(this._ROLE == CricketWayOfPoints.TEAM){
      this.predictionFacade.selectedTeamsList$.subscribe((teams)=>{
        this.displayTeams = teams;
      })        
      this.isTeam = true;
      this.isPlayers = false;
    }
  }

  async openModal(playerOrTeamInfo : any, playerOrTeam : string, ) {
    if(playerOrTeam === "PLAYER"){
      this.predictionFacade.setSelectedPlayer(playerOrTeamInfo);
    }
    else{
      this.predictionFacade.setSelectedTeam(playerOrTeamInfo);
    }
    const format = new BehaviorSubject(this.teamVsTeam.format);
    const teamOrPlayer = new BehaviorSubject(playerOrTeam);
    const modal = await this.modalCtrl.create({
      component: PredictPlayerScoreComponent,
      componentProps: {
        format, teamOrPlayer
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.predictionItem.predictions = [...this.predictionItem.predictions, data];
      this.predictionFacade.pushPredictionToListAction(data);
      if(data.role === CricketPlayerRole.BATSMAN){
        this._BattersCount = this._BattersCount + 1;
        console.log("Batters Count-" + `${this._BattersCount}`);
        this.valueChange.emit({role : data.role, count : this._BattersCount})
        this.predictionFacade.togglePlayerSelection(data.playerId, data.role);
      }
      else if(data.role === CricketPlayerRole.BOWLER){
        this._BowlersCount = this._BowlersCount + 1;
        this.valueChange.emit({role : data.role, count : this._BowlersCount})
        this.predictionFacade.togglePlayerSelection(data.playerId, data.role);
      }
      else if(data.role === CricketPlayerRole.NONE){
        this._TeamsCount = this._TeamsCount + 1;
        this.valueChange.emit({role : data.role, count : this._TeamsCount});
        this.predictionFacade.togglePlayerSelection(data.teamId, data.role);
      }
      console.log(data);
      this._TotalCount = this._TotalCount + 1;
      console.log(this.teamVsTeam)
    }
    // console.log(this.predictionItem.predictions);
  }

  async openNothing(){
    if(this._isBatter){
      const toast = await this.toastCtrl.create({
        header: `Can't pick more than 3 batters`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });  
      await toast.present();
  }
  else if(this._isBowler){
    const toast = await this.toastCtrl.create({
      header: `Can't pick more than 2 bowllers`,
      duration: 3000,
      buttons: [{
        text: 'Close',
        role: 'cancel'
      }]
    });  
    await toast.present();
}
else if(this.isTeam){
  const toast = await this.toastCtrl.create({
    header: `Can't pick more than 1 team`,
    duration: 3000,
    buttons: [{
      text: 'Close',
      role: 'cancel'
    }]
  });  
  await toast.present();
}
}

handlerMessage = '';

async presentAlert(player : PlayerData) {
  const alert = await this.allertController.create({
    header: 'You are about to remove this prediction',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { this.handlerMessage = 'Alert canceled'; }
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => { 
          if(this._isBatter){
            this.predictionFacade.removePlayerFromPredictionListAction(player.id, player.role);
            this._BattersCount = this._BattersCount -1;
            this.valueChange.emit({role : player.role, count : this._BattersCount})
            // let index = _.findIndex(this.predictionItem.predictions, (e : Prediction) => {
            //   return (e.playerId == player.id && e.role == player.role);
            // }, 0);
            // this.predictionItem.predictions = [...this.predictionItem.predictions.slice(0, index),...this.predictionItem.predictions.slice(index+1)];
            this.predictionFacade.popPredictionFromListAction(player.id, player.role);
          }
          else if(this._isBowler){
            this.predictionFacade.removePlayerFromPredictionListAction(player.id, player.role);
            this._BowlersCount = this._BowlersCount -1;
            this.valueChange.emit({role : player.role, count : this._BowlersCount})
            // let index = _.findIndex(this.predictionItem.predictions, (e : Prediction) => {
            //   return (e.playerId == player.id && e.role == player.role);
            // }, 0);
            // this.predictionItem.predictions = [...this.predictionItem.predictions.slice(0, index),...this.predictionItem.predictions.slice(index+1)];
            this.predictionFacade.popPredictionFromListAction(player.id, player.role);
          }
        }
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  // console.log(this.predictionItem.predictions);
}

async removeTeamPredictionAlert(team : TeamData) {
  const alert = await this.allertController.create({
    header: 'You are about to remove this prediction',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { this.handlerMessage = 'Alert canceled'; }
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => { 
            this.predictionFacade.removePlayerFromPredictionListAction(team.id, CricketPlayerRole.NONE);
            this._TeamsCount = this._TeamsCount -1;
            this.valueChange.emit({role : CricketPlayerRole.NONE, count : this._TeamsCount})
            // let index = _.findIndex(this.predictionItem.predictions, (e : Prediction) => {
            //   return (e.teamId == team.id && e.role == CricketPlayerRole.NONE);
            // }, 0);
            // this.predictionItem.predictions = [...this.predictionItem.predictions.slice(0, index),...this.predictionItem.predictions.slice(index+1)];
            this.predictionFacade.popPredictionFromListAction(team.id, CricketPlayerRole.NONE);
          }
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  // console.log(this.predictionItem.predictions);
}

async editPrediction(playerOrTeamInfo : any, playerOrTeam : string, ) {
  if(playerOrTeam === "PLAYER"){
    let index = _.findIndex(this.predictionSet, (e : Prediction) => {
      return (e.playerId == playerOrTeamInfo.id && e.role == playerOrTeamInfo.role);
    }, 0);
    this.predictionFacade.setSelectedPrediction(this.predictionSet[index]);
    this.predictionFacade.setSelectedPlayer(playerOrTeamInfo);
  }
  else{
    let index = _.findIndex(this.predictionSet, (e : Prediction) => {
      return e.teamId == playerOrTeamInfo.id;
    }, 0);
    this.predictionFacade.setSelectedPrediction(this.predictionSet[index]);
    this.predictionFacade.setSelectedTeam(playerOrTeamInfo);
  }
  const format = new BehaviorSubject(this.teamVsTeam.format);
  const teamOrPlayer = new BehaviorSubject(playerOrTeam);
  const modal = await this.modalCtrl.create({
    component: PredictPlayerScoreComponent,
    componentProps: {
      format, teamOrPlayer
    },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    // let index = _.findIndex(this.predictionItem.predictions, (e : Prediction) => {
    //   return (e.playerId == playerOrTeamInfo.id && e.role == playerOrTeamInfo.role);
    // }, 0);
    // this.predictionItem.predictions = [...this.predictionItem.predictions.slice(0, index), data, ...this.predictionItem.predictions.slice(index+1)];
    if(playerOrTeam == "PLAYER"){
      this.predictionFacade.updatePredictionInListAction(data, playerOrTeamInfo.role)
    }
    else{
      this.predictionFacade.updatePredictionInListAction(data, CricketPlayerRole.NONE)
    }
  }
  // console.log(this.predictionList.predictions);
}

}
