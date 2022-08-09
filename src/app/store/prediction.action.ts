import { createAction, props} from "@ngrx/store";
import { ContestData, CricketMatchHomePageInfo, PlayerData, MatchInfo, TeamData, TeamsPlayerData, CricketPlayerRole, Prediction, PredictionItem, Contest, ContestJoinedUsers } from "./prediction.model";


export const SetActionInProgressAction = createAction(
    '[PREDICTION] Set Action In Progress',
    props<{inProgress: boolean}>()
);

export const GetHomePageUpcomingMatchesAction = createAction(
    '[PREDICTION] Get Home Page Upcoming Matches Action',
    props<{sport: string, userId : any}>()
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
    props<{sport: string, userId : any}>()
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
    props<{sport: string, userId : any}>()
);

export const GetHomePageHistoryMatchesSuccessAction = createAction(
    '[PREDICTION] Get Home Page History Matches Success Action',
    props<{sport : string,details : Array<CricketMatchHomePageInfo>}>()
);

export const GetHomePageHistoryMatchesFailureAction = createAction(
    '[PREDICTION] Get Home Page History Matches Failure Action',
    props<{error : any}>()
);

export const MoveMatchToLiveListAction = createAction(
    '[PREDICTION] Move Match To Live List Action',
    props<{date: string, id : string}>()
);

export const GetMatchContestsByMatchIdAction = createAction(
    '[PREDICTION] Get Match Contests By MatchId Action',
    props<{matchId : string}>()
);

export const GetMatchContestsByMatchIdSuccessAction = createAction(
    '[PREDICTION] Get Match Contests By MatchId Success Action',
    props<{contest : ContestData}>()
);

export const GetMatchContestsByMatchIdFailureAction = createAction(
    '[PREDICTION] Get Match Contests By MatchId Failure Action',
    props<{error : any}>()
);

export const GetMatchPlayersListAction = createAction(
    '[PREDICTION] Get Match Players List Action',
    props<{matchId : string}>()
);

export const GetMatchPlayersListSuccessAction = createAction(
    '[PREDICTION] Get Match Players List Success Action',
    props<{playersList : TeamsPlayerData}>()
);

export const GetMatchPlayersListFailureAction = createAction(
    '[PREDICTION] Get Match Players List Failure Action',
    props<{error : any}>()
);

export const SetSelectedPlayerAction = createAction(
    '[PREDICTION] Set Selected Player Action',
    props<{player : PlayerData}>()
);

export const SetSelectedTeamAction = createAction(
    '[PREDICTION] Set Selected Team Action',
    props<{team : TeamData}>()
);

export const SetSelectedMatchAction = createAction(
    '[PREDICTION] Set Selected Match Action',
    props<{match : MatchInfo}>()
);

export const TogglePlayerSelectionAction = createAction(
    '[PREDICTION] Toggle Player Selection Action',
    props<{id : any, role : CricketPlayerRole}>()
);

export const RemovePlayerFromPredictionListAction = createAction(
    '[PREDICTION] Remove Player From PredictionList Action',
    props<{id : any, role : CricketPlayerRole}>()
);

export const SetSelectedPredictionAction = createAction(
    '[PREDICTION] Set Selected Prediction Action',
    props<{prediction : Prediction}>()
);

export const CreatePredictionItemAction = createAction(
    '[PREDICTION] Create Prediction Item Action',
    props<{prediction : PredictionItem}>()
);

export const SetPredictionListAction = createAction(
    '[PREDICTION] Set Prediction List Action',
    props<{prediction : Array<Prediction>}>()
);

export const PushPredictionToListAction = createAction(
    '[PREDICTION] Push Prediction to List Action',
    props<{prediction : Prediction}>()
);

export const PopPredictionFromListAction = createAction(
    '[PREDICTION] Pop Prediction from List Action',
    props<{id : any, role : CricketPlayerRole}>()
);

export const UpdatePredictionInListAction = createAction(
    '[PREDICTION] Update Prediction in List Action',
    props<{prediction : Prediction, role : CricketPlayerRole}>()
);

export const SaveMyPredictionAction = createAction(
    '[PREDICTION] Save My Prediction Action',
    props<{prediction : PredictionItem}>()
);

export const SaveMyPredictionSuccessAction = createAction(
    '[PREDICTION] Save My Prediction Success Action',
    props<{prediction : PredictionItem}>()
);

export const SaveMyPredictionFailureAction = createAction(
    '[PREDICTION] Save My Prediction Failure Action',
    props<{error : any}>()
);

export const DeletePredictionAction = createAction(
    '[PREDICTION] Delete Prediction Action',
    props<{predictionGroupId : any}>()
);

export const DeletePredictionSuccessAction = createAction(
    '[PREDICTION] Delete Prediction SuccessAction',
    props<{predictionGroupId : any}>()
);

export const DeletePredictionFailureAction = createAction(
    '[PREDICTION] Delete Prediction Failure Action',
    props<{error : any}>()
);

export const EditPredictionAction = createAction(
    '[PREDICTION] Edit Prediction Action',
    props<{prediction : PredictionItem}>()
);

export const JoinContestAction = createAction(
    '[PREDICTION] Join Contest Action',
    props<{prediction : PredictionItem}>()
);

export const JoinContestSuccessAction = createAction(
    '[PREDICTION] Join Contest Success Action',
    props<{prediction : PredictionItem}>()
);

export const JoinContestFailureAction = createAction(
    '[PREDICTION] Join Contest Failure Action',
    props<{error : any}>()
);

export const SetContesttoMyContestAction = createAction(
    '[PREDICTION] Set Contest to My Contest Action',
    props<{contest : Contest}>()
);

export const GetContestJoinedUsersAction = createAction(
    '[PREDICTION] Get Contest Joined Users Action',
    props<{contestId : string}>()
);

export const GetContestJoinedUsersSuccessAction = createAction(
    '[PREDICTION] Get Contest Joined Users Success Action',
    props<{users : Array<ContestJoinedUsers>}>()
);

export const GetContestJoinedUsersFailureAction = createAction(
    '[PREDICTION] Get Contest Joined Users Failure Action',
    props<{error : any}>()
);

export const SetSelectedContestAction = createAction(
    '[PREDICTION] Set Selected contest Action',
    props<{contest : Contest}>()
);