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

  @Input()
  pRole : BehaviorSubject<CricketPlayerRole>;

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
      debugger
      if(this.pRole.value == CricketPlayerRole.BATTER){
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
      if(this.format.value == CricketFormat.T20 && this.pRole.value == CricketPlayerRole.BATTER){
        this.format_range = T20_BAT_SCORE_RANGE;
        this.format_limit = T20_BAT_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.T20 && this.pRole.value == CricketPlayerRole.BOWLER){
        this.format_range = T20_BOWL_WICKET_RANGE;
        this.format_limit = T20_BOWL_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.ODI && this.pRole.value == CricketPlayerRole.BATTER){
        this.format_range = ODI_BAT_SCORE_RANGE;
        this.format_limit = ODI_BAT_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.ODI && this.pRole.value == CricketPlayerRole.BOWLER){
        this.format_range = ODI_BOWL_WICKET_RANGE;
        this.format_limit = ODI_BOWL_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.TEST && this.pRole.value == CricketPlayerRole.BATTER){
        this.format_range = TEST_BAT_SCORE_RANGE;
        this.format_limit = TEST_BAT_SCORE_LIMIT;
      }
      else if(this.format.value == CricketFormat.TEST && this.pRole.value == CricketPlayerRole.BOWLER){
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
    debugger
    let max : number
    let newPrediction : Prediction = new Prediction();
    if(this.selectedPrediction.playerOrTeamId){
      newPrediction.id = this.selectedPrediction.id;
      // newPrediction.ifPredictPoints = this.predictPoints;
      newPrediction.isPredictedCorrectly = this.selectedPrediction.isPredictedCorrectly;
      newPrediction.playerOrTeamId = this.selectedPrediction.playerOrTeamId;
      newPrediction.actualRole = this.selectedPrediction.actualRole;
      newPrediction.selectedRole = this.selectedPrediction.selectedRole;
      if(!this._isMaxTouched && this._isMinTouched){
          newPrediction.maxValue = this.lastEmittedMinValue;
          max = this.lastEmittedMinValue;
      }
      else{
          newPrediction.maxValue = this.lastEmittedMaxValue;
          max = this.lastEmittedMaxValue;
      }
      newPrediction.minValue = this.lastEmittedMinValue;
      newPrediction.isPlayer = this.selectedPrediction.isPlayer;
      newPrediction.isTeam = this.selectedPrediction.isTeam;
      newPrediction.predictionGroupId = this.selectedPrediction.predictionGroupId;
      if(this._isTeam || this._isBatter){
        newPrediction.predictPoints = (this.format_range - max + this.lastEmittedMinValue) *SCORE_PER_RUN;
      }
      else if(this._isBowler){
        newPrediction.predictPoints = (this.format_range - max +  this.lastEmittedMinValue) * SCORE_PER_WICKET;
      }
      newPrediction.name = this.selectedPrediction.name;
      newPrediction.imageUrl = this.selectedPrediction.imageUrl;

    }
    else{
      newPrediction.isPredictedCorrectly = false;
      if(this._isPlayer){
        newPrediction.isPlayer = true;
        newPrediction.isTeam = false;
      }
      else if(this._isTeam){
        newPrediction.isPlayer = false;
        newPrediction.isTeam = true
      }
      if(this._isPlayer){
        newPrediction.playerOrTeamId = this.player.id;
      }
      if(!this._isMaxTouched && this._isMinTouched){
          newPrediction.maxValue = this.lastEmittedMinValue;
          max = this.lastEmittedMinValue;
      }
      else{
          newPrediction.maxValue = this.lastEmittedMaxValue;
          max = this.lastEmittedMaxValue;
      }
      newPrediction.minValue = this.lastEmittedMinValue;
      
      newPrediction.predictionGroupId = "";
      if(this._isBatter){
        newPrediction.actualRole = this.player.role;
        newPrediction.selectedRole = CricketPlayerRole.BATTER;
      }
      else if(this._isBowler){
        newPrediction.actualRole = this.player.role;
        newPrediction.selectedRole = CricketPlayerRole.BOWLER;
      }
      else if(this._isTeam){
        newPrediction.actualRole = CricketPlayerRole.TEAM;
        newPrediction.selectedRole = CricketPlayerRole.TEAM;
      }
      if(this._isTeam){
        newPrediction.playerOrTeamId = this.team.id;
      }
    if(this._isTeam || this._isBatter){
      newPrediction.predictPoints = (this.format_range - max + this.lastEmittedMinValue) *SCORE_PER_RUN;
    }
    else if(this._isBowler){
      newPrediction.predictPoints = (this.format_range - max +  this.lastEmittedMinValue) * SCORE_PER_WICKET;
    }
    if(this._isTeam){
      newPrediction.name = this.team.name;
      newPrediction.imageUrl = this.team.imageUrl;
    }
    else{
      newPrediction.name = this.player.firstname + " " + this.player.lastname;
      newPrediction.imageUrl = this.player.imageUrl;
    }
    debugger
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
