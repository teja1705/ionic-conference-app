
export enum StatusOfMatch{
    NOT_STARTED = "NOT_STARTED",
    ON_GOING = "ON_GOING",
    FINISHED = "FINISHED"
}

export class SportInfo{
    id : string;
    matchId : string;
    team1 : string;
    team1ShortName : string;
    League : string;
    team2 : string;
    team2ShortName : string;
    startTime : string;
    startDate : string;
    startMonth : string;
    startYear : string;
    isJoined : boolean;
    isTeamCreated : boolean;
    status : StatusOfMatch;
    resultOfmatch : string
}

export class CricketMatchHomePageInfo{
    date : string;
    month : string;
    year : string;
    matches : Array<SportInfo>;
}

export interface IPredictionStateData{
    actionInProgress : boolean
    upcomingMatchesHomepage : Array<CricketMatchHomePageInfo>
    liveMatchesHomepage : Array<CricketMatchHomePageInfo>
    historyMatchesHomepage : Array<CricketMatchHomePageInfo>
    errorMessage : any
}

