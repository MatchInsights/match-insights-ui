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

export interface LeagueStandingInfo {
  rank: number;
  teamName: string;
  logo: string;
  points: number;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  form: string;
}

export interface TeamForm {
  homeTeamLastFive: string[];
  awayTeamLastFive: string[];
}
