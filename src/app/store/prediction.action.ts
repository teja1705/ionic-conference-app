import { createAction, props} from "@ngrx/store";
import { CricketMatchHomePageInfo } from "./prediction.model";


export const SetActionInProgressAction = createAction(
    '[PREDICTION] Set Action In Progress',
    props<{inProgress: boolean}>()
);

export const GetHomePageUpcomingMatchesAction = createAction(
    '[PREDICTION] Get Home Page Upcoming Matches Action',
    props<{sport: string}>()
);

export const GetHomePageUpcomingMatchesSuccessAction = createAction(
    '[PREDICTION] Get Home Page Upcoming Matches Success Action',
    props<{sport : string,details : Array<CricketMatchHomePageInfo>}>()
);

export const GetHomePageUpcomingMatchesFailureAction = createAction(
    '[PREDICTION] Get Home Page Upcoming Matches Failure Action',
    props<{error : any}>()
);

export const GetHomePageLiveMatchesAction = createAction(
    '[PREDICTION] Get Home Page Live Matches Action',
    props<{sport: string}>()
);

export const GetHomePageLiveMatchesSuccessAction = createAction(
    '[PREDICTION] Get Home Page Live Matches Success Action',
    props<{sport : string,details : Array<CricketMatchHomePageInfo>}>()
);

export const GetHomePageLiveMatchesFailureAction = createAction(
    '[PREDICTION] Get Home Page Live Matches Failure Action',
    props<{error : any}>()
);

export const GetHomePageHistoryMatchesAction = createAction(
    '[PREDICTION] Get Home Page History Matches Action',
    props<{sport: string}>()
);

export const GetHomePageHistoryMatchesSuccessAction = createAction(
    '[PREDICTION] Get Home Page History Matches Success Action',
    props<{sport : string,details : Array<CricketMatchHomePageInfo>}>()
);

export const GetHomePageHistoryMatchesFailureAction = createAction(
    '[PREDICTION] Get Home Page History Matches Failure Action',
    props<{error : any}>()
);