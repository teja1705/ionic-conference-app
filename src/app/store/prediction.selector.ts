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
