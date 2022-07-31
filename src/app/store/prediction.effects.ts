import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError, tap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of, empty, Observable } from 'rxjs';
import { Location } from '@angular/common';
import * as _ from 'lodash';

import { act, Actions, Effect, ofType } from '@ngrx/effects';

import * as predictionActions from './prediction.action';
import { PredictionService } from './prediction.service';
import { PredictionStoreFacade } from './prediction-store.facade';
import { AppConstants } from '../providers/app-constants.service';


@Injectable()
export class PredictionEffects {

  constructor(
    private predictionService: PredictionService,
    private actions$: Actions,
    private appConstants: AppConstants,
    private predictionFacade: PredictionStoreFacade,
    private location: Location,
    private router : Router,
  ) {}


  @Effect()
  getHomePageUpcomingMatches$ = this.actions$
    .pipe(ofType(predictionActions.GetHomePageUpcomingMatchesAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getHomePageUpcomingMatches().pipe(
          switchMap( matches => [
            predictionActions.GetHomePageUpcomingMatchesSuccessAction({details : matches, sport : action.sport})
          ]),
          catchError(error => of(predictionActions.GetHomePageUpcomingMatchesFailureAction(error)))
        );
      })
  );

  @Effect()
  getHomePageLiveMatches$ = this.actions$
    .pipe(ofType(predictionActions.GetHomePageLiveMatchesAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getHomePageLiveMatches().pipe(
          switchMap( matches => [
            predictionActions.GetHomePageLiveMatchesSuccessAction({details : matches, sport : action.sport})
          ]),
          catchError(error => of(predictionActions.GetHomePageLiveMatchesFailureAction(error)))
        );
      })
  );

  @Effect()
  getHomePageHistoryMatches$ = this.actions$
    .pipe(ofType(predictionActions.GetHomePageHistoryMatchesAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getHomePageHistoryMatches().pipe(
          switchMap( matches => [
            predictionActions.GetHomePageHistoryMatchesSuccessAction({details : matches, sport : action.sport})
          ]),
          catchError(error => of(predictionActions.GetHomePageHistoryMatchesFailureAction(error)))
        );
      })
  );
    }

export const effects: any[] = [PredictionEffects];
