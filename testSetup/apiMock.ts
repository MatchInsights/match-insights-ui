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
} from "../src/app/types/types";

import {
  LeagueInfo,
  TeamPositionsAndPoints,
} from "../src/app/types/league-types";
import {
  oddsWinnerFeeling,
  teamRestStatus,
  teamScorePerformance,
} from "./mockdata";
import { mockTodayMatches } from "./matches";
import { mockLeagueInfo, mockTeamPositionsAndPoints } from "./leagueInfo";
import { mockMatchDetails } from "./matchDetails";
import { lastFiveData } from "./teamsform";
import { mockH2HDetails } from "./head2head";
import { bets } from "./odds";
import { lastfiveEvents } from "./lastfivematchesevents";
import { players, teamDetails } from "./team";
import { mockTwoTeamStats } from "./twoteamsstats";
import { ApiService } from "../src/app/services/apiService";

export class MockApiServiceImplementation implements ApiService {
  private static instance: MockApiServiceImplementation;

  private constructor() {}

  public static getInstance(): MockApiServiceImplementation {
    if (!MockApiServiceImplementation.instance) {
      MockApiServiceImplementation.instance =
        new MockApiServiceImplementation();
    }
    return MockApiServiceImplementation.instance;
  }

  public async fetchTodayMatches(status: string): Promise<TodayMatch[]> {
    console.log(status);
    return Promise.resolve(mockTodayMatches);
  }

  public async fetchLeagueStanding(leagueId: Number): Promise<LeagueInfo> {
    console.log(leagueId);
    return Promise.resolve(mockLeagueInfo);
  }

  public async fetchMatchDetails(matchId: number): Promise<MatchDetails> {
    console.log(matchId);
    return Promise.resolve(mockMatchDetails);
  }

  public async fetchLastFiveMatches(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<TeamForm> {
    console.log(homeTeamId, awayTeamId);
    return Promise.resolve(lastFiveData);
  }

  public async fetchHeadToHead(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<H2HDetails[]> {
    console.log(homeTeamId, awayTeamId);
    return Promise.resolve(mockH2HDetails);
  }

  public async fetchSeasonStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TwoTeamStats> {
    console.log(homeTeamId, awayTeamId, leagueId);
    return Promise.resolve(mockTwoTeamStats);
  }

  public async fetchH2HStats(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<TwoTeamStats> {
    console.log(homeTeamId, awayTeamId);
    return Promise.resolve(mockTwoTeamStats);
  }

  public async fetchTeamLeagueStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TeamPositionsAndPoints> {
    console.log(homeTeamId, awayTeamId, leagueId);
    return Promise.resolve(mockTeamPositionsAndPoints);
  }

  public async fetchOdds(fixtureId: number): Promise<Bet[]> {
    console.log(fixtureId);
    return Promise.resolve(bets);
  }

  public async fetchLastFiveMatchesEvents(
    teamId: number
  ): Promise<LastFiveMatchesEvents> {
    console.log(teamId);
    return Promise.resolve(lastfiveEvents);
  }

  public async fetchTeamsRestStatus(
    homeTeamId: number,
    awayTeamId: number,
    fixtureDate: string
  ): Promise<TeamsRestStatus> {
    console.log(homeTeamId, awayTeamId, fixtureDate);
    return Promise.resolve(teamRestStatus);
  }

  public async fetchTeamsScorePerformance(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TeamsScorePerformance> {
    console.log(homeTeamId, awayTeamId, leagueId);
    return Promise.resolve(teamScorePerformance);
  }

  public async fetchOddWinnerFeeling(
    fixtureId: number
  ): Promise<OddsWinnerFeeling> {
    console.log(fixtureId);
    return Promise.resolve(oddsWinnerFeeling);
  }

  public async fetchTeamDetails(teamId: number): Promise<TeamDetails> {
    console.log(teamId);
    return Promise.resolve(teamDetails);
  }

  public async fetchTeamPlayers(teamId: number): Promise<PlayerSummary[]> {
    console.log(teamId);
    return Promise.resolve(players);
  }
}

export const apiService = MockApiServiceImplementation.getInstance();
