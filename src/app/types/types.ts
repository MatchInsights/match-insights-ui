export interface Venue {
  name?: string;
  city?: string;
}

export interface MatchStatus {
  long: string;
  short: string;
  elapsed?: number;
  extra?: number;
}

export interface League {
  id: number;
  name: string;
  country?: string;
  logo?: string;
  flag?: string;
  season: number;
  round?: string;
}

export interface Team {
  id: number;
  name: string;
  logo?: string;
  winner?: boolean;
  goals?: number;
}

export interface Goal {
  home?: number;
  away?: number;
}

export interface Score {
  halftime?: Goal;
  fulltime?: Goal;
}

export interface MatchDetails {
  id: number;
  date: string;
  league: League;
  venue: Venue;
  homeTeam: Team;
  awayTeam: Team;
  goals: Goal;
  score: Score;
}

export interface TodayMatch {
  id: number;
  date: string;
  venue: Venue;
  matchStatus: MatchStatus;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
}

export interface TeamForm {
  homeTeamLastFive: string[];
  awayTeamLastFive: string[];
}

export interface H2HDetails {
  date: string;
  venue: Venue;
  leagueName: string;
  season: number;
  round?: string;
  winner: string;
  homeHalfTimeGoal: number;
  awayHalfTimeGoal: number;
  homeFullTimeGoal: number;
  awayFullTimeGoal: number;
  homeExtraTimeGoal: number;
  awayExtraTimeGoal: number;
  homePenalty: number;
  awayPenalty: number;
}

export interface TeamStats {
  goalsFor: number;
  goalsAgainst: number;
  cleanSheet: number;
  scoredIn: number;
  concededIn: number;
}

export interface TwoTeamStats {
  team0: TeamStats;
  team1: TeamStats;
}

export interface Odd {
  label: string;
  odd: number;
}

export interface Bet {
  betName: string;
  values: Odd[];
}

export interface LastFiveMatchesEvents {
  penalties: number;
  firstHalfGoals: number;
  secondHalfGoals: number;
  extraTimeGoals: number;
  firstHalfYellowCards: number;
  secondHalfYellowCards: number;
  extraTimeYellowCards: number;
  firstHalfRedCards: number;
  secondHalfRedCards: number;
  extraTimeRedCards: number;
}

export interface TeamsRestStatus {
  homeTeamStatus: string;
  awayTeamStatus: string;
}

export interface TeamsScorePerformance {
  homeTeamPerformance: string;
  awayTeamPerformance: string;
}

export interface OddsWinnerFeeling {
  home: string;
  draw: string;
  away: string;
}

export interface TeamDetails {
  teamName: string;
  teamLogo: string;
  teamCountry: string;
  teamFounded: number;
  venueName: string;
  venueCity: string;
  venueCapacity: number;
  coachName: string;
  coachAge: number;
}

export interface PlayerSummary {
  name: string;
  age: number;
  height: string;
  weight: string;
  position: string;
  goals: number;
  yellowCards: number;
  redCards: number;
  penaltiesSaved: number;
  penaltiesScored: number;
}
