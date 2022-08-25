import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { AppConstants } from '../providers/app-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contest, ContestData, ContestJoinedUsers, ContestJoinRequest, ContestMetaData, CricketFormat, CricketMatchHomePageInfo, CricketPlayerRole, CricketWayOfPoints, PredictionInput, PredictionItem, StatusOfContest, StatusOfMatch, TeamsPlayerData } from './prediction.model';

@Injectable({ providedIn: 'root' })
export class PredictionService {
  private actionUrl: string;

  constructor(
    private http: HttpClient,
    private httpClient: HttpClient,
    private appConstants: AppConstants,
  ) {

  }

 

  getHomePageUpcomingMatches() : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-cricket-upcoming-matches';

    return this.http.get<any>(queryUrl);
  }

  getHomePageLiveMatches() : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-cricket-live-matches';
    return this.http.get<any>(queryUrl)
  }

  getHomePageHistoryMatches() : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-cricket-history-matches';
    return this.http.get<any>(queryUrl)

  }

  getMatchContests(matchId : any, userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-all-contests?matchId='+matchId + '&userId=' + userId;

    return this.http.get<any>(queryUrl)
  }

  getMyMatchContests(matchId : any, userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-my-contests?matchId='+matchId + '&userId=' + userId;

    return this.http.get<any>(queryUrl)
  }

  joinContest(request : ContestJoinRequest) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/join-contest';

    return this.http.post<any>(queryUrl, request)
  }

  savePrediction(request : PredictionInput) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/save-my-prediction';

    return this.http.post<any>(queryUrl, request)
  }

  updatePrediction(request : PredictionInput) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/update-my-prediction';

    return this.http.post<any>(queryUrl, request)
  }

  deletePrediction(groupId : string) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/delete-my-prediction/' + groupId;

    return this.http.delete<any>(queryUrl)
  }

  getMyPredictions(matchId : any, userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-my-predictions?matchId='+matchId + '&userId=' + userId;

    return this.http.get<any>(queryUrl)
  }

  getMatchPlayersData(matchId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-match-players/'+matchId;

    return this.http.get<any>(queryUrl);
  
  }

  getContestUsers(contestId : string) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-contest-users/'+contestId;

  
    return this.http.get<any>(queryUrl);
  }

  getMyMatches(userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-my-cricket-matches/'+userId;

    return this.http.get<any>(queryUrl);
  
  }

  getMyCoins(userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-my-coins/'+userId;

    return this.http.get<any>(queryUrl);
  }

  getUnknownUserPrediction(groupId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-predictions-by-groupid/'+groupId;

    return this.http.get<any>(queryUrl);
  }

  getMatchScoreCard(matchId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/get-match-scorecard/'+matchId;

    return this.http.get<any>(queryUrl);
  }
    

}