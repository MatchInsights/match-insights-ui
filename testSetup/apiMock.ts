import {
  TodayMatch,
  LeagueStandingInfo,
  MatchDetails,
  TeamForm,
  H2HDetails,
  TwoTeamStats,
  TeamPositionsAndPoints,
  Bet,
  LastFiveMatchesEvents,
  TeamsRestStatus,
  TeamsScorePerformance,
  OddsWinnerFeeling,
} from "../src/app/types/types";

import {
  oddsWinnerFeeling,
  teamRestStatus,
  teamScorePerformance,
} from "./mockdata";
import { mockTodayMatches } from "./matches";
import { mockStandings } from "./leagueInfo";
import { mockMatchDetails } from "./matchDetails";
import { lastFiveData } from "./teamsform";
import { mockH2HDetails } from "./head2head";
import { bets } from "./odds";
import { lastfiveEvents } from "./lastfivematchesevents";
import { mockTwoTeamStats, mockTeamsLeagueStats } from "./twoteamsstats";
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
    return Promise.resolve(mockTodayMatches);
  }

  public async fetchLeagueStanding(
    leagueId: Number
  ): Promise<LeagueStandingInfo[]> {
    return Promise.resolve(mockStandings);
  }

  public async fetchMatchDetails(matchId: number): Promise<MatchDetails> {
    return Promise.resolve(mockMatchDetails);
  }

  public async fetchLastFiveMatches(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<TeamForm> {
    return Promise.resolve(lastFiveData);
  }

  public async fetchHeadToHead(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<H2HDetails[]> {
    return Promise.resolve(mockH2HDetails);
  }

  public async fetchSeasonStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TwoTeamStats> {
    return Promise.resolve(mockTwoTeamStats);
  }

  public async fetchH2HStats(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<TwoTeamStats> {
    return Promise.resolve(mockTwoTeamStats);
  }

  public async fetchTeamLeagueStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TeamPositionsAndPoints> {
    return Promise.resolve(mockTeamsLeagueStats);
  }

  public async fetchOdds(fixtureId: number): Promise<Bet[]> {
    return Promise.resolve(bets);
  }

  public async fetchLastFiveMatchesEvents(
    teamId: number
  ): Promise<LastFiveMatchesEvents> {
    return Promise.resolve(lastfiveEvents);
  }

  public async fetchTeamsRestStatus(
    homeTeamId: number,
    awayTeamId: number,
    fixtureDate: string
  ): Promise<TeamsRestStatus> {
    return Promise.resolve(teamRestStatus);
  }

  public async fetchTeamsScorePerformance(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TeamsScorePerformance> {
    return Promise.resolve(teamScorePerformance);
  }

  public async fetchOddWinnerFeeling(
    fixtureId: number
  ): Promise<OddsWinnerFeeling> {
    return Promise.resolve(oddsWinnerFeeling);
  }
}

export const apiService = MockApiServiceImplementation.getInstance();
