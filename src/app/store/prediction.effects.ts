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
import { SignUpResult, CheckUserNameRequest, CheckUserNameResult,
  LoginProfile, BioProfile, GetBioProfileRequest, Account, GetLoginProfileRequest, LoginResponse, LoginRequest, ReceivedNotification } from './auth/model';
import { AuthService } from './auth/auth.service';
import { ToastController } from '@ionic/angular';
import { Action } from '@ngrx/store';
import { ToastControllerService } from '../providers/toast-controller.service';
import { TrackerService } from '../providers/websocket/tracker.service';
import { YeaNotificationService } from '../providers/websocket/notification.service';


@Injectable()
export class PredictionEffects {

  public loginCred: LoginRequest;

  constructor(
    private predictionService: PredictionService,
    private actions$: Actions,
    private appConstants: AppConstants,
    private predictionFacade: PredictionStoreFacade,
    private location: Location,
    private router : Router,
    private _authService : AuthService,
    private toastCtrlService : ToastControllerService,
    private trackerService : TrackerService,
    private yeaNotificationService : YeaNotificationService
  ) {
    this.loginCred = new LoginRequest();
  }

  @Effect()
    loginPre$: Observable<Action> = this.actions$
      .pipe(ofType(predictionActions.LoginPreAction))
      .pipe(
        switchMap(auth => {
          this.loginCred = Object.assign({}, auth.loginRequest);
          return this._authService.signInPre(auth.loginRequest).pipe(
            map( (loginResponse) =>
              {
                
                console.log(' Response  == ' + loginResponse.status);
                if(_.includes(loginResponse.status,'not-activated')){
                console.log(' Response 1 == ' + loginResponse.status);

                return predictionActions.LoginPreNotAuthenticatedAction({loginResponse});
                }else{
                  console.log(' Response 2  == ' + loginResponse.status);

                return predictionActions.LoginAction({loginRequest: this.loginCred});
                }
              }),
            catchError(error => of(predictionActions.LoginPreErrorAction({loginRError: error})))
          );
        })
      );

    @Effect({ dispatch: false })
    loginPreError$ = this.actions$.pipe(
      ofType(predictionActions.LoginPreErrorAction))
      .pipe(
        switchMap( (response) => [
          this.toastCtrlService.toastMessage('Your Login Failed - ' + response?.loginRError?.error, 2500, 'danger')
        ]),
    );

    @Effect()
    login$ = this.actions$
      .pipe(ofType(predictionActions.LoginAction))
      .pipe(
        switchMap(auth => {
          let loginProfileRequest: GetLoginProfileRequest = new GetLoginProfileRequest();
          loginProfileRequest.username = auth.loginRequest.username;
          let bioProfileRequest: GetBioProfileRequest = new GetBioProfileRequest();
          bioProfileRequest.username = auth.loginRequest.username;
          // alert(auth.loginRequest.email + ' === ' + auth.loginRequest.password );
          return this._authService.signIn(auth.loginRequest).pipe(
            // map(token => predictionActions.LoginSuccessAction(token)),
            switchMap( loginResponse => [
              predictionActions.LoginSuccessAction({loginResponse : loginResponse,loginRequest: auth.loginRequest}),
              predictionActions.LoginAccountGetAction({loginProfileRequest}),
            ]),
            catchError(error => of(predictionActions.LoginErrorAction(error)))
          );
        })
      );

    @Effect()
    getLoginAccount$ = this.actions$
      .pipe(ofType(predictionActions.LoginAccountGetAction))
      .pipe(
        switchMap(action => {
          // this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Wait Signing in..</span>`});
          return this._authService.getAccountProfile().pipe(
            switchMap((account:Account) =>
            [
              predictionActions.LoginProfileGetAction({userName: account.id}),
              predictionActions.BioProfileGetAction({userName: account.id }),
              predictionActions.GetMyCoinsAction({userId : account.id}),
              predictionActions.LoginAccountGetSuccessAction({account: account}),
            ]),
            catchError(error => of(predictionActions.LoginAccountGetFailureAction(error)))
          );
        })
      );

      @Effect()
      getLoginProfile$ = this.actions$
        .pipe(ofType(predictionActions.LoginProfileGetAction))
        .pipe(
          switchMap(action => {
            return this._authService.getLoginProfile(action.userName).pipe(
              switchMap((loginProfile:LoginProfile) =>
              [
                predictionActions.LoginProfileGetSuccessAction({loginProfile: loginProfile}),
              ]),
              catchError(error => of(predictionActions.LoginAccountGetFailureAction(error)))
            );
          })
        );
  


  @Effect({ dispatch: false })
  loginPreSuccess$ = this.actions$.pipe(
    ofType(predictionActions.LoginPreNotAuthenticatedAction))
    .pipe(
      switchMap( (response) => [
        this.toastCtrlService.toastMessage('Your Account not Activated Please activate', 2500, 'danger'),
        this.router.navigateByUrl('/activate')
      ]),

  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(predictionActions.LoginSuccessAction))
    .pipe(
        tap((action) => {
          if(action.loginResponse.id_token){
            window.localStorage.setItem('six-authToken', action.loginResponse.id_token);
            window.localStorage.setItem('six-username', action.loginRequest.username);
            window.localStorage.setItem('six-password', action.loginRequest.password);
            this.appConstants.JWT_TOKEN = action.loginResponse.id_token;
            // this.userService.login('loggedin');
            
            this.trackerService.unsubscribe();
            this.trackerService.unsubscribeUser();
            this.trackerService.connect(this.appConstants.JWT_TOKEN);
            this.trackerService.userSubscribe();
             this.trackerService.userReceive().subscribe((activity: ReceivedNotification) => {
              console.log(activity);
              this.yeaNotificationService.single_notification(activity.message);
            });
            this.trackerService.subscribe();
            this.trackerService.receive().subscribe((activity: ReceivedNotification) => {
              console.log(activity);
              this.yeaNotificationService.single_notification(activity.message);
            });
          }else{
            /* Not Active Case */
            this.router.navigateByUrl('/login');
          }
      }));

    @Effect({ dispatch: false })
    loginError$ = this.actions$.pipe(
    ofType(predictionActions.LoginErrorAction))
    .pipe(tap(() =>  this.router.navigateByUrl('/app-home')));

    
    @Effect()
    signUp$ : Observable<Action>= this.actions$
      .pipe(ofType(predictionActions.SignUpRequestAction))
      .pipe(
        map((action) => action.registerRequest),
        switchMap(registerRequest => {
          return this._authService.signUp(registerRequest).pipe(
            map((signUpResult: any) =>
            {
              if(signUpResult){
                return predictionActions.SignUpRequestSuccessAction({signUpResult});
              }else{
                this.toastCtrlService.toastMessage('Signup Failed Please try again', 2500, 'danger');
                return predictionActions.SignUpRequestFailureAction(signUpResult.responeMessage);
              }

            },
            catchError(error => of(predictionActions.SignUpRequestFailureAction(error)))
          ));
        })
      );


    @Effect({ dispatch: false })
    signUpSuccess$ = this.actions$
    .pipe(ofType(predictionActions.SignUpRequestSuccessAction))
    .pipe(
      tap(() => {
        console.log('SignUp Success');
        this.router.navigateByUrl('/activate');
      })
    );

    @Effect({dispatch:true})
      checkUserName: Observable<Action>= this.actions$
        .pipe(ofType(predictionActions.CheckUserNameRequestAction))
        .pipe(
          map((action) => action.userNameRequest),
          switchMap(userNameRequest => {
            return this._authService.checkUserName(userNameRequest).pipe(
              map((userNameCheckResult: any) =>
              {
                let isUserNameNotAvailable = _.includes(userNameCheckResult.response,'User Found');
                if(!isUserNameNotAvailable){
                  return predictionActions.CheckUserNameRequestSuccessAction({userNameCheckResult : userNameCheckResult.response});
                }else{
                  this.toastCtrlService.toastMessage('User Name Not Available Please try Different', 2500, 'danger');
                  return predictionActions.CheckUserNameRequestFailureAction({error: userNameCheckResult.response});
                }

              },
              catchError(error => of(predictionActions.SignUpRequestFailureAction(error)))
            ));
          })
        );


    @Effect({ dispatch: false })
    checkUserNameSuccess$ = this.actions$
    .pipe(ofType(predictionActions.CheckUserNameRequestSuccessAction))
    .pipe(
      tap(() => {
        console.log('CHECK_USER_NAME Success');
      })
    );



    @Effect()
    saveLoginProfile$ = this.actions$
      .pipe(ofType(predictionActions.SaveLoginProfileAction))
      .pipe(
        map((action) => action.loginProfile),
        switchMap(loginProfile => {
          return this._authService.saveLoginProfile(loginProfile).pipe(
            map((loginProfile: LoginProfile) => predictionActions.SaveLoginProfileSuccessAction({loginProfile}),
            catchError(error => of(predictionActions.SaveLoginProfileFailureAction(error)))
          ));
        })
      );


    @Effect({ dispatch: false })
    saveLoginProfileSuccess$ = this.actions$
    .pipe(ofType(predictionActions.SaveLoginProfileSuccessAction))
    .pipe(
      tap((action) => {
        this.toastCtrlService.toastMessage('Saved Login Profile', 2500, 'success');
        console.log('SAVE_LOGIN_PROFILE_SUCCESS Success');
      })
    );
      
    @Effect()
    saveBioProfile$ = this.actions$
      .pipe(ofType(predictionActions.SaveBioProfileAction))
      .pipe(
        switchMap(action => {
          return this._authService.saveBioProfile(action.bioProfile).pipe(
            switchMap((bioProfile: BioProfile) =>
            [
              predictionActions.SaveBioProfileSuccessAction({bioProfile: bioProfile}), 
              // predictionActions.LoginProfileGetAction({userName: bioProfile.userName})
            ]),
            catchError(error => of(predictionActions.SaveBioProfileFailureAction(error)))
          );
        })
      );


    @Effect({ dispatch: false })
    saveBioProfileSuccess$ = this.actions$
    .pipe(ofType(predictionActions.SaveBioProfileSuccessAction))
    .pipe(
      tap(async () => {
        this.toastCtrlService.toastMessage('Updated BIO Profile', 2500, 'success');
        this.router.navigateByUrl('/app/tabs/home');
      })
    );

    @Effect()
    logoutConfirmation$ = this.actions$.pipe(
      ofType(predictionActions.LogoutConfirmRequestedAction))
      .pipe(
        switchMap(() =>
                [
                  predictionActions.LogoutAction()
                ]
            ),
        )




    @Effect()
    getBioProfile$ = this.actions$
      .pipe(ofType(predictionActions.BioProfileGetAction))
      .pipe(
        map((action) => action.userName),
        switchMap(userName => {
          // this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Wait Signing in..</span>`});
          return this._authService.getBioProfile(userName).pipe(
            map((bioProfile: BioProfile) => predictionActions.BioProfileGetSuccessAction({bioProfile: 
              {...bioProfile, imageUrl: bioProfile?.imageUrl === 'assets/img/noavatar.png'?bioProfile?.imageUrl:this.appConstants.BASE_AWS_S3_API_URL + bioProfile?.imageUrl }}),
            catchError(error => of(predictionActions.BioProfileGetErrorAction(error)))
          ));
        })
      );


    @Effect({ dispatch: false })
    getBioProfileSuccess$ = this.actions$
    .pipe(ofType(predictionActions.BioProfileGetSuccessAction))
    .pipe(
      tap((action) => {
        
        console.log('GET_BIO_PROFILE_SUCCESS Success');
        if(!action.bioProfile.id){
          this.router.navigate(['/bio-profile']);
        }
        else{
          this.router.navigateByUrl('/app/tabs/home');
        }
      })
    );

    @Effect({ dispatch: false })
    getBioProfileError$ = this.actions$
    .pipe(ofType(predictionActions.BioProfileGetErrorAction))
    .pipe(
      tap(() => {
        
        console.log('GET_BIO_PROFILE_SUCCESS Failure');
       
      })
    );


    @Effect()
    updateBioProfile$ = this.actions$
      .pipe(ofType(predictionActions.UpdateBioProfileAction))
      .pipe(
        switchMap(action => {
          return this._authService.updateBioProfile(action.bioProfile).pipe(
            switchMap((bioProfile: BioProfile) =>
            [
              predictionActions.UpdateBioProfileSuccessAction({bioProfile: 
                {...bioProfile, imageUrl: this.appConstants.BASE_AWS_S3_API_URL + bioProfile.imageUrl }}), 
            ]),
            catchError(error => of(predictionActions.UpdateBioProfileFailureAction(error)))
          );
        })
      );


    @Effect({ dispatch: false })
    updateBioProfileSuccess$ = this.actions$
    .pipe(ofType(predictionActions.UpdateBioProfileSuccessAction))
    .pipe(
      tap(() => {
        this.toastCtrlService.toastMessage('Updated BIO Profile', 2500, 'success');
      })
    );


    @Effect()
    submitActivationCode$ : Observable<Action>= this.actions$
      .pipe(ofType(predictionActions.SubmitActivationCodeAction))
      .pipe(
        map((action) => action.activationCodeSubmitRequest),
        switchMap(activationCodeSubmitRequest => {
          return this._authService.submitActivationCode(activationCodeSubmitRequest).pipe(
            map((activationResult: any) =>
            {
              let isUserActivated = _.includes(activationResult,'User Profile Not Activated');
              if(!isUserActivated){
                return predictionActions.SubmitActivationCodeSuccessAction(activationResult);
              }else{
                this.toastCtrlService.toastMessage('Activation Failed Please Verify Code and try again', 2500, 'danger');
                return predictionActions.SubmitActivationCodeFailureAction(activationResult);
              }

            },
            catchError(error => of(predictionActions.SubmitActivationCodeFailureAction(error)))
          ));
        })
      );



      @Effect({ dispatch: false })
      submitActivationCodeSuccess$ = this.actions$
      .pipe(ofType(predictionActions.SubmitActivationCodeSuccessAction))
      .pipe(
        tap((action) => {
            this.router.navigateByUrl('/login')
            this.toastCtrlService.toastMessage('Activated Accound.. Please login', 2500, 'success');
        })
      );

      @Effect()
      requestActivatiaonCode$ = this.actions$
        .pipe(ofType(predictionActions.ActivationCodeRequestAction))
        .pipe(
          map((action) => action.activationCodeRequest),
          switchMap(activationCodeGetRequest => {
            return this._authService.getActivationCode(activationCodeGetRequest).pipe(
              map(getResult => predictionActions.ActivationCodeRequestSuccessAction(getResult)),
              catchError(error => of(predictionActions.ActivationCodeRequestFailureAction(error)))
            );
          })
        );

        @Effect()
        requestActivationCode$ : Observable<Action>= this.actions$
          .pipe(ofType(predictionActions.ActivationCodeRequestAction))
          .pipe(
            map((action) => action.activationCodeRequest),
            switchMap(activationCodeRequest => {
              return this._authService.getActivationCode(activationCodeRequest).pipe(
                map((activationResult: any) =>
                {
                  this.toastCtrlService.toastMessage('Email Sent with Activation Code Please check and try again', 2500, 'success');
                  return predictionActions.ActivationCodeRequestSuccessAction(activationResult);
                },
                catchError(error => of(predictionActions.ActivationCodeRequestFailureAction(error)))
              ));
            })
          );



        @Effect({ dispatch: false })
        requestActivationCodeSuccess$ = this.actions$
        .pipe(ofType(predictionActions.ActivationCodeRequestSuccessAction))
        .pipe(
          tap((action) => {

            // if(action.activationCodeRequestResult.activationCode){
            //   this.router.navigateByUrl('/account/activate');
            // }else{

            // }
          })
        );


      @Effect()
      getPassword$ = this.actions$
        .pipe(ofType(predictionActions.GetPasswordAction))
        .pipe(
          map((action) => action.passwordRequest),
          switchMap(passwordRequest => {
            return this._authService.getPassword(passwordRequest).pipe(
              map(passwordResult => predictionActions.GetPasswordSuccessAction(passwordResult)),
              catchError(error => of(predictionActions.GetPasswordFailureAction(error)))
            );
          })
        );


      @Effect({ dispatch: false })
      logout$ = this.actions$.pipe(
        ofType(predictionActions.LogoutAction)).
        pipe(
          switchMap(() =>
            this.router.navigateByUrl('/app/tabs/home')
            ),
        );

        @Effect({ dispatch: false })
        loginRedirect$ = this.actions$
          .pipe(ofType(predictionActions.LoginRedirectAction))
          .pipe(
            tap(() => {
              this.router.navigateByUrl('/login');
            })
          );



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

  @Effect()
  getMatchContests$ = this.actions$
    .pipe(ofType(predictionActions.GetMatchContestsByMatchIdAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMatchContests(action.matchId, action.userId).pipe(
          switchMap( contest => [
            predictionActions.GetMatchContestsByMatchIdSuccessAction({contest : contest})
          ]),
          catchError(error => of(predictionActions.GetMatchContestsByMatchIdFailureAction(error)))
        );
      })
  );

  @Effect()
  getMyMatchContests$ = this.actions$
    .pipe(ofType(predictionActions.GetMyMatchContestsAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMyMatchContests(action.matchId, action.userId).pipe(
          switchMap( contest => [
            predictionActions.GetMyMatchContestsSuccessAction({contest : contest})
          ]),
          catchError(error => of(predictionActions.GetMyMatchContestsFailureAction(error)))
        );
      })
  );

  @Effect()
  getMyPredictions$ = this.actions$
    .pipe(ofType(predictionActions.GetMyPredictionsAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMyPredictions(action.matchId, action.userId).pipe(
          switchMap( predictionItem => [
            predictionActions.GetMyPredictionsSuccessAction({predictionItem : predictionItem})
          ]),
          catchError(error => of(predictionActions.GetMyPredictionsFailureAction(error)))
        );
      })
  );

  @Effect()
  joinContest$ : Observable<Action>= this.actions$
    .pipe(ofType(predictionActions.JoinContestAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.joinContest(action.request).pipe(
          map( (res) => {

            if(res.response == "JOINED_SUCCESSFULLY"){
              this.toastCtrlService.toastMessage('Contest Joined Successfully', 2500, 'success');
              return predictionActions.JoinContestSuccessAction({contestId : action.request.contestId,response : res})
            }
            else{
              this.toastCtrlService.toastMessage('Contest is Full. Can not join', 2500, 'danger');
              return predictionActions.GetMatchContestsByMatchIdAction({matchId : action.request.matchId, userId : action.request.userId});
            }
      }),
          catchError(error => of(predictionActions.JoinContestFailureAction(error)))
        );
      })
  );

  @Effect()
  savePrediction$ = this.actions$
    .pipe(ofType(predictionActions.SaveMyPredictionAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.savePrediction(action.prediction).pipe(
          switchMap( response => [
            predictionActions.SaveMyPredictionSuccessAction({prediction : response})
          ]),
          catchError(error => of(predictionActions.SaveMyPredictionFailureAction(error)))
        );
      })
  );

  @Effect()
  deletePrediction$ = this.actions$
    .pipe(ofType(predictionActions.DeletePredictionAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.deletePrediction(action.predictionGroupId).pipe(
          switchMap( response => [
            predictionActions.DeletePredictionSuccessAction({predictionGroupId : action.predictionGroupId})
          ]),
          catchError(error => of(predictionActions.DeletePredictionFailureAction(error)))
        );
      })
  );

  // @Effect()
  // updatePrediction$ = this.actions$
  //   .pipe(ofType(predictionActions.UpdatePredictionAction))
  //   .pipe(
  //     switchMap((action) => {
  //       return this.predictionService.updatePrediction(action.prediction).pipe(
  //         switchMap( response => [
  //           predictionActions.UpdatePredictionSuccessAction({prediction : response})
  //         ]),
  //         catchError(error => of(predictionActions.UpdatePredictionFailureAction(error)))
  //       );
  //     })
  // );

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
            predictionActions.GetContestJoinedUsersSuccessAction({users : users, userId : action.userId})
          ]),
          catchError(error => of(predictionActions.GetContestJoinedUsersFailureAction(error)))
        );
      })
  );

  @Effect()
  getMyMatches$ = this.actions$
    .pipe(ofType(predictionActions.GetMyMatchesAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMyMatches(action.userId).pipe(
          switchMap( (matches) => [
            predictionActions.GetMyMatchesSuccessAction({matches : matches})
          ]),
          catchError(error => of(predictionActions.GetMyMatchesFailureAction(error)))
        );
      })
  );

  @Effect()
  getMyCoins$ = this.actions$
    .pipe(ofType(predictionActions.GetMyCoinsAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMyCoins(action.userId).pipe(
          switchMap( (coins) => [
            predictionActions.GetMyCoinsSuccessAction({coins : coins})
          ]),
          catchError(error => of(predictionActions.GetMyCoinsFailureAction(error)))
        );
      })
  );

  @Effect()
  getUnknownUserPrediction$ = this.actions$
    .pipe(ofType(predictionActions.GetUnknownUserPredictionsAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getUnknownUserPrediction(action.groupId).pipe(
          switchMap( (prediction) => [
            predictionActions.GetUnknownUserPredictionsSuccessAction({predictions : prediction})
          ]),
          catchError(error => of(predictionActions.GetUnknownUserPredictionsFailureAction(error)))
        );
      })
  );

  @Effect()
  getMatchScoreCard$ = this.actions$
    .pipe(ofType(predictionActions.GetMatchScoreCardAction))
    .pipe(
      switchMap((action) => {
        return this.predictionService.getMatchScoreCard(action.matchId).pipe(
          switchMap( (score) => [
            predictionActions.GetMatchScoreCardSuccessAction({score : score})
          ]),
          catchError(error => of(predictionActions.GetMatchScoreCardFailureAction(error)))
        );
      })
  );
    }

export const effects: any[] = [PredictionEffects];
