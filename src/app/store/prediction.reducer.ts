export const courseFeatureKey = 'prediction';

import { Action, createReducer } from '@ngrx/store';
import { ContestData, CricketMatchHomePageInfo, IPredictionStateData, PlayerData, MatchInfo, StatusOfMatch, TeamData, TeamsPlayerData, CricketPlayerRole, Prediction, PredictionItem, Contest, ContestMetaData, ContestJoinedUsers, PredictionInput, Coins, MatchScoreCard } from './prediction.model';
import * as predictionActions from './prediction.action';
import {mutableOn} from 'ngrx-etc';
import * as _ from 'lodash';
import { BioProfile, LoginProfile, Profile, SignUpResult } from './auth/model';



export const InitialState : IPredictionStateData = {
    actionInProgress : false,
    id_token: "",
    loginProfileLoading: false,
    profile: new Profile(),
    password: "",
    authenticated: false,
    isUserNameAvailable: false,
    userNameCheckInProgress: false,
    activationInfo: new SignUpResult(),
    passwordSent: false,
    upcomingMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    liveMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    historyMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    matchContests : new Array<Contest>(),
    contestMetaData : new ContestMetaData(),
    mycontests : new Array<Contest>(),
    myPredictions : new Array<PredictionInput>(),
    battersList : new Array<PlayerData>(),
    bowlersList : new Array<PlayerData>(),
    teamsList : new Array<TeamData>(),
    selectedPlayer : new PlayerData(),
    selectedTeam : new TeamData(),
    selectedMatch : new MatchInfo(),
    selectedPrediction : new Prediction(),
    createPrediction : new PredictionItem(),
    predictionSet : new Array<Prediction>(),
    selectedPredictionItem : new PredictionInput(),
    contestJoinedUsers : new Array<ContestJoinedUsers>(),
    selectedContest : new Contest(),
    notificationCount :0,
    myUpcomingMatches : new Array<MatchInfo>(),
    myLiveMatches : new Array<MatchInfo>(),
    myHistoryMatches : new Array<MatchInfo>(),
    coins : new Coins(),
    unknownUserPrediction : new PredictionInput(),
    matchScoreCard : new MatchScoreCard(),
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
            return e.matchId == action.id;
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
        state.matchContests = action.contest;
    }),
    mutableOn(predictionActions.GetMatchContestsByMatchIdFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.GetMyMatchContestsAction, (state, action) => {
      state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetMyMatchContestsSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.mycontests = action.contest;
    }),
    mutableOn(predictionActions.GetMyMatchContestsFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.GetMyPredictionsAction, (state, action) => {
      state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetMyPredictionsSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.myPredictions = action.predictionItem;
    }),
    mutableOn(predictionActions.GetMyMatchContestsFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.GetMatchPlayersListAction, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(predictionActions.GetMatchPlayersListSuccessAction, (state, action) => {
        state.actionInProgress = false;
        action.playersList.bat.map((e)=>{
        let bat : PlayerData = _.cloneDeep(e);
        bat.isSelected = false;
        state.battersList = [...state.battersList, bat];
        })
        action.playersList.bowl.map((e)=>{
          let bowl : PlayerData = _.cloneDeep(e);
          bowl.isSelected = false;
          state.bowlersList = [...state.bowlersList, bowl];
        })
        action.playersList.team.map((e)=>{
            let team : TeamData = _.cloneDeep(e);
            team.isSelected = false;
            state.teamsList = [...state.teamsList, team];
        })
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
        if(action.role == CricketPlayerRole.BATTER){
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
          else if(action.role == CricketPlayerRole.TEAM){
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
        if(action.role == CricketPlayerRole.BATTER){
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
          else if(action.role == CricketPlayerRole.TEAM){
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
        if(action.role == CricketPlayerRole.TEAM){
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return e.playerOrTeamId == action.id;
              }, 0);
        }
        else{
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return (e.playerOrTeamId == action.id && e.selectedRole == action.role);
              }, 0);
        }
          state.predictionSet = [...state.predictionSet.slice(0, index), ...state.predictionSet.slice(index+1)];
    }),
    mutableOn(predictionActions.UpdatePredictionInListAction, (state, action) => {
        state.actionInProgress = false;
        let index  : number;
        if(action.role == CricketPlayerRole.TEAM){
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return e.playerOrTeamId == action.prediction.playerOrTeamId;
              }, 0);
        }
        else{
            index = _.findIndex(state.predictionSet, (e : Prediction) => {
                return (e.playerOrTeamId == action.prediction.playerOrTeamId && e.selectedRole == action.role);
              }, 0);
        }
        state.predictionSet = [...state.predictionSet.slice(0, index), action.prediction,...state.predictionSet.slice(index+1)];
    }),
    mutableOn(predictionActions.SaveMyPredictionAction, (state, action) => {
        state.actionInProgress = true;
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
    }),
    mutableOn(predictionActions.DeletePredictionSuccessAction, (state, action) => {
        state.actionInProgress = false;
        let index = _.findIndex(state.myPredictions, (e : PredictionInput) => {
            return e.predictionGroup.id == action.predictionGroupId;
          }, 0);
        state.myPredictions = [...state.myPredictions.slice(0,index), ...state.myPredictions.slice(index+1)];
    }),
    mutableOn(predictionActions.DeletePredictionFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.EditPredictionAction, (state, action) => {
        state.actionInProgress = false;
        console.log(action.prediction.predictions);
        action.prediction.predictions.forEach((e)=>{
            if(e.selectedRole == CricketPlayerRole.BATTER){
                let index = _.findIndex(state.battersList, (p : PlayerData) => {
                    return e.playerOrTeamId == p.id;
                  }, 0);
                let player : PlayerData = _.cloneDeep(state.battersList[index]);
                player.isSelected = true;
                state.battersList = [...state.battersList.slice(0, index), player, ...state.battersList.slice(index+1)];
            }
            else if(e.selectedRole == CricketPlayerRole.BOWLER){
                let index = _.findIndex(state.bowlersList, (p : PlayerData) => {
                    return e.playerOrTeamId == p.id;
                  }, 0);
                let player : PlayerData = _.cloneDeep(state.bowlersList[index]);
                player.isSelected = true;
                state.bowlersList = [...state.bowlersList.slice(0, index), player, ...state.bowlersList.slice(index+1)];
            }
            else if(e.selectedRole == CricketPlayerRole.TEAM){
                let index = _.findIndex(state.teamsList, (p : TeamData) => {
                    return e.playerOrTeamId == p.id;
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
    }),
    mutableOn(predictionActions.JoinContestSuccessAction, (state, action) => {
        state.actionInProgress = false;
        let index1 = _.findIndex(state.matchContests, (e : Contest) => {
            return e.id == action.contestId;
          }, 0);
        let contest : Contest = _.cloneDeep(state.matchContests[index1]);
        contest.isJoined = true;
        state.matchContests = [...state.matchContests.slice(0,index1),contest,...state.matchContests.slice(index1+1)];
        state.mycontests = [...state.mycontests, contest];
    }),
    mutableOn(predictionActions.JoinContestFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.GetContestJoinedUsersAction, (state, action) => {
        state.actionInProgress = true;     
    }),
    mutableOn(predictionActions.GetContestJoinedUsersSuccessAction, (state, action) => {
        state.actionInProgress = false;
        let joinedUsers : Array<ContestJoinedUsers> = _.cloneDeep(action.users);
        joinedUsers.sort((a,b)=> a.currentRank - b.currentRank);
        let index = _.findIndex(joinedUsers, (e : ContestJoinedUsers) => {
          return e.userId == action.userId;
        }, 0);
        state.contestJoinedUsers = [joinedUsers[index], ...joinedUsers];
    }),
    mutableOn(predictionActions.GetContestJoinedUsersFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
    }),
    mutableOn(predictionActions.SetSelectedContestAction, (state, action) => {
        state.actionInProgress = false;
        state.selectedContest = action.contest;
    }),
    mutableOn(predictionActions.LogoutAction, (state, action) => {
        state.actionInProgress = false;
        state.authenticated = false;
        state.id_token = '';
        state.isUserNameAvailable = false;
        state.password = '';
        state.profile = new Profile();
        window.localStorage.removeItem('six-username');
        window.localStorage.removeItem('six-password');
      }),
      mutableOn(predictionActions.ClearProgressAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = '';
      }),
      mutableOn(predictionActions.ClarUserNameCheckAction, (state, action) => {
        state.userNameCheckInProgress = false;
        state.isUserNameAvailable = false;
        state.errorMessage = '';
      }),
      mutableOn(predictionActions.CheckUserNameRequestAction, (state, action) => {
        state.userNameCheckInProgress = true;
        state.errorMessage = '';
      }),
      mutableOn(predictionActions.CheckUserNameRequestSuccessAction, (state, action) => {
        state.userNameCheckInProgress = false;
        // let isUserNameAvailable = _.includes(action.userNameCheckResult,'User Not Found');
        state.isUserNameAvailable = true;
      }),
      mutableOn(predictionActions.CheckUserNameRequestFailureAction, (state, action) => {
        
        state.userNameCheckInProgress = false;
        state.isUserNameAvailable = false;
        state.errorMessage = action.error;
  
      }),
      mutableOn(predictionActions.ActivationCodeRequestFailureAction, (state, action) => {
        state.userNameCheckInProgress = false;
      }),
      mutableOn(predictionActions.SubmitActivationCodeSuccessAction, (state, action) => {
        state.actionInProgress = false;
        let loginProfile: LoginProfile = Object.assign({}, action.activationCodeSubmitResult);
        state.profile.login = loginProfile;
      }),
      mutableOn(predictionActions.LoginProfileGetSuccessAction, (state, action) => {
        state.actionInProgress = false;
        let loginProfile: LoginProfile = Object.assign({}, action.loginProfile);
        let profile = Object.assign({}, state.profile);
        profile.login = loginProfile;
        state.profile = profile;
      }),
      mutableOn(predictionActions.SaveLoginProfileAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.SaveLoginProfileSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.profile.login = Object.assign({}, action.loginProfile);
      }),
  
      mutableOn(predictionActions.SaveBioProfileAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.LoginProfileGetAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.LoginProfileGetSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.profile.login = Object.assign({}, action.loginProfile);
      }),
  
      mutableOn(predictionActions.LoginProfileGetFailureAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.SaveBioProfileSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.profile.bio = action.bioProfile;
        if(action.bioProfile.userName){
          window.localStorage.setItem('six-username', action.bioProfile.userName);
          window.localStorage.setItem('six-password', state.password);
        }
      }),
      mutableOn(predictionActions.SaveBioProfileFailureAction, (state, action) => {
        state.actionInProgress = false;
      }),
      mutableOn(predictionActions.UpdateBioProfileAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.UpdateBioProfileSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.profile.bio = _.cloneDeep(action.bioProfile);
      }),
      mutableOn(predictionActions.UpdateBioProfileFailureAction, (state, action) => {
        state.actionInProgress = false;
      }),
   
      mutableOn(predictionActions.LoginPreAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.LoginPreNotAuthenticatedAction, (state, action) => {
        state.actionInProgress = false;
        state.authenticated = false;
        let actInfo: SignUpResult = new SignUpResult();
          actInfo.emailId = action.loginResponse.emailId;
          actInfo.status = action.loginResponse.status;
          actInfo.username = action.loginResponse.userName;
  
          state.activationInfo = actInfo;
      }),
      mutableOn(predictionActions.LoginAction, (state, action) => {
          state.actionInProgress = true;
          state.password = action.loginRequest.password
        }),
        mutableOn(predictionActions.LoginSuccessAction, (state, action) => {
          state.actionInProgress = false;
          state.authenticated = true;
          state.id_token = action.loginResponse.jwt;
        }),
        mutableOn(predictionActions.LoginAccountGetAction, (state, action) => {
          state.actionInProgress = true;
        }),
        mutableOn(predictionActions.LoginAccountGetSuccessAction, (state, action) => {
          state.actionInProgress = false;
  
          state.profile = Object.assign({}, state.profile, {
            account:action.account
          });
        }),
        mutableOn(predictionActions.LoginAccountGetFailureAction, (state, action) => {
          state.actionInProgress = false;
        }),
        mutableOn(predictionActions.BioProfileGetAction, (state, action) => {
          state.actionInProgress = true;
        }),
        mutableOn(predictionActions.BioProfileGetErrorAction, (state, action) => {
          state.actionInProgress = false;
        }),
        mutableOn(predictionActions.BioProfileGetSuccessAction, (state, action) => {
          let bioProfile: BioProfile = new BioProfile();
              bioProfile.dob = action.bioProfile.dob;
              bioProfile.firstName = action.bioProfile.firstName;
              bioProfile.gender = action.bioProfile.gender;
              bioProfile.id = action.bioProfile.id;
              bioProfile.imageUrl =  action.bioProfile.imageUrl;
              bioProfile.lastName = action.bioProfile.lastName;
              bioProfile.title = action.bioProfile.title;
              bioProfile.summary = action.bioProfile.summary;
              bioProfile.userId = action.bioProfile.userId;
              bioProfile.userName = action.bioProfile.userName;
  
              state.actionInProgress = false;
              state.profile.bio = bioProfile;
              state.errorMessage = null;
              if(action.bioProfile.userName){
                window.localStorage.setItem('six-username', action.bioProfile.userName);
                window.localStorage.setItem('six-password', state.password);
              }
        }),
  
        mutableOn(predictionActions.LoginErrorAction, (state, action) => {
          state.actionInProgress = false;
          state.errorMessage = action.error;
        }),
        mutableOn(predictionActions.SignUpRequestAction, (state, action) => {
          let actInfo: SignUpResult = new SignUpResult(); // Object.assign({}, state.activationInfo);
            actInfo.emailId = action.registerRequest.email;
  
          state.actionInProgress = true;
          state.activationInfo = actInfo;
        }),
        mutableOn(predictionActions.SignUpRequestSuccessAction, (state, action) => {
          state.actionInProgress = false;
          let actInfo: SignUpResult = Object.assign({}, action.signUpResult);
          state.activationInfo = actInfo;
        }),
        mutableOn(predictionActions.SignUpRequestFailureAction, (state, action) => {
          state.actionInProgress = false;
          state.errorMessage = action.error;
        }),
        mutableOn(predictionActions.LogoutConfirmedAction, (state, action) => {
          state = InitialState;
          window.localStorage.removeItem('six-username');
          window.localStorage.removeItem('six-password');
        }),
        mutableOn(predictionActions.GetPasswordAction, (state, action) => {
          state.actionInProgress = true;
        }),
        mutableOn(predictionActions.GetPasswordSuccessAction, (state, action) => {
          state.actionInProgress = false;
          state.passwordSent = true;
        }),
        mutableOn(predictionActions.GetPasswordFailureAction, (state, action) => {
          state.actionInProgress = false;
          state.errorMessage = action.error;
        }),
      mutableOn(predictionActions.UpdatePredictionAction, (state, action) => {
          state.actionInProgress = true;
          debugger
      }),
      mutableOn(predictionActions.UpdatePredictionSuccessAction, (state, action) => {
          state.actionInProgress = false;
          let index = _.findIndex(state.myPredictions, (e : PredictionInput) => {
            return e.predictionGroup.id == action.prediction.predictionGroup.id;
          }, 0);
          state.myPredictions = [...state.myPredictions.slice(0, index), action.prediction, ...state.myPredictions.slice(index+1)];
      }),
      mutableOn(predictionActions.UpdatePredictionFailureAction, (state, action) => {
          state.actionInProgress = false;
          state.errorMessage = action.error;
      }),
      mutableOn(predictionActions.SetUnreadNotificationCount, (state, action) => {
        state.actionInProgress = false;
        state.notificationCount = action.count;
      }),
      mutableOn(predictionActions.GetMyMatchesAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.GetMyMatchesSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.myLiveMatches = []
        state.myHistoryMatches = []
        state.myUpcomingMatches = []
        action.matches.forEach((e)=>{
          if(e.status == StatusOfMatch.ON_GOING){
            state.myLiveMatches = [...state.myLiveMatches, e];
          }
          else if(e.status == StatusOfMatch.NOT_STARTED){
            state.myUpcomingMatches = [...state.myUpcomingMatches, e];
          }
          else if(e.status == StatusOfMatch.COMPLETED){
            state.myHistoryMatches = [...state.myHistoryMatches, e];
          }
        })
      }),
      mutableOn(predictionActions.GetMyMatchesFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
      }),
      mutableOn(predictionActions.GetMyCoinsAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.GetMyCoinsSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.coins = action.coins;
      }),
      mutableOn(predictionActions.GetMyCoinsFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
      }),
      mutableOn(predictionActions.UnselectPlayersAction, (state, action) => {
        state.actionInProgress = false;
        state.battersList.forEach((e)=>e.isSelected = false);
        state.bowlersList.forEach((e)=>e.isSelected = false);
        state.teamsList.forEach((e)=>e.isSelected = false);
      }),
      mutableOn(predictionActions.GetUnknownUserPredictionsAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.GetUnknownUserPredictionsSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.unknownUserPrediction = action.predictions;
      }),
      mutableOn(predictionActions.GetUnknownUserPredictionsFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
      }),
      mutableOn(predictionActions.GetMatchScoreCardAction, (state, action) => {
        state.actionInProgress = true;
      }),
      mutableOn(predictionActions.GetMatchScoreCardSuccessAction, (state, action) => {
        state.actionInProgress = false;
        state.matchScoreCard = action.score;
      }),
      mutableOn(predictionActions.GetMatchScoreCardFailureAction, (state, action) => {
        state.actionInProgress = false;
        state.errorMessage = action.error;
      }),
)

export function predictionReducer(state: IPredictionStateData | null, action: Action) {
    return reducer(state, action);
  }