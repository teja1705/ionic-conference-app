import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromPredictionState from './prediction.state';
import * as fromPredictionAction from './prediction.action';
import * as fromPredictionSelectors from './prediction.selector';
import { Contest, CricketPlayerRole, MatchInfo, PlayerData, Prediction, PredictionItem, TeamData } from "./prediction.model";




@Injectable({ providedIn: 'root' })
export class PredictionStoreFacade {

  constructor(private store: Store<fromPredictionState.PredictionState>) {}

  actionInProgress$ = this.store.pipe(select(fromPredictionSelectors.selectActionInProgress));
  homePageUpcomingMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageUpcomingMatches));
  homePageLiveMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageLiveMatches));
  homePageHistoryMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageHistoryMatches));
  matchContests$ = this.store.pipe(select(fromPredictionSelectors.selectMatchContests));
  teamVsTeam$ = this.store.pipe(select(fromPredictionSelectors.selectTeamVsTeam));
  selectedPlayer$ = this.store.pipe(select(fromPredictionSelectors.selectSelectedPlayer));
  selectedTeam$ = this.store.pipe(select(fromPredictionSelectors.selectSelectedTeam));
  selectedMatch$ = this.store.pipe(select(fromPredictionSelectors.selectSelectedMatch));
  selectedBattersList$ = this.store.pipe(select(fromPredictionSelectors.selectBattersList));
  selectedBowlersList$ = this.store.pipe(select(fromPredictionSelectors.selectBowlersList));
  selectedTeamsList$ = this.store.pipe(select(fromPredictionSelectors.selectTeamsList));
  selectedPrediction$ = this.store.pipe(select(fromPredictionSelectors.selectSelectedPrediction));
  createPredictionList$ = this.store.pipe(select(fromPredictionSelectors.selectCreatePrediction));
  predictionSet$ = this.store.pipe(select(fromPredictionSelectors.selectPredictionSet));
  contestMetaData$ = this.store.pipe(select(fromPredictionSelectors.selectContestMetaData));
  myPredictions$ = this.store.pipe(select(fromPredictionSelectors.selectMyPredictions));
  myContests$ = this.store.pipe(select(fromPredictionSelectors.selectMyContests));
  selectedPredictionItem$ = this.store.pipe(select(fromPredictionSelectors.selectSelectedPredictionItem));
  contestJoinedUsers$ = this.store.pipe(select(fromPredictionSelectors.selectContestJoinedUsers));
  selectedContest$ = this.store.pipe(select(fromPredictionSelectors.selectSelectedContest));







  setActionInProgress(){
    this.store.dispatch(fromPredictionAction.SetActionInProgressAction({inProgress: true}));
  }

  getHomePageUpcomingMatches(sport : any, userId : any){
    this.store.dispatch(fromPredictionAction.GetHomePageUpcomingMatchesAction({sport: sport, userId : userId}));
  }

  getHomePageLiveMatches(sport : any, userId : any){
    this.store.dispatch(fromPredictionAction.GetHomePageLiveMatchesAction({sport: sport, userId : userId}));
  }

  getHomePageHistoryMatches(sport : any, userId : any){
    this.store.dispatch(fromPredictionAction.GetHomePageHistoryMatchesAction({sport: sport, userId : userId}));
  }

  moveMatchToLiveList(date : string, id : any){
    this.store.dispatch(fromPredictionAction.MoveMatchToLiveListAction({date : date, id : id}));
  }

  getMatchContests(matchId : any){
    this.store.dispatch(fromPredictionAction.GetMatchContestsByMatchIdAction({matchId : matchId}));
  }

  getMatchPlayersList(matchId : any){
    this.store.dispatch(fromPredictionAction.GetMatchPlayersListAction({matchId : matchId}));
  }

  setSelectedPlayer(player : PlayerData){
    this.store.dispatch(fromPredictionAction.SetSelectedPlayerAction({player : player}));
  }

  setSelectedTeam(team : TeamData){
    this.store.dispatch(fromPredictionAction.SetSelectedTeamAction({team : team}));
  }

  setSelectedMatch(match : MatchInfo){
    this.store.dispatch(fromPredictionAction.SetSelectedMatchAction({match : match}));
  }

  togglePlayerSelection(id : any, role : CricketPlayerRole){
    this.store.dispatch(fromPredictionAction.TogglePlayerSelectionAction({id : id, role : role}));
  }

  removePlayerFromPredictionListAction(id : any, role : CricketPlayerRole){
    this.store.dispatch(fromPredictionAction.RemovePlayerFromPredictionListAction({id : id, role : role}));
  }

  setSelectedPrediction(prediction : Prediction){
    this.store.dispatch(fromPredictionAction.SetSelectedPredictionAction({prediction : prediction}));
  }

  popPredictionFromListAction(id : any, role : CricketPlayerRole){
    this.store.dispatch(fromPredictionAction.PopPredictionFromListAction({id : id, role : role}));
  }

  pushPredictionToListAction(prediction : Prediction){
    this.store.dispatch(fromPredictionAction.PushPredictionToListAction({prediction : prediction}));
  }

  createPredictionItemAction(prediction : PredictionItem){
    this.store.dispatch(fromPredictionAction.CreatePredictionItemAction({prediction : prediction}));
  }

  updatePredictionInListAction(prediction : Prediction, role : CricketPlayerRole){
    this.store.dispatch(fromPredictionAction.UpdatePredictionInListAction({prediction : prediction, role : role}));
  }

  saveMyPredictionAction(prediction : PredictionItem){
    this.store.dispatch(fromPredictionAction.SaveMyPredictionAction({prediction : prediction}));
  }

  setPredictionListAction(prediction : Array<Prediction>){
    this.store.dispatch(fromPredictionAction.SetPredictionListAction({prediction : prediction}));
  }

  deletePredictionAction(predictionGroupId : any){
    this.store.dispatch(fromPredictionAction.DeletePredictionAction({predictionGroupId : predictionGroupId}));
  }

  editPredictionAction(prediction : PredictionItem){
    this.store.dispatch(fromPredictionAction.EditPredictionAction({prediction : prediction}));
  }

  setContesttoMyContestAction(contest : Contest){
    this.store.dispatch(fromPredictionAction.SetContesttoMyContestAction({contest : contest}));
  }

  joinContestAction(prediction : PredictionItem){
    this.store.dispatch(fromPredictionAction.JoinContestAction({prediction : prediction}));
  }

  getContestJoinedUsersAction(contestId : string){
    this.store.dispatch(fromPredictionAction.GetContestJoinedUsersAction({contestId : contestId}));
  }

  setSelectedContest(contest : Contest){
    this.store.dispatch(fromPredictionAction.SetSelectedContestAction({contest : contest}));
  }

}