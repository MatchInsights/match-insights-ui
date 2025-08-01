export interface Venue {
  name?: string;
  city?: string;
}

export interface MatchStatus {
  long?: string;
  short?: string;
  elapsed?: number;
  extra?: number;
}

export interface League {
  name?: string;
  id?: Number;
  country?: string;
  logo?: string;
  flag?: string;
  season?: number;
  round?: string;
}

export interface Team {
  name?: string;
  logo?: string;
  winner?: boolean;
  goals?: number;
}

export interface TodayMatch {
  date?: string;
  timeZone?: string;
  venue?: Venue;
  matchStatus?: MatchStatus;
  league?: League;
  homeTeam?: Team;
  awayTeam?: Team;
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
  form: string | null;
}
