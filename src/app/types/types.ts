export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface Match {
  id: string;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  competition: string;
}

export interface Insight {
  key: string;
  title: string;
  description: string;
  value: string | number | boolean;
}
