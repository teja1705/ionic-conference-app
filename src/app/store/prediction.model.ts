
export enum StatusOfMatch{
    NOT_STARTED = "NOT_STARTED",
    ON_GOING = "ON_GOING",
    FINISHED = "FINISHED"
}

export enum StatusOfContest{
    NOT_STARTED = "NOT_STARTED",
    ON_GOING = "ON_GOING",
    COMPLETED = "COMPLETED"
}

export enum CricketFormat{
    T20 = "T20",
    ODI = "ODI",
    TEST = "TEST",
    T10 = "T10"
}

export enum CricketPlayerRole{
    BATSMAN = "BATSMAN",
    BOWLER = "BOWLER",
    ALL_ROUNDER = "ALL_ROUNDER",
    WICKET_KEEPER = "WICKET_KEEPER",
    NONE = "NONE"
}

export enum CricketWayOfPoints{
    BATTING = "BATTING",
    BOWLING = "BOWLING",
    TEAM = "TEAM"
}

export const T20_BAT_SCORE_RANGE = 15;
export const T20_BOWL_WICKET_RANGE = 3;
export const T20_TEAM_SCORE_RANGE = 25;

export const ODI_BAT_SCORE_RANGE = 30;
export const ODI_BOWL_WICKET_RANGE = 5;
export const ODI_TEAM_SCORE_RANGE = 40;

export const TEST_BAT_SCORE_RANGE = 50;
export const TEST_BOWL_WICKET_RANGE = 8;
export const TEST_TEAM_SCORE_RANGE = 75;

export const SCORE_PER_RUN = 1;
export const SCORE_PER_WICKET = 5;

export const T20_BAT_SCORE_LIMIT = 200;
export const T20_BOWL_SCORE_LIMIT = 10;
export const T20_TEAM_SCORE_LIMIT = 300;

export const ODI_BAT_SCORE_LIMIT = 300;
export const ODI_BOWL_SCORE_LIMIT = 10;
export const ODI_TEAM_SCORE_LIMIT = 500;

export const TEST_BAT_SCORE_LIMIT = 500;
export const TEST_BOWL_SCORE_LIMIT = 20;
export const TEST_TEAM_SCORE_LIMIT = 1000;

export const USER_ID = "1";
export const USER_NAME = "teja1705";



export class MatchInfo{
    id : string; //matchId
    matchId : string;
    team1 : string;
    team1ShortName : string;
    team1ImageUrl : string;
    League : string;
    team2 : string;
    team2ShortName : string;
    team2ImageUrl : string;
    startTime : string;
    startDate : string;
    startMonth : string;
    startYear : string;
    isJoined : boolean;
    isTeamCreated : boolean;
    status : StatusOfMatch;
    resultOfmatch : string;
    isVisible : boolean;
    isCanceled : boolean;
    format : CricketFormat;
}

export class CricketMatchHomePageInfo{
    date : string;
    month : string;
    year : string;
    matches : Array<MatchInfo>;
}

export class Contest{
    id : string; //contestId
    matchId : string;
    totalReward : string;
    totalSpots : string;
    filledSpots : string
    isFull : boolean;
    firstPlaceReward : string;
    isJoined : boolean;
    status : StatusOfContest;
    isCompleted : boolean;
    isStarted : boolean;
    winnerName : string;
    winnerId : string;
    isVisible : boolean;
    isCanceled : boolean;
    isWinner : boolean;
    coinsGained : string;
    team1 : string;
    team2 : string;
}

export class ContestUserRelation{
    userId : string;
    contestId : string;
    predictionGroupId : string;
}

export class ContestJoinedUsers{
    userId : string;
    userName : string;
    userImageUrl : string;
    predictionGroupId : string;
    currentRank : string;
    previousRank : string;
    points : string;
    isWinner : boolean;
}

export class PlayerData{
    id : any; //player Id
    playerName : string;
    playerCountry : string;
    role : CricketPlayerRole;
    playingSportName: string;
    playingSportId : string;
    age : string;
    stats : any;
    status : string;
    playerImageUrl : string;
    teamName : string;
    teamShortName : string;
    isSelected : boolean;
    teamId : string;
    constructor(){
        this.isSelected = false;
    }
}

export class TeamData{
    id : string; //team id
    teamName : string;
    teamCountry:string;
    playersCount:string;
    stats : string;
    currentSeriesWith : string;
    status : string;
    teamShortName : string;
    teamImageUrl : string;
    isSelected : boolean;
    constructor(){
        this.isSelected = false;
    }
}

export class TeamVsTeam{
    team1 : string;
    team1ShortName : string;
    team2ShortName : string;
    team2 : string;
    startTime:string;
    date : string;
    format : CricketFormat;
}

export class TeamsPlayerData{
    match : TeamVsTeam;
    bat : Array<PlayerData>;
    bowl : Array<PlayerData>;
    team : Array<TeamData>
    constructor(){
        this.bat = []
        this.bowl = []
        this.team = []
    }
}

export class Prediction{
    id : string; //prediction Id
    predictionGroupId : string;
    matchId : string;
    isPredictedOnAPlayer : boolean;
    isPredictedOnATeam : boolean;
    playerId : string;
    playerName : string;
    playerImageUrl : string;
    role : CricketPlayerRole;
    format : CricketFormat;
    playerMinScore : string;
    playerMaxScore : string;
    isPredictedCorrectly : boolean;
    userPredictedPoints : string;
    ifPredictPoints : number;
    teamId : string;
    teamName : string;
    teamMinScore : string;
    teamMaxScore : string;
    userId : string;
    predictedOn : CricketWayOfPoints;
}

export class PredictionItem{
    id : string; //predictionGroupId
    matchId : string;
    predictions : Array<Prediction>;
    isJoined : boolean;
    contestId : string;
    isWinner : boolean;
    coinsGained : string;
    userId : string;
    userName : string;
    totalPointsGained : string;
    toatlPointsPredicted : string;
    rank : string;
    isContestStarted : boolean;
    constructor(){
        this.id = "";
        this.matchId = "";
        this.isJoined = false;
        this.contestId = "";
        this.isWinner = false;
        this.coinsGained = "";
        this.toatlPointsPredicted = "";
        this.totalPointsGained = "";
        this.rank = "";
        this.predictions = []
    }
}

export class ContestMetaData{
    matchId : string;
    team1 : string;
    team2 : string;
    team1Id : string;
    team2Id : string;
    team1ShortName : string;
    team2ShortName : string;
    League : string;
    startTime : string;
    date : string;
}

export class ContestData{
    contests : Array<Contest>
    myContests : Array<Contest>
    myPredictions : Array<PredictionItem>
    contestInfo : ContestMetaData
}

export interface IPredictionStateData{
    actionInProgress : boolean
    upcomingMatchesHomepage : Array<CricketMatchHomePageInfo>
    liveMatchesHomepage : Array<CricketMatchHomePageInfo>
    historyMatchesHomepage : Array<CricketMatchHomePageInfo>
    matchContests : Array<Contest>
    match : TeamVsTeam
    battersList : Array<PlayerData>
    bowlersList : Array<PlayerData>
    teamsList : Array<TeamData>
    selectedPlayer : PlayerData
    selectedTeam : TeamData
    selectedMatch : MatchInfo
    selectedPrediction : Prediction
    createPrediction : PredictionItem
    predictionSet : Array<Prediction>
    mycontests : Array<Contest>
    myPredictions : Array<PredictionItem>
    contestMetaData : ContestMetaData
    selectedPredictionItem : PredictionItem
    contestJoinedUsers : Array<ContestJoinedUsers>
    selectedContest : Contest
    errorMessage : any
}

