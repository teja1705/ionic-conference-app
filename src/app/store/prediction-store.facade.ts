import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromPredictionState from './prediction.state';
import * as fromPredictionAction from './prediction.action';
import * as fromPredictionSelectors from './prediction.selector';
import { Contest, ContestJoinRequest, CricketPlayerRole, MatchInfo, PlayerData, Prediction, PredictionInput, PredictionItem, TeamData } from "./prediction.model";




@Injectable({ providedIn: 'root' })
export class PredictionStoreFacade {

  constructor(private store: Store<fromPredictionState.PredictionState>) {}

  actionInProgress$ = this.store.pipe(select(fromPredictionSelectors.selectActionInProgress));
  homePageUpcomingMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageUpcomingMatches));
  homePageLiveMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageLiveMatches));
  homePageHistoryMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageHistoryMatches));
  matchContests$ = this.store.pipe(select(fromPredictionSelectors.selectMatchContests));
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
  notificationCount$ = this.store.pipe(select(fromPredictionSelectors.notificationCount));
  myUpcomingMathces$ = this.store.pipe(select(fromPredictionSelectors.getMyUpcomingMathces));
  myLiveMathces$ = this.store.pipe(select(fromPredictionSelectors.getMyLiveMatches));
  myHistoryMathces$ = this.store.pipe(select(fromPredictionSelectors.getMyHistoryMatches));
  coins$ = this.store.pipe(select(fromPredictionSelectors.getMyCoins));
  unknownPrediction$ = this.store.pipe(select(fromPredictionSelectors.getUnknownUserPrediction));
  matchScoreCard$ = this.store.pipe(select(fromPredictionSelectors.getMatchScoreCard));





  setActionInProgress(){
    this.store.dispatch(fromPredictionAction.SetActionInProgressAction({inProgress: true}));
  }

  getHomePageUpcomingMatches(sport : any){
    this.store.dispatch(fromPredictionAction.GetHomePageUpcomingMatchesAction({sport: sport}));
  }

  getHomePageLiveMatches(sport : any){
    this.store.dispatch(fromPredictionAction.GetHomePageLiveMatchesAction({sport: sport}));
  }

  getHomePageHistoryMatches(sport : any){
    this.store.dispatch(fromPredictionAction.GetHomePageHistoryMatchesAction({sport: sport}));
  }

  moveMatchToLiveList(date : string, id : any){
    this.store.dispatch(fromPredictionAction.MoveMatchToLiveListAction({date : date, id : id}));
  }

  getMatchContests(matchId : any, userId : any){
    this.store.dispatch(fromPredictionAction.GetMatchContestsByMatchIdAction({matchId : matchId, userId : userId}));
  }

  getMyMatchContests(matchId : any, userId : any){
    this.store.dispatch(fromPredictionAction.GetMyMatchContestsAction({matchId : matchId, userId : userId}));
  }

  getMyPredictions(matchId : any, userId : any){
    this.store.dispatch(fromPredictionAction.GetMyPredictionsAction({matchId : matchId, userId : userId}));
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

  saveMyPredictionAction(prediction : PredictionInput){
    this.store.dispatch(fromPredictionAction.SaveMyPredictionAction({prediction : prediction}));
  }

  setPredictionListAction(prediction : Array<Prediction>){
    this.store.dispatch(fromPredictionAction.SetPredictionListAction({prediction : prediction}));
  }

  deletePredictionAction(predictionGroupId : any){
    this.store.dispatch(fromPredictionAction.DeletePredictionAction({predictionGroupId : predictionGroupId}));
  }

  editPredictionAction(prediction : PredictionInput){
    this.store.dispatch(fromPredictionAction.EditPredictionAction({prediction : prediction}));
  }

  setContesttoMyContestAction(contest : Contest){
    this.store.dispatch(fromPredictionAction.SetContesttoMyContestAction({contest : contest}));
  }

  joinContestAction(request : ContestJoinRequest){
    this.store.dispatch(fromPredictionAction.JoinContestAction({request : request}));
  }

  getContestJoinedUsersAction(contestId : string, userId : any){
    this.store.dispatch(fromPredictionAction.GetContestJoinedUsersAction({contestId : contestId, userId : userId}));
  }

  setSelectedContest(contest : Contest){
    this.store.dispatch(fromPredictionAction.SetSelectedContestAction({contest : contest}));
  }

  updatePrediction(prediction : PredictionInput){
    this.store.dispatch(fromPredictionAction.UpdatePredictionAction({prediction : prediction}));
  }

  setUnreadNotificationCount(count : number){
    this.store.dispatch(fromPredictionAction.SetUnreadNotificationCount({count : count}));
  }

  getMyMatches(userId : any){
    this.store.dispatch(fromPredictionAction.GetMyMatchesAction({userId : userId}));
  }

  getMyCoins(userId : any){
    this.store.dispatch(fromPredictionAction.GetMyCoinsAction({userId : userId}));
  }

  setIsHomeTab(homeTab : boolean){
    this.store.dispatch(fromPredictionAction.SetTabChangeAction({home : homeTab}));
  }

  UnselectPlayers(){
    this.store.dispatch(fromPredictionAction.UnselectPlayersAction());
  }

  getUnknownUserPrediction(groupId : any){
    this.store.dispatch(fromPredictionAction.GetUnknownUserPredictionsAction({groupId : groupId}));
  }

  getMatchScoreCard(matchId : any){
    this.store.dispatch(fromPredictionAction.GetMatchScoreCardAction({matchId : matchId}));
  }


}