export const courseFeatureKey = 'prediction';

import { Action, createReducer } from '@ngrx/store';
import { ContestData, CricketMatchHomePageInfo, IPredictionStateData, PlayerData, MatchInfo, StatusOfMatch, TeamData, TeamsPlayerData, CricketPlayerRole, TeamVsTeam, Prediction, PredictionItem, Contest, ContestMetaData, ContestJoinedUsers } from './prediction.model';
import * as predictionActions from './prediction.action';
import {mutableOn} from 'ngrx-etc';
import * as _ from 'lodash';



export const InitialState : IPredictionStateData = {
    actionInProgress : false,
    upcomingMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    liveMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    historyMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    matchContests : new Array<Contest>(),
    contestMetaData : new ContestMetaData(),
    mycontests : new Array<Contest>(),
    myPredictions : new Array<PredictionItem>(),
    match : new TeamVsTeam(),
    battersList : new Array<PlayerData>(),
    bowlersList : new Array<PlayerData>(),
    teamsList : new Array<TeamData>(),
    selectedPlayer : new PlayerData(),
    selectedTeam : new TeamData(),
    selectedMatch : new MatchInfo(),
    selectedPrediction : new Prediction(),
    createPrediction : new PredictionItem(),
    predictionSet : new Array<Prediction>(),
    selectedPredictionItem : new PredictionItem(),
    contestJoinedUsers : new Array<ContestJoinedUsers>(),
    selectedContest : new Contest(),
    errorMessage : ""
}

const reducer = createReducer(
    InitialState,
    mutableOn(predictionActions.SetActionInProgressAction, (state, action) => {
        state.actionInProgress = action.inProgress;
      }),
    mutableOn(predictionActions.GetHomePageUpcomingMatchesAction, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetHomePageUpcomingMatchesSuccessAction, (state, action) => {
        state.actionInProgress = false;
        if(action.sport == "CRICKET"){
            state.upcomingMatchesHomepage = [...action.details];
        }
    }),
    mutableOn(predictionActions.GetHomePageUpcomingMatchesFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.GetHomePageLiveMatchesAction, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetHomePageLiveMatchesSuccessAction, (state, action) => {
        state.actionInProgress = false;
        if(action.sport == "CRICKET"){
            state.liveMatchesHomepage = [...action.details];
        }
    }),
    mutableOn(predictionActions.GetHomePageLiveMatchesFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.GetHomePageHistoryMatchesAction, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetHomePageHistoryMatchesSuccessAction, (state, action) => {
        state.actionInProgress = false;
        if(action.sport == "CRICKET"){
            state.historyMatchesHomepage = [...action.details];
        }
    }),
    mutableOn(predictionActions.GetHomePageHistoryMatchesFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.MoveMatchToLiveListAction, (state, action) => {
        state.actionInProgress = false;
        let index = _.findIndex(state.upcomingMatchesHomepage, (e : CricketMatchHomePageInfo) => {
            return e.date == action.date;
          }, 0);
        let index2 = _.findIndex(state.upcomingMatchesHomepage[index].matches,(e : MatchInfo)=>{
            return e.id == action.id;
        }, 0);
        let match : MatchInfo = _.cloneDeep(state.upcomingMatchesHomepage[index].matches[index2]);
        match.status = StatusOfMatch.ON_GOING;
        let sport : CricketMatchHomePageInfo = _.cloneDeep(state.upcomingMatchesHomepage[index]);
        sport.matches = [match]
        state.upcomingMatchesHomepage[index].matches = [...state.upcomingMatchesHomepage[index].matches.slice(0,index2), ...state.upcomingMatchesHomepage[index].matches.slice(index2+1)]
        if(state.upcomingMatchesHomepage[index].matches.length == 0){
            state.upcomingMatchesHomepage = [...state.upcomingMatchesHomepage.slice(0,index), ...state.upcomingMatchesHomepage.slice(index+1)]
        }
        let index3 = _.findIndex(state.liveMatchesHomepage, (e : CricketMatchHomePageInfo) => {
            return e.date == action.date;
          }, 0);
        if(index3<0){
            state.liveMatchesHomepage = [...state.liveMatchesHomepage, sport];
        }
        else{
            state.liveMatchesHomepage[index3].matches = [...state.liveMatchesHomepage[index3].matches, match];
        }
    }),
    mutableOn(predictionActions.GetMatchContestsByMatchIdAction, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetMatchContestsByMatchIdSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.matchContests = action.contest.contests;
        state.contestMetaData = action.contest.contestInfo;
        state.myPredictions = action.contest.myPredictions;
        state.mycontests = action.contest.myContests;
    }),
    mutableOn(predictionActions.GetMatchContestsByMatchIdFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.GetMatchPlayersListAction, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetMatchPlayersListSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.match = action.playersList.match;
        state.battersList = action.playersList.bat;
        state.bowlersList = action.playersList.bowl;
        state.teamsList = action.playersList.team;
    }),
    mutableOn(predictionActions.GetMatchPlayersListFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.SetSelectedPlayerAction, (state, action) => {
        state.actionInProgress = false;
        state.selectedPlayer = action.player;
    }),
    mutableOn(predictionActions.SetSelectedTeamAction, (state, action) => {
        state.actionInProgress = false;
        state.selectedTeam = action.team;
    }),
    mutableOn(predictionActions.SetSelectedMatchAction, (state, action) => {
        state.actionInProgress = false;
        state.selectedMatch = action.match;
    }),
    mutableOn(predictionActions.TogglePlayerSelectionAction, (state, action) => {
        state.actionInProgress = false;
        debugger
        if(action.role == CricketPlayerRole.BATSMAN){
            let index = _.findIndex(state.battersList, (e : PlayerData) => {
              return e.id == action.id;
            }, 0);
            let a : PlayerData = _.cloneDeep(state.battersList[index]);
            a.isSelected = true;
            state.battersList = [...state.battersList.slice(0, index), a ,...state.battersList.slice(index+1)];
          }
          else if(action.role == CricketPlayerRole.BOWLER){
            let index = _.findIndex(state.bowlersList, (e : PlayerData) => {
                return e.id == action.id;
              }, 0);
              let a : PlayerData = _.cloneDeep(state.bowlersList[index]);
              a.isSelected = true;
              state.bowlersList = [...state.bowlersList.slice(0, index), a ,...state.bowlersList.slice(index+1)];
          }
          else if(action.role == CricketPlayerRole.NONE){
            let index = _.findIndex(state.teamsList, (e : TeamData) => {
                return e.id == action.id;
              }, 0);
              let a : TeamData = _.cloneDeep(state.teamsList[index]);
              a.isSelected = true;
              state.teamsList = [...state.teamsList.slice(0, index), a ,...state.teamsList.slice(index+1)];
          }
    }),
    mutableOn(predictionActions.RemovePlayerFromPredictionListAction, (state, action) => {
        state.actionInProgress = false;
        debugger
        if(action.role == CricketPlayerRole.BATSMAN){
            let index = _.findIndex(state.battersList, (e : PlayerData) => {
              return e.id == action.id;
            }, 0);
            let a : PlayerData = _.cloneDeep(state.battersList[index]);
            a.isSelected = false;
            state.battersList = [...state.battersList.slice(0, index), a ,...state.battersList.slice(index+1)];
          }
          else if(action.role == CricketPlayerRole.BOWLER){
            let index = _.findIndex(state.bowlersList, (e : PlayerData) => {
                return e.id == action.id;
              }, 0);
              let a : PlayerData = _.cloneDeep(state.bowlersList[index]);
              a.isSelected = false;
              state.bowlersList = [...state.bowlersList.slice(0, index), a ,...state.bowlersList.slice(index+1)];
          }
          else if(action.role == CricketPlayerRole.NONE){
            let index = _.findIndex(state.teamsList, (e : TeamData) => {
                return e.id == action.id;
              }, 0);
              let a : TeamData = _.cloneDeep(state.teamsList[index]);
              a.isSelected = false;
              state.teamsList = [...state.teamsList.slice(0, index), a ,...state.teamsList.slice(index+1)];
          }
    }),
    mutableOn(predictionActions.SetSelectedPredictionAction, (state, action) => {
        state.actionInProgress = false;
        state.selectedPrediction = action.prediction;
    }),
    mutableOn(predictionActions.CreatePredictionItemAction, (state, action) => {
        state.actionInProgress = false;
        state.createPrediction = action.prediction;
    }),
    mutableOn(predictionActions.SetPredictionListAction, (state, action) => {
        state.actionInProgress = false;
        state.predictionSet = [...action.prediction];
    }),
    mutableOn(predictionActions.PushPredictionToListAction, (state, action) => {
        state.actionInProgress = false;
        state.predictionSet = [...state.predictionSet,action.prediction];
    }),
    mutableOn(predictionActions.PopPredictionFromListAction, (state, action) => {
        state.actionInProgress = false;
        let index  : number;
        if(action.role == CricketPlayerRole.NONE){
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return e.teamId == action.id;
              }, 0);
        }
        else{
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return (e.playerId == action.id && e.role == action.role);
              }, 0);
        }
          state.predictionSet = [...state.predictionSet.slice(0, index), ...state.predictionSet.slice(index+1)];
    }),
    mutableOn(predictionActions.UpdatePredictionInListAction, (state, action) => {
        state.actionInProgress = false;
        let index  : number;
        if(action.role == CricketPlayerRole.NONE){
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return e.teamId == action.prediction.teamId;
              }, 0);
        }
        else{
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return (e.playerId == action.prediction.playerId && e.role == action.role);
              }, 0);
        }
        state.predictionSet = [...state.predictionSet.slice(0, index), action.prediction,...state.predictionSet.slice(index+1)];
    }),
    mutableOn(predictionActions.SaveMyPredictionAction, (state, action) => {
        state.actionInProgress = true;
        state.myPredictions = [...state.myPredictions, action.prediction];
    }),
    mutableOn(predictionActions.SaveMyPredictionSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.myPredictions = [...state.myPredictions, action.prediction];

    }),
    mutableOn(predictionActions.SaveMyPredictionFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.DeletePredictionAction, (state, action) => {
        state.actionInProgress = true;
        let index = _.findIndex(state.myPredictions, (e : PredictionItem) => {
            return e.id == action.predictionGroupId;
          }, 0);
        state.myPredictions = [...state.myPredictions.slice(0,index), ...state.myPredictions.slice(index+1)];
    }),
    mutableOn(predictionActions.DeletePredictionSuccessAction, (state, action) => {
        state.actionInProgress = false;
        let index = _.findIndex(state.myPredictions, (e : PredictionItem) => {
            return e.id == action.predictionGroupId;
          }, 0);
        state.myPredictions = [...state.myPredictions.slice(0,index), ...state.myPredictions.slice(index+1)];
    }),
    mutableOn(predictionActions.DeletePredictionFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.EditPredictionAction, (state, action) => {
        state.actionInProgress = false;
        console.log(action.prediction);
        action.prediction.predictions.forEach((e)=>{
            if(e.role === CricketPlayerRole.BATSMAN){
                let index = _.findIndex(state.battersList, (p : PlayerData) => {
                    return e.playerId == p.id;
                  }, 0);
                debugger
                let player : PlayerData = _.cloneDeep(state.battersList[index]);
                player.isSelected = true;
                state.battersList = [...state.battersList.slice(0, index), player, ...state.battersList.slice(index+1)];
            }
            else if(e.role === CricketPlayerRole.BOWLER){
                let index = _.findIndex(state.bowlersList, (p : PlayerData) => {
                    return e.playerId == p.id;
                  }, 0);
                let player : PlayerData = _.cloneDeep(state.bowlersList[index]);
                player.isSelected = true;
                state.bowlersList = [...state.bowlersList.slice(0, index), player, ...state.bowlersList.slice(index+1)];
            }
            else if(e.role === CricketPlayerRole.NONE){
                let index = _.findIndex(state.teamsList, (p : TeamData) => {
                    return e.teamId == p.id;
                  }, 0);
                let player : TeamData = _.cloneDeep(state.teamsList[index]);
                player.isSelected = true;
                state.teamsList = [...state.teamsList.slice(0, index), player, ...state.teamsList.slice(index+1)];
            }
        })
        state.selectedPredictionItem = action.prediction;
        state.predictionSet = action.prediction.predictions;
    }),
    mutableOn(predictionActions.JoinContestAction, (state, action) => {
        state.actionInProgress = true;
        let index = _.findIndex(state.myPredictions, (e : PredictionItem) => {
            return e.id == action.prediction.id;
          }, 0);
        state.myPredictions = [...state.myPredictions.slice(0,index),action.prediction,...state.myPredictions.slice(0,index)];

        let index1 = _.findIndex(state.matchContests, (e : Contest) => {
            return e.id == action.prediction.contestId;
          }, 0);
        let contest : Contest = _.cloneDeep(state.matchContests[index1]);
        contest.isJoined = true;
        state.matchContests = [...state.matchContests.slice(0,index1),contest,...state.matchContests.slice(index1+1)];        
    }),
    mutableOn(predictionActions.JoinContestSuccessAction, (state, action) => {
        state.actionInProgress = false;
        let index = _.findIndex(state.myPredictions, (e : PredictionItem) => {
            return e.id == action.prediction.id;
          }, 0);
        state.myPredictions = [...state.myPredictions.slice(0,index),action.prediction,...state.myPredictions.slice(0,index)];

        let index1 = _.findIndex(state.matchContests, (e : Contest) => {
            return e.id == action.prediction.contestId;
          }, 0);
        let contest : Contest = _.cloneDeep(state.matchContests[index1]);
        contest.isJoined = true;
        state.matchContests = [...state.matchContests.slice(0,index1),contest,...state.matchContests.slice(index1+1)];
    }),
    mutableOn(predictionActions.JoinContestFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.SetContesttoMyContestAction, (state, action) => {
        state.actionInProgress = false;
        state.mycontests = [...state.mycontests,action.contest];
    }),
    mutableOn(predictionActions.GetContestJoinedUsersAction, (state, action) => {
        state.actionInProgress = true;     
    }),
    mutableOn(predictionActions.GetContestJoinedUsersSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.contestJoinedUsers = [...action.users];
    }),
    mutableOn(predictionActions.GetContestJoinedUsersFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.SetSelectedContestAction, (state, action) => {
        state.actionInProgress = false;
        state.selectedContest = action.contest;
    }),
)

export function predictionReducer(state: IPredictionStateData | null, action: Action) {
    return reducer(state, action);
  }