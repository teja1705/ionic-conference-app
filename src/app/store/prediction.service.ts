import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { AppConstants } from '../providers/app-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contest, ContestData, ContestJoinedUsers, ContestMetaData, CricketFormat, CricketMatchHomePageInfo, CricketPlayerRole, CricketWayOfPoints, PredictionItem, StatusOfContest, StatusOfMatch, TeamsPlayerData, TeamVsTeam } from './prediction.model';

@Injectable({ providedIn: 'root' })
export class PredictionService {
  private actionUrl: string;
  upcomingMatches : Array<CricketMatchHomePageInfo>
  LiveMatches : Array<CricketMatchHomePageInfo>
  historyMatches : Array<CricketMatchHomePageInfo>
  matchContests : ContestData;
  userPrediction : Array<PredictionItem>;
  userJoinedContests : Array<Contest>;
  contests : Array<Contest>;
  matchMetaData : ContestMetaData;
  contestJoinedUsers : Array<ContestJoinedUsers> = [
    {
      "userId" : "1",
      "userName" : "teja1705",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "1",
      "previousRank" : "100",
      "points" : "95",
      "isWinner" : false,
    },
    {
      "userId" : "2",
      "userName" : "gautami",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "2",
      "previousRank" : "2",
      "points" : "94",
      "isWinner" : false,
    },
    {
      "userId" : "3",
      "userName" : "prudhvi",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "3",
      "previousRank" : "2",
      "points" : "93",
      "isWinner" : false,
    },
    {
      "userId" : "4",
      "userName" : "hasmika",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "4",
      "previousRank" : "1",
      "points" : "80",
      "isWinner" : false,
    },
    {
      "userId" : "5",
      "userName" : "Chaitanya",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "5",
      "previousRank" : "5",
      "points" : "74",
      "isWinner" : false,
    },
    {
      "userId" : "6",
      "userName" : "lavanya",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "6",
      "previousRank" : "10",
      "points" : "70",
      "isWinner" : false,
    },
    {
      "userId" : "7",
      "userName" : "purna",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "7",
      "previousRank" : "7",
      "points" : "68",
      "isWinner" : false,
    },
    {
      "userId" : "8",
      "userName" : "uma",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "8",
      "previousRank" : "8",
      "points" : "68",
      "isWinner" : false,
    },
    {
      "userId" : "9",
      "userName" : "Janardhan",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "9",
      "previousRank" : "10",
      "points" : "67",
      "isWinner" : false,
    },
    {
      "userId" : "10",
      "userName" : "mohan",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "10",
      "previousRank" : "4",
      "points" : "66",
      "isWinner" : false,
    },
    {
      "userId" : "11",
      "userName" : "vinay",
      "userImageUrl" : "",
      "predictionGroupId" : "1",
      "currentRank" : "11",
      "previousRank" : "11",
      "points" : "65",
      "isWinner" : false,
    },

  ]

  match : TeamVsTeam = {
    "team1" : "INDIA",
    "team1ShortName" : "IND",
    "team2ShortName" : "PAK",
    "team2" : "PAKISTAN",
    "startTime" :"23:00:00",
    "date" : "09-08-2022",
    "format" : CricketFormat.T20,
  }
  matchPlayersList : TeamsPlayerData = {
    "match":this.match,
    "bat":[
        {
            "id" : "45",
            "playerName" : "Rohit Sharma",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "10",
            "playerName" : "Sachin Tendulkar",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "18",
            "playerName" : "Virat Kohli",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "07",
            "playerName" : "M.S. Dhoni",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "99",
            "playerName" : "Babar Azam",
            "playerCountry" : "Pakistan",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "PAKISTAN",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "2",
        },
        {
            "id" : "98",
            "playerName" : "Surya Kumar Yadav",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "17",
            "playerName" : "Rishab Pant",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "999",
            "playerName" : "Hardik Pandya",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BATSMAN,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        }
    ],
    "bowl":[
        {
            "id" : "20",
            "playerName" : "Jasprit Bumrah",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BOWLER,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "54",
            "playerName" : "Bhuvaneshwar",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BOWLER,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "93",
            "playerName" : "Imran Khan",
            "playerCountry" : "Pakistan",
            "role" : CricketPlayerRole.BOWLER,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "PAKISTAN",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "2",
        },
        {
            "id" : "84",
            "playerName" : "Shami",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BOWLER,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "36",
            "playerName" : "Malinga",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BOWLER,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "190",
            "playerName" : "Kapil Dev",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BOWLER,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        },
        {
            "id" : "462",
            "playerName" : "Tilak Verma",
            "playerCountry" : "India",
            "role" : CricketPlayerRole.BOWLER,
            "playingSportName": "CRICKET",
            "playingSportId" : "1",
            "age" : "35",
            "stats" : "",
            "status" : "ACTIVE",
            "playerImageUrl" : "",
            "teamName" : "INDIA",
            "teamShortName" : "IND",
            "isSelected" : false,
            "teamId": "1",
        }
    ],
    "team" : [
        {
            "id" : "1",
            "teamName" : "INDIA",
            "teamCountry":"India",
            "playersCount":"",
            "stats" : "",
            "currentSeriesWith" : "Pakistan",
            "status" : "",
            "teamShortName" : "IND",
            "teamImageUrl" : "",
            "isSelected" : false,
        },
        {
            "id" : "2",
            "teamName" : "PAKISTAN",
            "teamCountry":"Pakistan",
            "playersCount":"",
            "stats" : "",
            "currentSeriesWith" : "India",
            "status" : "",
            "teamShortName" : "PAK",
            "teamImageUrl" : "",
            "isSelected": false,
        }
    ]

}

  constructor(
    private http: HttpClient,
    private httpClient: HttpClient,
    private appConstants: AppConstants,
  ) {
    this.upcomingMatches = [
      {
        date : "08",
        month : "08",
        year : "2022",
        matches : [{
          id : "1",
          matchId : "1",
          team1 : "Mumbai Indians",
          team1ShortName : "MI",
          League : "TATA IPL 2023",
          team2 : "Chennai Super Kings",
          team2ShortName : "CSK",
          startTime : "20:00:00",
          startDate : "08",
          startMonth : "08",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT",
          team1ImageUrl : "",
          team2ImageUrl : "",
          isVisible : true,
          isCanceled : false,
          format : CricketFormat.T20
        }, 
        {
          id : "4",
          matchId : "4",
          team1 : "Australia",
          team1ShortName : "AUS",
          League : "ICC T20 WORLD CUP 2022",
          team2 : "New Zealand",
          team2ShortName : "NZ",
          startTime : "22:30:00",
          startDate : "08",
          startMonth : "08",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT",
          team1ImageUrl : "",
          team2ImageUrl : "",
          isVisible : true,
          isCanceled : false,
          format : CricketFormat.T20
        },]
      },
      {
        date : "09",
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
          startTime : "08:30:00",
          startDate : "09",
          startMonth : "08",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT",
          team1ImageUrl : "",
          team2ImageUrl : "",
          isVisible : true,
          isCanceled : false,
          format : CricketFormat.T20

        }]
      },
      {
        date : "10",
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
          startTime : "12:30:00",
          startDate : "10",
          startMonth : "08",
          startYear : "2022",
          isJoined : false,
          isTeamCreated : false,
          status : StatusOfMatch.NOT_STARTED,
          resultOfmatch : "NO_RESULT",
          team1ImageUrl : "",
          team2ImageUrl : "",
          isVisible : true,
          isCanceled : false,
          format : CricketFormat.T20
        }]
      }
    ]

    this.LiveMatches = [
      {
        date : "01",
        month : "08",
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
            startTime : "10:00:00",
            startDate : "01",
            startMonth : "08",
            startYear : "2022",
            isJoined : false,
            isTeamCreated : false,
            status : StatusOfMatch.ON_GOING,
            resultOfmatch : "NO_RESULT",
            team1ImageUrl : "",
            team2ImageUrl : "",
            isVisible : true,
            isCanceled : false,
            format : CricketFormat.T20
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
              startTime : "17:30:00",
              startDate : "30",
              startMonth : "07",
              startYear : "2022",
              isJoined : false,
              isTeamCreated : false,
              status : StatusOfMatch.FINISHED,
              resultOfmatch : "Coastal Riders won By 20 runs",
              team1ImageUrl : "",
              team2ImageUrl : "",
              isVisible : true,
              isCanceled : false,
              format : CricketFormat.T20

            }]
        },
      ]

      this.userPrediction = [
        {
          id : "1", //predictionGroupId
          isJoined : false,
          contestId : "",
          isWinner : false,
          coinsGained : "",
          userId : "123",
          userName : "teja1705",
          totalPointsGained : "",
          toatlPointsPredicted : "98",
          matchId : "1",
          rank : "",
          isContestStarted : false,
          predictions : [
            {
              id : "1", //predictionId
              predictionGroupId : "1",
              matchId : "1",
              isPredictedOnAPlayer : true,
              isPredictedOnATeam : false,
              playerId : "1",
              playerName : "Rohit Sharma",
              playerImageUrl : "",
              role : CricketPlayerRole.BATSMAN,
              format : CricketFormat.T20,
              playerMinScore : "50",
              playerMaxScore : "55",
              isPredictedCorrectly :false,
              userPredictedPoints : "0",
              ifPredictPoints : 10,
              teamMinScore : "",
              teamMaxScore : "",
              userId : "123",
              predictedOn : CricketWayOfPoints.BATTING,
              teamId : "",
              teamName : "",
            },
            {
              id : "2",
              predictionGroupId : "1",
              matchId : "1",
              isPredictedOnAPlayer : true,
              isPredictedOnATeam : false,
              playerId : "2",
              playerName : "Surya Kumar Yadav",
              playerImageUrl : "",
              role : CricketPlayerRole.BATSMAN,
              format : CricketFormat.T20,
              playerMinScore : "10",
              playerMaxScore : "12",
              isPredictedCorrectly :false,
              userPredictedPoints : "0",
              ifPredictPoints : 13,
              teamMinScore : "",
              teamMaxScore : "",
              userId : "123",
              predictedOn : CricketWayOfPoints.BATTING,
              teamId : "",
              teamName : "",
            },
            {
              id : "3",
              predictionGroupId : "1",
              matchId : "1",
              isPredictedOnAPlayer : true,
              isPredictedOnATeam : false,
              playerId : "33",
              playerName : "Jasprit Bumrah",
              playerImageUrl : "",
              role : CricketPlayerRole.BOWLER,
              format : CricketFormat.T20,
              playerMinScore : "2",
              playerMaxScore : "3",
              isPredictedCorrectly :false,
              userPredictedPoints : "0",
              ifPredictPoints : 10,
              teamMinScore : "",
              teamMaxScore : "",
              userId : "123",
              predictedOn : CricketWayOfPoints.BOWLING,
              teamId : "",
              teamName : "",
            },
            {
              id : "4",
              predictionGroupId : "1",
              matchId : "1",
              isPredictedOnAPlayer : true,
              isPredictedOnATeam : false,
              playerId : "834",
              playerName : "Tilak Varma",
              playerImageUrl : "",
              role : CricketPlayerRole.BOWLER,
              format : CricketFormat.T20,
              playerMinScore : "0",
              playerMaxScore : "0",
              isPredictedCorrectly :false,
              userPredictedPoints : "0",
              ifPredictPoints : 15,
              teamMinScore : "",
              teamMaxScore : "",
              userId : "123",
              predictedOn : CricketWayOfPoints.BOWLING,
              teamId : "",
              teamName : "",
            },
            {
              id : "5",
              predictionGroupId : "1",
              matchId : "1",
              isPredictedOnAPlayer : true,
              isPredictedOnATeam : false,
              playerId : "46",
              playerName : "Jofra Acher",
              playerImageUrl : "",
              role : CricketPlayerRole.BOWLER,
              format : CricketFormat.T20,
              playerMinScore : "0",
              playerMaxScore : "0",
              isPredictedCorrectly :false,
              userPredictedPoints : "0",
              ifPredictPoints : 15,
              teamMinScore : "",
              teamMaxScore : "",
              userId : "123",
              predictedOn : CricketWayOfPoints.BOWLING,
              teamId : "",
              teamName : "",
            },
            {
              id : "6",
              predictionGroupId : "1",
              matchId : "1",
              isPredictedOnAPlayer : false,
              isPredictedOnATeam : true,
              playerId : "",
              playerName : "",
              playerImageUrl : "",
              role : CricketPlayerRole.NONE,
              format : CricketFormat.T20,
              playerMinScore : "",
              playerMaxScore : "",
              isPredictedCorrectly :false,
              userPredictedPoints : "0",
              ifPredictPoints : 35,
              teamMinScore : "200",
              teamMaxScore : "205",
              userId : "123",
              predictedOn : CricketWayOfPoints.TEAM,
              teamId : "1",
              teamName : "Mumbai Indians",
            }
          ]
        }
      ]

      this.userJoinedContests = []

      this.contests = [
        {
          id : "1", //contestId
          matchId : "1",
          totalReward : "1000",
          totalSpots : "100",
          filledSpots : "0",
          isFull : false,
          firstPlaceReward : "500",
          isJoined : false,
          status : StatusOfContest.NOT_STARTED,
          isStarted : false,
          winnerName : "",
          winnerId : "",
          isVisible : true,
          isCanceled : false,
          isWinner : false,
          coinsGained : "0",
          team1 : "India",
          team2 : "Pakistan",
          isCompleted : false
        },
        {
          id : "2", //contestId
          matchId : "1",
          totalReward : "10000",
          totalSpots : "1000",
          filledSpots : "500",
          isFull : false,
          firstPlaceReward : "5000",
          isJoined : false,
          status : StatusOfContest.NOT_STARTED,
          isStarted : false,
          winnerName : "",
          winnerId : "",
          isVisible : true,
          isCanceled : false,
          isWinner : false,
          coinsGained : "0",
          team1 : "India",
          team2 : "Pakistan",
          isCompleted : true,
        },
        {
          id : "3", //contestId
          matchId : "1",
          totalReward : "2000",
          totalSpots : "20",
          filledSpots : "20",
          isFull : true,
          firstPlaceReward : "800",
          isJoined : false,
          status : StatusOfContest.NOT_STARTED,
          isStarted : false,
          winnerName : "",
          winnerId : "",
          isVisible : true,
          isCanceled : false,
          isWinner : false,
          coinsGained : "0",
          team1 : "India",
          team2 : "Pakistan",
          isCompleted : false
        }
      ]

      this.matchMetaData = {
        matchId : "1",
        team1 : "Mumbai Indians",
        team2 : "Chennai Super Kings",
        team1ShortName : "MI",
        team2ShortName : "CSK",
        League : "TATA IPL 2022",
        startTime : "20:00:00",
        date : "09-08-2022",
        team1Id :"1",
        team2Id : "2",
      }

      this.matchContests = {
        contestInfo : this.matchMetaData,
        contests : this.contests,
        myContests :this.userJoinedContests,
        myPredictions : this.userPrediction
      }

  }

 

  getHomePageUpcomingMatches(userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get upcoming matches');
    
    console.log(this.upcomingMatches);
    return of(this.upcomingMatches)
  }

  getHomePageLiveMatches(userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get live matches');
    
    console.log(this.LiveMatches);
    return of(this.LiveMatches)
  }

  getHomePageHistoryMatches(userId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get history matches');
    
    console.log(this.historyMatches);
    return of(this.historyMatches)
  }

  getMatchContestData(matchId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get Contest Data');
    
    console.log(this.matchContests);
    return of(this.matchContests)
  }

  getMatchPlayersData(matchId : any) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get Players Data');
  
    return of(this.matchPlayersList);
  }

  getContestUsers(contestId : string) : Observable<any>{
    let queryUrl = this.appConstants.BASE_API_URL +  '/api/courses';

    console.log('get Players Data');
  
    return of(this.contestJoinedUsers);
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