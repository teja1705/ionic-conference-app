import { Component, Input, OnInit } from '@angular/core';
import { ModalController, RangeCustomEvent } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketFormat, CricketPlayerRole, CricketWayOfPoints, MatchInfo, ODI_BAT_SCORE_LIMIT, ODI_BAT_SCORE_RANGE, ODI_BOWL_SCORE_LIMIT, ODI_BOWL_WICKET_RANGE, ODI_TEAM_SCORE_LIMIT, ODI_TEAM_SCORE_RANGE, PlayerData, Prediction, SCORE_PER_RUN, SCORE_PER_WICKET, T20_BAT_SCORE_LIMIT, T20_BAT_SCORE_RANGE, T20_BOWL_SCORE_LIMIT, T20_BOWL_WICKET_RANGE, T20_TEAM_SCORE_LIMIT, T20_TEAM_SCORE_RANGE, TeamData, TEST_BAT_SCORE_LIMIT, TEST_BAT_SCORE_RANGE, TEST_BOWL_SCORE_LIMIT, TEST_BOWL_WICKET_RANGE, TEST_TEAM_SCORE_LIMIT, TEST_TEAM_SCORE_RANGE, USER_ID } from '../../store/prediction.model';
import { RangeValue } from '@ionic/core';


@Component({
  selector: 'app-predict-player-score',
  templateUrl: './predict-player-score.component.html',
  styleUrls: ['./predict-player-score.component.scss'],
})
export class PredictPlayerScoreComponent implements OnInit {

  player : PlayerData
  team : TeamData
  public _isPlayer : boolean = false;
  public _isTeam : boolean = false;
  public _isBatter : boolean = false;
  public _isBowler : boolean = false;
  public predictPoints : any;
  public _isMaxTouched : boolean = false;
  public _isMinTouched : boolean = false;

  //min-false max-false - min=0, max=0
  //min-true max-false min=min max=min
  //min-false max-true min-min max=max
  selectedMatch : MatchInfo
  @Input() 
  format: BehaviorSubject<CricketFormat>;

  @Input()
  teamOrPlayer : BehaviorSubject<string>;

  format_range : any;
  format_limit : any;
  lastEmittedMinValue: any
  lastEmittedMaxValue: any

  selectedPrediction : Prediction;


  constructor(private modalCtrl: ModalController, private predictionFacade : PredictionStoreFacade) {
    this.predictionFacade.selectedMatch$.subscribe((match)=>{
      this.selectedMatch = match;
    })
    this.predictionFacade.selectedPrediction$.subscribe((prediction)=>{
      this.selectedPrediction = prediction;
    })
    this.lastEmittedMinValue= 0;
    this.lastEmittedMaxValue = this.lastEmittedMinValue;
   }

  ngOnInit() {
    if(this.teamOrPlayer.value == "PLAYER"){
      this.predictionFacade.selectedPlayer$.subscribe((player)=>{
        this.player = player;
      })
      this._isPlayer = true;
      if(this.player.role === CricketPlayerRole.BATSMAN){
        this._isBatter = true;
      }
      else{
        this._isBowler = true;
      }
    }
    else{
      this.predictionFacade.selectedTeam$.subscribe((team)=>{
        this.team = team;
        console.log(team);
      })
      this._isTeam = true;
    }
    if(this.player){
      if(this.format.value == CricketFormat.T20 && this.player.role == CricketPlayerRole.BATSMAN){
        this.format_range = T20_BAT_SCORE_RANGE;
        this.format_limit = T20_BAT_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.T20 && this.player.role == CricketPlayerRole.BOWLER){
        this.format_range = T20_BOWL_WICKET_RANGE;
        this.format_limit = T20_BOWL_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.ODI && this.player.role == CricketPlayerRole.BATSMAN){
        this.format_range = ODI_BAT_SCORE_RANGE;
        this.format_limit = ODI_BAT_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.ODI && this.player.role == CricketPlayerRole.BOWLER){
        this.format_range = ODI_BOWL_WICKET_RANGE;
        this.format_limit = ODI_BOWL_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.TEST && this.player.role == CricketPlayerRole.BATSMAN){
        this.format_range = TEST_BAT_SCORE_RANGE;
        this.format_limit = TEST_BAT_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.TEST && this.player.role == CricketPlayerRole.BOWLER){
        this.format_range = TEST_BOWL_WICKET_RANGE;
        this.format_limit = TEST_BOWL_SCORE_LIMIT;
      }
    }
    else if(this.team){
      if(this.format.value == CricketFormat.T20){
        this.format_range = T20_TEAM_SCORE_RANGE;
        this.format_limit = T20_TEAM_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.ODI){
        this.format_range = ODI_TEAM_SCORE_RANGE;
        this.format_limit = ODI_TEAM_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.TEST){
        this.format_range = TEST_TEAM_SCORE_RANGE;
        this.format_limit = TEST_TEAM_SCORE_LIMIT;
      }
    }
    console.log("range - " + `${this.format_range}`);
    console.log("limit - " + `${this.format_limit}`);

    if(this._isTeam || this._isBatter){
      this.predictPoints = (this.format_range - this.lastEmittedMaxValue + this.lastEmittedMinValue) *SCORE_PER_RUN;
    }
    else if(this._isBowler){
      this.predictPoints = (this.format_range - this.lastEmittedMaxValue +  this.lastEmittedMinValue) * SCORE_PER_WICKET;
    }

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let max : number
    let newPrediction : Prediction = new Prediction();
    if(this.selectedPrediction.playerId || this.selectedPrediction.teamId){
      newPrediction.id = this.selectedPrediction.id;
      newPrediction.format = this.selectedPrediction.format;
      // newPrediction.ifPredictPoints = this.predictPoints;
      newPrediction.isPredictedCorrectly = this.selectedPrediction.isPredictedCorrectly;
      newPrediction.isPredictedOnAPlayer = this.selectedPrediction.isPredictedOnAPlayer;
      newPrediction.isPredictedOnATeam = this.selectedPrediction.isPredictedOnATeam;
      newPrediction.matchId = this.selectedPrediction.matchId;
      newPrediction.playerId = this.selectedPrediction.playerId;
      newPrediction.playerImageUrl = this.selectedPrediction.playerImageUrl;
      if(this._isPlayer){
        if(!this._isMaxTouched && this._isMinTouched){
          newPrediction.playerMaxScore = this.lastEmittedMinValue;
          max = this.lastEmittedMinValue;
        }
        else{
          newPrediction.playerMaxScore = this.lastEmittedMaxValue;
          max = this.lastEmittedMaxValue;
        }
        newPrediction.playerMinScore = this.lastEmittedMinValue;
      }
      else{
        newPrediction.playerMaxScore = "";
        newPrediction.playerMinScore = "";
      }
      if(this._isTeam){
        if(!this._isMaxTouched && this._isMinTouched){
          newPrediction.teamMaxScore = this.lastEmittedMinValue;
          max = this.lastEmittedMinValue;
        }
        else{
          newPrediction.teamMaxScore = this.lastEmittedMaxValue;
          max = this.lastEmittedMaxValue;
        }
        newPrediction.teamMinScore = this.lastEmittedMinValue;
      }
      else{
        newPrediction.teamMaxScore = "";
        newPrediction.teamMinScore = "";
      }
      newPrediction.playerName = this.selectedPrediction.playerName;
      newPrediction.predictedOn = this.selectedPrediction.predictedOn;
      newPrediction.predictionGroupId = this.selectedPrediction.predictionGroupId;
      newPrediction.role = this.selectedPrediction.role;
      newPrediction.teamId = this.selectedPrediction.teamId;
      newPrediction.teamName = this.selectedPrediction.teamName;
      newPrediction.userId = this.selectedPrediction.userId;
      newPrediction.userPredictedPoints = this.selectedPrediction.userPredictedPoints;
      if(this._isTeam || this._isBatter){
        newPrediction.ifPredictPoints = (this.format_range - max + this.lastEmittedMinValue) *SCORE_PER_RUN;
      }
      else if(this._isBowler){
        newPrediction.ifPredictPoints = (this.format_range - max +  this.lastEmittedMinValue) * SCORE_PER_WICKET;
      }
    }
    else{
      newPrediction.id = "";
      newPrediction.format = this.format.value;
      // newPrediction.ifPredictPoints = this.predictPoints;
      newPrediction.isPredictedCorrectly = false;
      if(this._isPlayer){
        newPrediction.isPredictedOnAPlayer = true;
        newPrediction.isPredictedOnATeam = false;
      }
      else if(this._isTeam){
        newPrediction.isPredictedOnAPlayer = false;
        newPrediction.isPredictedOnATeam = true
      }
      newPrediction.matchId = this.selectedMatch.id;
      if(this._isPlayer){
        newPrediction.playerId = this.player.id;
      }
      else{
        newPrediction.playerId = "";
      }
      if(this._isPlayer){
        newPrediction.playerImageUrl = this.player.playerImageUrl;
      }
      else{
        newPrediction.playerImageUrl = this.team.teamImageUrl;
      }
      if(this._isPlayer){
        if(!this._isMaxTouched && this._isMinTouched){
          newPrediction.playerMaxScore = this.lastEmittedMinValue;
          max = this.lastEmittedMinValue;
        }
        else{
          newPrediction.playerMaxScore = this.lastEmittedMaxValue;
          max = this.lastEmittedMaxValue;
        }
        newPrediction.playerMinScore = this.lastEmittedMinValue;
      }
      else{
        newPrediction.playerMaxScore = "";
        newPrediction.playerMinScore = "";
      }
      if(this._isPlayer){
        newPrediction.playerName = this.player.playerName;
      }
      else{
        newPrediction.playerName = "";
      }
      if(this._isBatter){
        newPrediction.predictedOn = CricketWayOfPoints.BATTING;
      }
      else if(this._isBowler){
        newPrediction.predictedOn = CricketWayOfPoints.BOWLING;
      }
      else if(this._isTeam){
        newPrediction.predictedOn = CricketWayOfPoints.TEAM;
      }
      newPrediction.predictionGroupId = "";
      if(this._isBatter){
        newPrediction.role = CricketPlayerRole.BATSMAN;
      }
      else if(this._isBowler){
        newPrediction.role = CricketPlayerRole.BOWLER;
      }
      else if(this._isTeam){
        newPrediction.role = CricketPlayerRole.NONE;
      }
      if(this._isTeam){
        newPrediction.teamId = this.team.id;
      }
      else{
        newPrediction.teamId = "";
      }
      if(this._isTeam){
        if(!this._isMaxTouched && this._isMinTouched){
          newPrediction.teamMaxScore = this.lastEmittedMinValue;
          max = this.lastEmittedMinValue;
        }
        else{
          newPrediction.teamMaxScore = this.lastEmittedMaxValue;
          max = this.lastEmittedMaxValue;
        }
        newPrediction.teamMinScore = this.lastEmittedMinValue;
      }
      else{
        newPrediction.teamMaxScore = "";
        newPrediction.teamMinScore = "";
      }
      if(this._isTeam){
        newPrediction.teamName = this.team.teamName;
      }
      else{
        newPrediction.teamName = "";
      }
      newPrediction.userId = USER_ID;
      newPrediction.userPredictedPoints = "";
    }
    if(this._isTeam || this._isBatter){
      newPrediction.ifPredictPoints = (this.format_range - max + this.lastEmittedMinValue) *SCORE_PER_RUN;
    }
    else if(this._isBowler){
      newPrediction.ifPredictPoints = (this.format_range - max +  this.lastEmittedMinValue) * SCORE_PER_WICKET;
    }
    return this.modalCtrl.dismiss(newPrediction, 'confirm');
  }



  onMinChange(ev: Event) {
    this.lastEmittedMinValue = (ev as RangeCustomEvent).detail.value;
    this._isMinTouched = true;
    this._isMaxTouched = false;
  }

  onMaxChange(ev: Event) {
    this._isMaxTouched = true;
    this._isMinTouched = false;
    this.lastEmittedMaxValue = (ev as RangeCustomEvent).detail.value;
    if(this._isTeam || this._isBatter){
      this.predictPoints = (this.format_range - this.lastEmittedMaxValue + this.lastEmittedMinValue) *SCORE_PER_RUN;
    }
    else if(this._isBowler){
      this.predictPoints = (this.format_range - this.lastEmittedMaxValue +  this.lastEmittedMinValue) * SCORE_PER_WICKET;
    }
  }



}
