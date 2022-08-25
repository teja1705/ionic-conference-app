import { Profile, SignUpResult} from './auth/model';

export enum StatusOfMatch{
    NOT_STARTED = "NOT_STARTED",
    ON_GOING = "ON_GOING",
    COMPLETED = "COMPLETED"
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
    BATTER = "BATTER",
    BOWLER = "BOWLER",
    ALL_ROUNDER = "ALL_ROUNDER",
    WICKET_KEEPER = "WICKET_KEEPER",
    TEAM = "TEAM"
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

export const USER_ID = "3";
export const USER_NAME = "teja";



export class MatchInfo{
    matchId: string;
    team1Id: string;
    team2Id: string;
    team1: string;
    team1ShortName: string;
    team1ImageUrl: string;
    league: string;
    team2: string;
    team2ShortName: string;
    team2ImageUrl: string;
    startTime: string;
    startDate: string;
    startMonth: string;
    startYear: string;
    status: StatusOfMatch;
    result: string;
    isVisible: boolean;
    isCanceled: boolean;
    format: CricketFormat;
}


export  class ReceivedNotification {

    title: string;
    from: string;
    to: string;
    type: string;
    imageUrl: string;
    message: string;
    unreadNotificationCount: number;

    constructor(){}
}

export class Message{
    title: string;
    from: string;
    to: string;
    type: string;
    imageUrl: string;
    message: string;
    unreadNotificationCount: number;
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
    reward : string;
    spots : string;
    filledSpots : string
    isFull : boolean;
    isJoined : boolean;
    status : StatusOfContest;
    isCompleted : boolean;
    isStarted : boolean;
    isVisible : boolean;
    isCanceled : boolean;
    isWinner : boolean;
    coinsGained : string;
    coinsDistributionId : string;
    isFree : boolean
    coinsToJoin : string;
    rank : string;
    
}

export class ContestUserRelation{
    userId : string;
    contestId : string;
    predictionGroupId : string;
}

export class ContestJoinedUsers{
    userId : string;
    firstName : string;
    lastName : string;
    imageUrl : string;
    predictionGroupId : string;
    currentRank : number;
    previousRank : number;
    points : string;
}

export class ContestJoinRequest{
    id: string;
    matchId: string;
    contestId: string;
    userId: string;
    predictionGroupId: string;
    points: string;
    currentRank: string;
    previousRank: string;
    isWinner: boolean;
    coinsGained: string;
}

export class PlayerData{
    id: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    isPlayedLastMatch: boolean;
    country: string;
    role: CricketPlayerRole;
    sportName: string;
    sportId: string;
    stats: string;
    status: string;
    isSelected : boolean;
    constructor(){
        this.isSelected = false;
    }
}

export class TeamData{
    id : string; //team id
    name : string;
    representingPlace:string;
    sportName:string;
    stats : string;
    currentSeriesWith : string;
    currentLeague : string;
    status : string;
    code : string;
    imageUrl : string;
    isSelected : boolean;
    constructor(){
        this.isSelected = false;
    }
}

export class TeamsPlayerData{
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
    id : string;
    predictionGroupId : string;
    isPlayer : Boolean;
    isTeam : Boolean;
    playerOrTeamId : string;
    actualRole : string;
    selectedRole : string;
    minValue : string;
    maxValue : string;
    isPredictedCorrectly: Boolean;
    predictPoints: number;
    name : string;
    imageUrl : string;
}


export class PredictionItem{
    id: string;
    userId: string;
    matchId: string;
    pointsGained: string;
    pointsPredicted: string;
    predictionsCorrectCount: string;
    constructor(){
        this.id = "";
        this.matchId = "";
    }
}

export class PredictionInput{
    predictionGroup : PredictionItem;
    predictions : Array<Prediction>
    constructor(){
        this.predictions = [],
        this.predictionGroup = new PredictionItem()
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

export class Coins{
    id: string;
    userId : string;
    coinsAvailble : string;
    coinsRedeem : string;
    countInvitedUsers : string;
    inviteCode : string;
    constructor(){
        this.coinsAvailble = "0"
    }
}

export class ScoreCard{
    id: string;
    matchId: string;
    innings: string;
    isTeam: string;
    isPlayer: string;
    playerOrTeamId: string;
    name: string;
    score: string;
    wickets: string;
}

export class MatchScoreCard{
    innings : string;
    teamName: string;
    batters : Array<ScoreCard>
    bowlers : Array<ScoreCard>
    team : ScoreCard
    constructor(){
        this.batters = [],
        this.bowlers = []
    }
}

export class ContestData{
    contests : Array<Contest>
    myContests : Array<Contest>
    myPredictions : Array<PredictionItem>
    contestInfo : ContestMetaData
}

export interface IPredictionStateData{
    actionInProgress : boolean
    id_token: string;
    loginProfileLoading: boolean;
    profile: Profile;
    password: any;
    authenticated: boolean;
    isUserNameAvailable: boolean;
    userNameCheckInProgress: boolean,
    activationInfo: SignUpResult;
    passwordSent: boolean;
    upcomingMatchesHomepage : Array<CricketMatchHomePageInfo>
    liveMatchesHomepage : Array<CricketMatchHomePageInfo>
    historyMatchesHomepage : Array<CricketMatchHomePageInfo>
    matchContests : Array<Contest>
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
    myPredictions : Array<PredictionInput>
    contestMetaData : ContestMetaData
    selectedPredictionItem : PredictionInput
    contestJoinedUsers : Array<ContestJoinedUsers>
    selectedContest : Contest
    notificationCount : any
    myUpcomingMatches : Array<MatchInfo>
    myLiveMatches : Array<MatchInfo>
    myHistoryMatches : Array<MatchInfo>
    coins : Coins
    unknownUserPrediction : PredictionInput
    matchScoreCard : MatchScoreCard
    errorMessage : any
}

