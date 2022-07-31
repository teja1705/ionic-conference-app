import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromPredictionState from './prediction.state';
import * as fromPredictionAction from './prediction.action';
import * as fromPredictionSelectors from './prediction.selector';




@Injectable({ providedIn: 'root' })
export class PredictionStoreFacade {

  constructor(private store: Store<fromPredictionState.PredictionState>) {}

  actionInProgress$ = this.store.pipe(select(fromPredictionSelectors.selectActionInProgress));
  homePageUpcomingMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageUpcomingMatches));
  homePageLiveMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageLiveMatches));
  homePageHistoryMatches$ = this.store.pipe(select(fromPredictionSelectors.selectHomePageHistoryMatches));


  setActionInProgress(){
    this.store.dispatch(fromPredictionAction.SetActionInProgressAction({inProgress: true}));
  }

  getHomePageUpcomingMatches(){
    this.store.dispatch(fromPredictionAction.GetHomePageUpcomingMatchesAction({sport: "CRICKET"}));
  }

  getHomePageLiveMatches(){
    this.store.dispatch(fromPredictionAction.GetHomePageLiveMatchesAction({sport: "CRICKET"}));
  }

  getHomePageHistoryMatches(){
    this.store.dispatch(fromPredictionAction.GetHomePageHistoryMatchesAction({sport: "CRICKET"}));
  }

}