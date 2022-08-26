import { createAction, props} from "@ngrx/store";
import { ContestData, CricketMatchHomePageInfo, PlayerData, MatchInfo, TeamData, TeamsPlayerData, CricketPlayerRole, Prediction, PredictionItem, Contest, ContestJoinedUsers, ContestJoinRequest, PredictionInput, Coins, MatchScoreCard } from "./prediction.model";


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

export const MoveMatchToLiveListAction = createAction(
    '[PREDICTION] Move Match To Live List Action',
    props<{date: string, id : string}>()
);

export const GetMatchContestsByMatchIdAction = createAction(
    '[PREDICTION] Get Match Contests By MatchId Action',
    props<{matchId : string, userId : any}>()
);

export const GetMatchContestsByMatchIdSuccessAction = createAction(
    '[PREDICTION] Get Match Contests By MatchId Success Action',
    props<{contest : Array<Contest>}>()
);

export const GetMatchContestsByMatchIdFailureAction = createAction(
    '[PREDICTION] Get Match Contests By MatchId Failure Action',
    props<{error : any}>()
);


export const GetMyMatchContestsAction = createAction(
  '[PREDICTION] Get My Match Contests Action',
  props<{matchId : string, userId : any}>()
);

export const GetMyMatchContestsSuccessAction = createAction(
  '[PREDICTION] Get My Match Contests Success Action',
  props<{contest : Array<Contest>}>()
);

export const GetMyMatchContestsFailureAction = createAction(
  '[PREDICTION] Get My Match Contests Failure Action',
  props<{error : any}>()
);

export const GetMyPredictionsAction = createAction(
  '[PREDICTION] Get My Predictions Action',
  props<{matchId : string, userId : any}>()
);

export const GetMyPredictionsSuccessAction = createAction(
  '[PREDICTION] Get My Predictions Success Action',
  props<{predictionItem : Array<PredictionInput>}>()
);

export const GetMyPredictionsFailureAction = createAction(
  '[PREDICTION] Get My Predictions Failure Action',
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
    props<{prediction : PredictionInput}>()
);

export const SaveMyPredictionSuccessAction = createAction(
    '[PREDICTION] Save My Prediction Success Action',
    props<{prediction : PredictionInput}>()
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
  props<{prediction : PredictionInput}>()
);

export const UpdatePredictionAction = createAction(
    '[PREDICTION] Edit Prediction Action',
    props<{prediction : PredictionInput}>()
);

export const UpdatePredictionSuccessAction = createAction(
  '[PREDICTION] Edit Prediction Action',
  props<{prediction : PredictionInput}>()
);

export const UpdatePredictionFailureAction = createAction(
  '[PREDICTION] Edit Prediction Action',
  props<{error : any}>()
);

export const JoinContestAction = createAction(
    '[PREDICTION] Join Contest Action',
    props<{request : ContestJoinRequest}>()
);

export const JoinContestSuccessAction = createAction(
    '[PREDICTION] Join Contest Success Action',
    props<{contestId : any, response : any}>()
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
    props<{contestId : string, userId : any}>()
);

export const GetContestJoinedUsersSuccessAction = createAction(
    '[PREDICTION] Get Contest Joined Users Success Action',
    props<{users : Array<ContestJoinedUsers>, userId : any}>()
);

export const GetContestJoinedUsersFailureAction = createAction(
    '[PREDICTION] Get Contest Joined Users Failure Action',
    props<{error : any}>()
);

export const SetSelectedContestAction = createAction(
    '[PREDICTION] Set Selected contest Action',
    props<{contest : Contest}>()
);

export const UnselectPlayersAction = createAction(
  '[PREDICTION] Unselect players Action',
);

export const SetUnreadNotificationCount = createAction(
  '[PREDICTION] Set UnreadNotificationCount',
  props<{count: number}>()
);

export const SetTabChangeAction = createAction(
  '[PREDICTION] Set Tab Change',
  props<{home: boolean}>()
);


export const GetMyMatchesAction = createAction(
  '[PREDICTION] Get My Matches Action',
  props<{userId : string}>()
);

export const GetMyMatchesSuccessAction = createAction(
  '[PREDICTION] Get My Matches Success Action',
  props<{matches : Array<MatchInfo>}>()
);

export const GetMyMatchesFailureAction = createAction(
  '[PREDICTION] Get My Matches Failure Action',
  props<{error : any}>()
);

export const GetMyCoinsAction = createAction(
  '[PREDICTION] Get My Coins Action',
  props<{userId : string}>()
);

export const GetMyCoinsSuccessAction = createAction(
  '[PREDICTION] Get My Coins Success Action',
  props<{coins : Coins}>()
);

export const GetMyCoinsFailureAction = createAction(
  '[PREDICTION] Get My Coins Failure Action',
  props<{error : any}>()
);

export const GetUnknownUserPredictionsAction = createAction(
  '[PREDICTION] Get Unknown User Predictions Action',
  props<{groupId : string}>()
);

export const GetUnknownUserPredictionsSuccessAction = createAction(
  '[PREDICTION] Get Unknown User Predictions Success Action',
  props<{predictions : PredictionInput}>()
);

export const GetUnknownUserPredictionsFailureAction = createAction(
  '[PREDICTION] Get Unknown User Predictions Failure Action',
  props<{error : any}>()
);

export const GetMatchScoreCardAction = createAction(
  '[PREDICTION] Get Match Score Card Action',
  props<{matchId : string}>()
);

export const GetMatchScoreCardSuccessAction = createAction(
  '[PREDICTION] Get Match Score Card Success Action',
  props<{score : MatchScoreCard}>()
);

export const GetMatchScoreCardFailureAction = createAction(
  '[PREDICTION] Get Match Score Card Failure Action',
  props<{error : any}>()
);



// -------------------------------------------------------------- auth actions ------------------------------------------------

import { SignUpRequest, SignUpResult, BioProfile, LoginRequest, Account,
    LoginResponse, Profile, ActivationCodeRequest, ActivationCodeRequestResult, ActivationCodeSubmitRequest, ActivationCodeSubmitResult,
    PasswordRequest, PasswordResult, CheckUserNameRequest, CheckUserNameResult, LoginProfile, 
    GetBioProfileRequest, BioProfileAddRequest, SignUpJHRequest, LoginProfileUpdateRequest, RegisterRequest, 
    GetLoginProfileRequest
     } from './auth/model';

export const LoginScreenShowAction = createAction(
    '[Auth] -LOGIN Screen Show Requested-'
);

export const LoginRedirectAction = createAction(
  '[Auth] -LOGIN Redirect-'
);

export const LogoutScreenShowAction = createAction(
  '[Auth] -LOGOUT Screen Show-'
);


export const LogoutAction = createAction(
  '[Auth] -LOGOUT Requested-'
);

export const LogoutSuccessAction = createAction(
  '[Auth] -LOGOUT Success-',
  props<{  payload: any }>()
);

export const LogoutErrorAction = createAction(
  '[Auth] -LOGOUT Error-',
   props<{  payload: any }>()
);

export const LogoutConfirmRequestedAction = createAction(
  '[Auth] -LOGOUT COnfirmation Requested-'
);

export const LogoutConfirmedAction = createAction(
  '[Auth] -LOGOUT Confirmed-'
);

export const LogoutCancelledAction  = createAction(
  '[Auth] -LOGOUT Cancelled-'
);

export const ClarUserNameCheckAction = createAction(
  '[Auth] -CLEAR User Name Check-'
);


/* API Actions */

export const LoginPreAction  = createAction(
  '[Auth] -LOGIN Pre Requested-',
  props<{ loginRequest: LoginRequest }>()
);

export const LoginPreAuthenticatedAction  = createAction(
  '[Auth] -LOGIN Request Pre Authenticated Action-',
  props<{ loginResponse: any}>()
);

export const LoginPreNotAuthenticatedAction  = createAction(
  '[Auth] -LOGIN Request Pre Not Authenticated-',
  props<{ loginResponse: SignUpResult}>()
);


export const LoginPreErrorAction  = createAction(
  '[Auth] -LOGIN Request Pre Error-',
  props<{ loginRError: any }>()
);



export const LoginAction  = createAction(
    '[Auth] -LOGIN Requested-',
    props<{ loginRequest: LoginRequest }>()
);

export const LoginSuccessAction  = createAction(
  '[Auth] -LOGIN Request Success-',
  props<{ loginResponse: any ,loginRequest : LoginRequest}>()
);

export const LoginErrorAction  = createAction(
  '[Auth] -LOGIN Request Error-',
  props<{  error: any }>()
);


export const SignUpRequestAction  = createAction(
  '[Auth] -SIGNUP Request-',
   props<{  registerRequest: RegisterRequest}>()
);

export const SignUpRequestSuccessAction  = createAction(
  '[Auth] -SIGNUP Success-',
  props<{ signUpResult: any }>()
);

export const SignUpRequestFailureAction  = createAction(
  '[Auth] -SIGNUP Error-',
  props<{  error: any }>()
);


export const CheckUserNameRequestAction = createAction(
  '[Auth] -CHECK_USER_NAME Request-',
  props<{ userNameRequest: CheckUserNameRequest }>()
);

export const CheckUserNameRequestSuccessAction  = createAction(
  '[Auth] -CHECK_USER_NAME Request Success-',
  props<{ userNameCheckResult: string }>()
);

export const CheckUserNameRequestFailureAction  = createAction(
  '[Auth] -CHECK_USER_NAME Request Failure-',
  props<{  error: any }>()
);

export const ActivationCodeRequestAction   = createAction(
  '[Auth] -REQUEST_ACTIVATION_CODE-',
  props<{ activationCodeRequest: ActivationCodeRequest }>()
);

export const ActivationCodeRequestSuccessAction  = createAction(
  '[Auth] -REQUEST_ACTIVATION_CODE Success-',
  props<{ activationCodeRequestResult: ActivationCodeRequestResult }>()

);

export const ActivationCodeRequestFailureAction  = createAction(
  '[Auth] -REQUEST_ACTIVATION_CODE Error-',
  props<{  error: any }>()
);

export const SubmitActivationCodeAction  = createAction(
  '[Auth] -SUBMIT_ACTIVATION_CODE-',
  props<{ activationCodeSubmitRequest: ActivationCodeSubmitRequest}>()
);

export const SubmitActivationCodeSuccessAction  = createAction(
  '[Auth] -SUBMIT_ACTIVATION_CODE Success-',
  props<{ activationCodeSubmitResult: LoginProfile}>()
);

export const SubmitActivationCodeFailureAction  = createAction(
  '[Auth] -SUBMIT_ACTIVATION_CODE Error-',
  props<{  error: any }>()
);


export const GetPasswordAction  = createAction(
  '[Auth] -Get Password Profile -',
  props<{ passwordRequest: PasswordRequest}>()
);

export const GetPasswordSuccessAction  = createAction(
  '[Auth] -Get Password Profile Success-',
  props<{ passwordResult: PasswordResult}>()
);

export const GetPasswordFailureAction  = createAction(
  '[Auth] -Get Password Profile Failure-',
  props<{  error: any }>()
);

export const LoginAccountGetAction  = createAction(
  '[Auth] -Login LoginAccountGetAction -',
  props<{ loginProfileRequest: GetLoginProfileRequest}>()
);

export const  LoginAccountGetSuccessAction = createAction(
  '[Auth] -Login LoginAccountGetSuccessAction-',
  props<{ account: any}>()
);

export const  LoginAccountGetFailureAction = createAction(
  '[Auth] -Login LoginAccountGetFailureAction-',
  props<{  error: any }>()
);

export const LoginProfileGetAction  = createAction(
  '[Auth] -Login Profile Get Action -',
  props<{ userName: string}>()
);

export const LoginProfileGetSuccessAction = createAction(
  '[Auth] -Login Profile Get Success-',
  props<{ loginProfile: LoginProfile}>()
);

export const LoginProfileGetFailureAction = createAction(
  '[Auth] -Login Profile Get Failure-',
  props<{  error: any }>()
);

export const SaveLoginProfileAction = createAction(
  '[Auth] -Save Login Profile -',
  props<{ loginProfile: LoginProfileUpdateRequest}>()
);

export const SaveLoginProfileSuccessAction = createAction(
  '[Auth] -Save Login Profile Success-',
  props<{ loginProfile: LoginProfile}>()
);

export const SaveLoginProfileFailureAction = createAction(
  '[Auth] -Save Login Profile Failure-',
  props<{  error: any }>()
);

export const UpdateLoginProfileAction = createAction(
  '[Auth] -Update Login Profile -',
  props<{ loginProfile: LoginProfile}>()
);

export const UpdateLoginProfileSuccessAction = createAction(
  '[Auth] -Update Login Profile Success-',
  props<{ loginProfile: LoginProfile}>()
);

export const UpdateLoginProfileFailureAction = createAction(
  '[Auth] -Update Login Profile Failure-',
  props<{  error: any }>()
);

export const ClearProgressAction  = createAction(
  '[Auth] -LOGIN ClearProgressAction-',
);

export const BioProfileGetAction  = createAction(
  '[Auth] -LOGIN Bio Profile Get Request-',
  props<{ userName: string }>()
);

export const BioProfileGetSuccessAction  = createAction(
'[Auth] -LOGIN Bio Profile Get Request Success-',
props<{ bioProfile:BioProfile }>()
);

export const BioProfileGetErrorAction  = createAction(
'[Auth] -LOGIN Bio Profile Get Request Error-',
props<{  error: any }>()
);

export const SaveBioProfileAction  = createAction(
  '[Auth] -Save Bio Profile -',
  props<{ bioProfile: BioProfileAddRequest}>()
);

export const SaveBioProfileSuccessAction = createAction(
  '[Auth] -Save Bio Profile Success-',
  props<{ bioProfile: BioProfile}>()
);

export const SaveBioProfileFailureAction = createAction(
  '[Auth] -Save Bio Profile Failure-',
  props<{  error: any }>()
)

export const UpdateBioProfileAction  = createAction(
  '[Auth] -Update Bio Profile -',
  props<{ bioProfile: BioProfileAddRequest}>()
);

export const UpdateBioProfileSuccessAction = createAction(
  '[Auth] -Update Bio Profile Success-',
  props<{ bioProfile: BioProfile}>()
);

export const UpdateBioProfileFailureAction = createAction(
  '[Auth] -Update Bio Profile Failure-',
  props<{  error: any }>()
)




