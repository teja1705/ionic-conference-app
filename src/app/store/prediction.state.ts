import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPredictionModel from './prediction.model';
import * as fromPredictionReducer from './prediction.reducer';

export interface PredictionState {
  prediction: fromPredictionModel.IPredictionStateData;
}

export const reducers: ActionReducerMap<PredictionState> = {
  prediction: fromPredictionReducer.predictionReducer
};
