import {
  TodayMatch,
  LeagueStandingInfo,
  MatchDetails,
  TeamForm,
  H2HDetails,
  TwoTeamStats,
  TeamPositionsAndPoints,
} from "../types/types";
import apiFetch from "./apiConfig";

export interface ApiService {
  fetchTodayMatches(status: string): Promise<TodayMatch[]>;
  fetchLeagueStanding(leagueId: number): Promise<LeagueStandingInfo[]>;
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
}

export class ApiServiceImplementation implements ApiService {
  private static instance: ApiService;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiServiceImplementation.instance) {
      ApiServiceImplementation.instance = new ApiServiceImplementation();
    }
    return ApiServiceImplementation.instance;
  }

  public async fetchTodayMatches(status: string): Promise<TodayMatch[]> {
    const response = await apiFetch.get<TodayMatch[]>(
      `/api/matches/today/${status}`
    );
    return response.data;
  }

  public async fetchLeagueStanding(
    leagueId: Number
  ): Promise<LeagueStandingInfo[]> {
    const response = await apiFetch.get<LeagueStandingInfo[]>(
      `/api/league/standing/${leagueId}`
    );
    return response.data;
  }

  public async fetchMatchDetails(matchId: number): Promise<MatchDetails> {
    const response = await apiFetch.get<MatchDetails>(
      `/api/matches/${matchId}/details`
    );
    return response.data;
  }

  public async fetchLastFiveMatches(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<TeamForm> {
    const response = await apiFetch.get<TeamForm>(
      `/api/teams/lastfive/${homeTeamId}/${awayTeamId}`
    );
    return response.data;
  }

  public async fetchHeadToHead(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<H2HDetails[]> {
    const response = await apiFetch.get<H2HDetails[]>(
      `/api/teams/h2h/${homeTeamId}/${awayTeamId}`
    );
    return response.data;
  }

  public async fetchSeasonStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TwoTeamStats> {
    const response = await apiFetch.get<TwoTeamStats>(
      `/api/teams/season/stats/${homeTeamId}/${awayTeamId}/${leagueId}`
    );
    return response.data;
  }

  public async fetchH2HStats(
    homeTeamId: number,
    awayTeamId: number
  ): Promise<TwoTeamStats> {
    const response = await apiFetch.get<TwoTeamStats>(
      `/api/teams/h2h/stats/${homeTeamId}/${awayTeamId}`
    );
    return response.data;
  }

  public async fetchTeamLeagueStats(
    homeTeamId: number,
    awayTeamId: number,
    leagueId: number
  ): Promise<TeamPositionsAndPoints> {
    const response = await apiFetch.get<TeamPositionsAndPoints>(
      `/api/teams/league/stats/${homeTeamId}/${awayTeamId}/${leagueId}`
    );
    return response.data;
  }
}

export const apiService = ApiServiceImplementation.getInstance();
