import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketFormat, CricketPlayerRole, CricketWayOfPoints, MatchInfo, PlayerData, Prediction, PredictionInput, PredictionItem, TeamData, TeamsPlayerData, USER_ID, USER_NAME } from '../../store/prediction.model';
import { PredictPlayerScoreComponent } from '../predict-player-score/predict-player-score.component';
import * as _ from 'lodash';
import { ToastControllerService } from '../../providers/toast-controller.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {

  _ROLE : CricketPlayerRole
  blueColor = "#20a1fef0";
  whiteColor = "white";

  @Output()
  valueChange = new EventEmitter()
  _BattersCount : number= 0;
  _BowlersCount : number= 0;
  _TeamsCount : number= 0;
  _TotalCount : number= 0;

  public _isBatter : boolean = false;
  public _isBowler : boolean = false;

  predictionItem : PredictionItem = new PredictionItem();

  predictionList : PredictionItem;

  predictionSet : Array<Prediction>

  @Input()
  public set role(value: CricketPlayerRole) {
    this._ROLE = value;
  }

  selectedMatch : MatchInfo


  displayPlayers : Array<PlayerData>
  isTeam : boolean;
  isPlayers : boolean
  displayTeams : Array<TeamData>
  selectedPredictionItem : PredictionInput;

  constructor(private predictionFacade : PredictionStoreFacade, private modalCtrl: ModalController, private toastCtrl : ToastControllerService, private allertController : AlertController) {
    this.predictionFacade.selectedMatch$.subscribe((match)=>{
      this.selectedMatch = match;
    })
    this.predictionFacade.createPredictionList$.subscribe((match)=>{
      this.predictionList = match;
    })
    this.predictionFacade.predictionSet$.subscribe((match)=>{
      this.predictionSet = match;
      this._BattersCount = 0;
      this._BowlersCount = 0;
      this._TeamsCount = 0;
      this._TotalCount = 0;
      this.predictionSet.forEach((e)=>{
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

      console.log("BATTERS COUNT---" + `${this._BattersCount}`)
      console.log("BOWLERS COUNT---" + `${this._BowlersCount}`)
      console.log("Teams COUNT---" + `${this._TeamsCount}`)

    })
    this.predictionFacade.selectedPredictionItem$.subscribe((e)=>{
      this.selectedPredictionItem = e;
    })
   }

  ngOnInit() {
    this.predictionFacade.UnselectPlayers();
    this.predictionItem.matchId = this.selectedMatch.matchId;
    this.predictionItem.userId = USER_ID;
    if(this._ROLE == CricketPlayerRole.BATTER){
      this.predictionFacade.selectedBattersList$.subscribe((players)=>{
        console.log(players);
        this.displayPlayers = players;
      })
      this.isPlayers = true;
      this.isTeam = false;
      this._isBatter = true;
    }
    else if(this._ROLE == CricketPlayerRole.BOWLER){
      this.predictionFacade.selectedBowlersList$.subscribe((players)=>{
        console.log(players);
        this.displayPlayers = players;
      })      
      this.isPlayers = true;
      this.isTeam = false;
      this._isBowler = true;
    }
    else if(this._ROLE == CricketPlayerRole.TEAM){
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
      this.predictionFacade.setSelectedPrediction(new Prediction());
    }
    else{
      this.predictionFacade.setSelectedTeam(playerOrTeamInfo);
      this.predictionFacade.setSelectedPrediction(new Prediction());
    }
    const format = new BehaviorSubject(this.selectedMatch.format);
    const teamOrPlayer = new BehaviorSubject(playerOrTeam);
    const pRole = new BehaviorSubject(this._ROLE);
    debugger
    const modal = await this.modalCtrl.create({
      component: PredictPlayerScoreComponent,
      componentProps: {
        format, teamOrPlayer, pRole
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.predictionItem.predictions = [...this.predictionItem.predictions, data];
      this.predictionFacade.pushPredictionToListAction(data);
      if(data.selectedRole === CricketPlayerRole.BATTER){
        console.log("Batters Count-" + `${this._BattersCount}`);
        this.predictionFacade.togglePlayerSelection(data.playerOrTeamId, CricketPlayerRole.BATTER);
      }
      else if(data.selectedRole === CricketPlayerRole.BOWLER){
        this.predictionFacade.togglePlayerSelection(data.playerOrTeamId, CricketPlayerRole.BOWLER);
      }
      else if(data.selectedRole === CricketPlayerRole.TEAM){
        this.predictionFacade.togglePlayerSelection(data.playerOrTeamId, CricketPlayerRole.TEAM);
      }
      console.log(data);
    }
    // console.log(this.predictionItem.predictions);
  }

  async openNothing(){
    if(this._isBatter){
      this.toastCtrl.toastMessage(`Cant pick more than 3 batters`, 2500,'tertiary')
    }
    else if(this._isBowler){
      this.toastCtrl.toastMessage(`Can't pick more than 2 Bowllers`, 2500,'tertiary')
    }
    else if(this.isTeam){
      this.toastCtrl.toastMessage(`Can't pick more than a Team`, 2500,'tertiary')
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
            this.predictionFacade.removePlayerFromPredictionListAction(player.id, this._ROLE);
            debugger
            this.predictionFacade.popPredictionFromListAction(player.id, this._ROLE);
          }
          else if(this._isBowler){
            this.predictionFacade.removePlayerFromPredictionListAction(player.id, this._ROLE);
            this.predictionFacade.popPredictionFromListAction(player.id, this._ROLE);
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
            this.predictionFacade.removePlayerFromPredictionListAction(team.id, CricketPlayerRole.TEAM);
            this.predictionFacade.popPredictionFromListAction(team.id, CricketPlayerRole.TEAM);
          }
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  // console.log(this.predictionItem.predictions);
}

async editPrediction(playerOrTeamInfo : any, playerOrTeam : string, ) {
  debugger
  if(playerOrTeam === "PLAYER"){
    let index = _.findIndex(this.predictionSet, (e : Prediction) => {
      return (e.playerOrTeamId == playerOrTeamInfo.id && e.selectedRole == this._ROLE);
    }, 0);
    this.predictionFacade.setSelectedPrediction(this.predictionSet[index]);
    this.predictionFacade.setSelectedPlayer(playerOrTeamInfo);
  }
  else{
    let index = _.findIndex(this.predictionSet, (e : Prediction) => {
      return e.playerOrTeamId == playerOrTeamInfo.id;
    }, 0);
    this.predictionFacade.setSelectedPrediction(this.predictionSet[index]);
    this.predictionFacade.setSelectedTeam(playerOrTeamInfo);
  }
  const format = new BehaviorSubject(this.selectedMatch.format);
  const teamOrPlayer = new BehaviorSubject(playerOrTeam);
  const pRole = new BehaviorSubject(this._ROLE);
  const modal = await this.modalCtrl.create({
    component: PredictPlayerScoreComponent,
    componentProps: {
      format, teamOrPlayer, pRole
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
      this.predictionFacade.updatePredictionInListAction(data, this._ROLE);
    }
    else{
      this.predictionFacade.updatePredictionInListAction(data, CricketPlayerRole.TEAM)
    }
  }
  // console.log(this.predictionList.predictions);
}

}
