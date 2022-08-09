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

export const selectTeamVsTeam = createSelector(
  selectPredictionState,
  (state: IPredictionStateData) => state.match
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