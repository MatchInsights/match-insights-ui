import {
  TodayMatch,
  MatchDetails,
  TeamForm,
  H2HDetails,
  TwoTeamStats,
  Bet,
  LastFiveMatchesEvents,
  TeamsRestStatus,
  TeamsScorePerformance,
  OddsWinnerFeeling,
  TeamDetails,
  PlayerSummary,
} from "../types/types";

import { LeagueInfo, TeamPositionsAndPoints } from "../types/league-types";

export interface ApiService {
  fetchTodayMatches(status: string): Promise<TodayMatch[]>;
  fetchLeagueStanding(leagueId: number): Promise<LeagueInfo>;
  fetchMatchDetails(matchId: number): Promise<MatchDetails>;
  fetchLastFiveMatches(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<TeamForm>;
  fetchHeadToHead(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<H2HDetails[]>;
  fetchSeasonStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TwoTeamStats>;
  fetchH2HStats(homeTeamId: number, awayTeamId: number): Promise<TwoTeamStats>;
  fetchTeamLeagueStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TeamPositionsAndPoints>;

  fetchOdds(fixtureId: number): Promise<Bet[]>;

  fetchLastFiveMatchesEvents(teamId: number): Promise<LastFiveMatchesEvents>;

  fetchTeamsRestStatus(
    homeTeamId: number,
    awayTeamId: number,
    fixtureDate: string
  ): Promise<TeamsRestStatus>;

  fetchTeamsScorePerformance(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TeamsScorePerformance>;

  fetchOddWinnerFeeling(fixtureId: number): Promise<OddsWinnerFeeling>;
  fetchTeamDetails(teamId: number): Promise<TeamDetails>;
  fetchTeamPlayers(teamId: number): Promise<PlayerSummary[]>;
}
