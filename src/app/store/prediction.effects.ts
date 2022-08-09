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
        return this.predictionService.getHomePageUpcomingMatches(action.userId).pipe(
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
        return this.predictionService.getHomePageLiveMatches(action.userId).pipe(
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
        return this.predictionService.getHomePageHistoryMatches(action.userId).pipe(
          switchMap( matches => [
            predictionActions.GetHomePageHistoryMatchesSuccessAction({details : matches, sport : action.sport})
          ]),
          catchError(error => of(predictionActions.GetHomePageHistoryMatchesFailureAction(error)))
        );
      })
  );

  @Effect()
  getMatchContests$ = this.actions$
    .pipe(ofType(predictionActions.GetMatchContestsByMatchIdAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMatchContestData(action.matchId).pipe(
          switchMap( contest => [
            predictionActions.GetMatchContestsByMatchIdSuccessAction({contest : contest})
          ]),
          catchError(error => of(predictionActions.GetMatchContestsByMatchIdFailureAction(error)))
        );
      })
  );

  @Effect()
  getMatchPlayers$ = this.actions$
    .pipe(ofType(predictionActions.GetMatchPlayersListAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMatchPlayersData(action.matchId).pipe(
          switchMap( players => [
            predictionActions.GetMatchPlayersListSuccessAction({playersList : players})
          ]),
          catchError(error => of(predictionActions.GetMatchPlayersListFailureAction(error)))
        );
      })
  );

  @Effect()
  getContestUsers$ = this.actions$
    .pipe(ofType(predictionActions.GetContestJoinedUsersAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getContestUsers(action.contestId).pipe(
          switchMap( users => [
            predictionActions.GetContestJoinedUsersSuccessAction({users : users})
          ]),
          catchError(error => of(predictionActions.GetContestJoinedUsersFailureAction(error)))
        );
      })
  );
    }

export const effects: any[] = [PredictionEffects];
