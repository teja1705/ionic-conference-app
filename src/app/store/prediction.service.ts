import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { AppConstants } from '../providers/app-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CricketMatchHomePageInfo, StatusOfMatch } from './prediction.model';

@Injectable({ providedIn: 'root' })
export class PredictionService {
  private actionUrl: string;
  upcomingMatches : Array<CricketMatchHomePageInfo>
  LiveMatches : Array<CricketMatchHomePageInfo>
  historyMatches : Array<CricketMatchHomePageInfo>


  constructor(
    private http: HttpClient,
    private httpClient: HttpClient,
    private appConstants: AppConstants,
  ) {
    this.upcomingMatches = [
      {
        date : "31",
        month : "07",
        year : "2022",
        matches : [{
          id : "1",
          matchId : "1",
          team1 : "Mumbai Indians",
          team1ShortName : "MI",
          League : "TATA IPL 2023",
          team2 : "Chennai Super Kings",
          team2ShortName : "CSK",
          startTime : "5:30 PM",
          startDate : "31",
          startMonth : "07",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT"
        }, 
        {
          id : "4",
          matchId : "4",
          team1 : "Australia",
          team1ShortName : "AUS",
          League : "ICC T20 WORLD CUP 2022",
          team2 : "New Zealand",
          team2ShortName : "NZ",
          startTime : "8:30 PM",
          startDate : "31",
          startMonth : "07",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT"
        },]
      },
      {
        date : "01",
        month : "08",
        year : "2022",
        matches : [
        {
          id : "5",
          matchId : "5",
          team1 : "Sri Lanka",
          team1ShortName : "SL",
          League : "ICC T20 WORLD CUP 2022",
          team2 : "England",
          team2ShortName : "ENG",
          startTime : "4:30 PM",
          startDate : "01",
          startMonth : "08",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT"
        }]
      },
      {
        date : "02",
        month : "08",
        year : "2022",
        matches : [
        {
          id : "6",
          matchId : "6",
          team1 : "South Africa",
          team1ShortName : "RSA",
          League : "ICC T20 WORLD CUP 2022",
          team2 : "Bangladesh",
          team2ShortName : "BAN",
          startTime : "7:30 PM",
          startDate : "02",
          startMonth : "08",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT"
        }]
      }
    ]

    this.LiveMatches = [
      {
        date : "31",
        month : "07",
        year : "2022",
        matches : [
        {
            id : "2",
            matchId : "2",
            team1 : "India",
            team1ShortName : "IND",
            League : "ICC T20 WORLD CUP 2022",
            team2 : "Pakistan",
            team2ShortName : "PAK",
            startTime : "1:30 PM",
            startDate : "31",
            startMonth : "07",
            startYear : "2022",
            isJoined : false,
            isTeamCreated : false,
            status : StatusOfMatch.ON_GOING,
            resultOfmatch : "NO_RESULT"
        }]
      },]

      this.historyMatches = [
        {
          date : "30",
          month : "07",
          year : "2022",
          matches : [
            {
              id : "3",
              matchId : "3",
              team1 : "Costal Riders",
              team1ShortName : "CR",
              League : "SHRIRAM APL 2022",
              team2 : "Vizag Kings",
              team2ShortName : "VK",
              startTime : "5:30 PM",
              startDate : "30",
              startMonth : "07",
              startYear : "2022",
              isJoined : false,
              isTeamCreated : false,
              status : StatusOfMatch.FINISHED,
              resultOfmatch : "Coastal Riders won By 20 runs"
            }]
        },
      ]
  }

 

  getHomePageUpcomingMatches() : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get upcoming matches');
    
    console.log(this.upcomingMatches);
    return of(this.upcomingMatches)
  }

  getHomePageLiveMatches() : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get live matches');
    
    console.log(this.LiveMatches);
    return of(this.LiveMatches)
  }

  getHomePageHistoryMatches() : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get history matches');
    
    console.log(this.historyMatches);
    return of(this.historyMatches)
  }

//     todayMatches(){
//     let matches : Array<CricketMatchHomePageInfo> = [{
//       id : "1",
//       matchId : "1",
//       team1 : "Mumbai Indians",
//       team1ShortName : "MI",
//       League : "TATA IPL 2023",
//       team2 : "Chennai Super Kings",
//       team2ShortName : "CSK",
//       startTime : "5:30 PM",
//       startDate : "31",
//       startMonth : "07",
//       startYear : "2022",
//       isJoined : false,
//       isTeamCreated : false,
//       status : StatusOfMatch.NOT_STARTED,
//       resultOfmatch : "NO_RESULT"
//     }, 
//     {
//       id : "1",
//       matchId : "1",
//       team1 : "Mumbai Indians",
//       team1ShortName : "MI",
//       League : "TATA IPL 2023",
//       team2 : "Chennai Super Kings",
//       team2ShortName : "CSK",
//       startTime : "5:30 PM",
//       startDate : "31",
//       startMonth : "07",
//       startYear : "2022",
//       isJoined : false,
//       isTeamCreated : false,
//       status : StatusOfMatch.NOT_STARTED,
//       resultOfmatch : "NO_RESULT"
//     },
//     {
//       id : "1",
//       matchId : "1",
//       team1 : "Mumbai Indians",
//       team1ShortName : "MI",
//       League : "TATA IPL 2023",
//       team2 : "Chennai Super Kings",
//       team2ShortName : "CSK",
//       startTime : "5:30 PM",
//       startDate : "31",
//       startMonth : "07",
//       startYear : "2022",
//       isJoined : false,
//       isTeamCreated : false,
//       status : StatusOfMatch.NOT_STARTED,
//       resultOfmatch : "NO_RESULT"
//     },
//     {
//       id : "1",
//       matchId : "1",
//       team1 : "Mumbai Indians",
//       team1ShortName : "MI",
//       League : "TATA IPL 2023",
//       team2 : "Chennai Super Kings",
//       team2ShortName : "CSK",
//       startTime : "5:30 PM",
//       startDate : "31",
//       startMonth : "07",
//       startYear : "2022",
//       isJoined : false,
//       isTeamCreated : false,
//       status : StatusOfMatch.NOT_STARTED,
//       resultOfmatch : "NO_RESULT"
//     },
//     {
//       id : "1",
//       matchId : "1",
//       team1 : "Mumbai Indians",
//       team1ShortName : "MI",
//       League : "TATA IPL 2023",
//       team2 : "Chennai Super Kings",
//       team2ShortName : "CSK",
//       startTime : "5:30 PM",
//       startDate : "31",
//       startMonth : "07",
//       startYear : "2022",
//       isJoined : false,
//       isTeamCreated : false,
//       status : StatusOfMatch.NOT_STARTED,
//       resultOfmatch : "NO_RESULT"
//     },
//     {
//       id : "1",
//       matchId : "1",
//       team1 : "Mumbai Indians",
//       team1ShortName : "MI",
//       League : "TATA IPL 2023",
//       team2 : "Chennai Super Kings",
//       team2ShortName : "CSK",
//       startTime : "5:30 PM",
//       startDate : "31",
//       startMonth : "07",
//       startYear : "2022",
//       isJoined : false,
//       isTeamCreated : false,
//       status : StatusOfMatch.NOT_STARTED,
//       resultOfmatch : "NO_RESULT"
//     },
//     {
//       id : "1",
//       matchId : "1",
//       team1 : "Mumbai Indians",
//       team1ShortName : "MI",
//       League : "TATA IPL 2023",
//       team2 : "Chennai Super Kings",
//       team2ShortName : "CSK",
//       startTime : "5:30 PM",
//       startDate : "31",
//       startMonth : "07",
//       startYear : "2022",
//       isJoined : false,
//       isTeamCreated : false,
//       status : StatusOfMatch.NOT_STARTED,
//       resultOfmatch : "NO_RESULT"
//     }
// ]
//     return of(matches)
// }
    

}