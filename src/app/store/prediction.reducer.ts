export const courseFeatureKey = 'prediction';

import { Action, createReducer } from '@ngrx/store';
import { CricketMatchHomePageInfo, IPredictionStateData } from './prediction.model';
import * as predictionActions from './prediction.action';
import {mutableOn} from 'ngrx-etc';


export const InitialState : IPredictionStateData = {
    actionInProgress : false,
    upcomingMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    liveMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
    historyMatchesHomepage : new Array<CricketMatchHomePageInfo>(),
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
)

export function predictionReducer(state: IPredictionStateData | null, action: Action) {
    return reducer(state, action);
  }