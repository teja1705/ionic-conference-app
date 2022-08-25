import {
    createFeatureSelector,
    createSelector,
  } from '@ngrx/store';

import * as fromPredictionReducer from './prediction.reducer';
import { PredictionState } from './prediction.state';
import { IPredictionStateData } from './prediction.model';

export const selectPredictionState = (state : PredictionState) => state.prediction;


export const selectActionInProgress = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.actionInProgress
  );

export const selectHomePageUpcomingMatches = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.upcomingMatchesHomepage
  );

export const selectHomePageLiveMatches = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.liveMatchesHomepage
  );

export const selectHomePageHistoryMatches = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.historyMatchesHomepage
);

export const selectMatchContests = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.matchContests
);


export const selectSelectedPlayer = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.selectedPlayer
);

export const selectSelectedTeam = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.selectedTeam
);

export const selectSelectedMatch = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.selectedMatch
);

export const selectBattersList = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.battersList
);

export const selectBowlersList = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.bowlersList
);

export const selectTeamsList = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.teamsList
);

export const selectSelectedPrediction = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.selectedPrediction
);

export const selectCreatePrediction = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.createPrediction
);

export const selectPredictionSet = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.predictionSet
);

export const selectContestMetaData = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.contestMetaData
);

export const selectMyPredictions = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.myPredictions
);

export const selectMyContests = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.mycontests
);

export const selectSelectedPredictionItem = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.selectedPredictionItem
);

export const selectContestJoinedUsers = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.contestJoinedUsers
);

export const selectSelectedContest = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.selectedContest
);

export const getAuthorizationIsLoading = createSelector( 
  selectPredictionState, 
  (state: IPredictionStateData) => state.actionInProgress
  );

export const getUserAccountProfile = createSelector( 
  selectPredictionState, 
  (state: IPredictionStateData) => state.profile.account
  );

export const getUserProfile = createSelector( 
  selectPredictionState,
  (state: IPredictionStateData) => state.profile
);
export const getUserBioProfile = createSelector( 
  selectPredictionState,
  (state: IPredictionStateData) => state.profile.bio
);
export const getUserNameCheckAvailable = createSelector(
  selectPredictionState, 
  (state: IPredictionStateData) => state.isUserNameAvailable
 );
 export const getUserNameCheckInProgress = createSelector(
  selectPredictionState, 
  (state: IPredictionStateData) => state.userNameCheckInProgress
 );

export const getIsAuthenticated = createSelector( 
  selectPredictionState,
  (state: IPredictionStateData) => (state.authenticated)
  );

export const getActivationInfo = createSelector( 
  selectPredictionState, 
  (state: IPredictionStateData) => state.activationInfo
  );

export const getIsPasswordSent = createSelector( 
  selectPredictionState, 
  (state: IPredictionStateData) =>  state.passwordSent);

  export const notificationCount = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.notificationCount
  );

  export const getMyUpcomingMathces = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.myUpcomingMatches
  );

  export const getMyLiveMatches = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.myLiveMatches
  );

  export const getMyHistoryMatches = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.myHistoryMatches
  );

  export const getMyCoins = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.coins
  );

  export const getUnknownUserPrediction = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.unknownUserPrediction
  );

  export const getMatchScoreCard = createSelector(
    selectPredictionState,
    (state: IPredictionStateData) => state.matchScoreCard
  );
