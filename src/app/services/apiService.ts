import {
  TodayMatch,
  LeagueStandingInfo,
  MatchDetails,
  TeamForm,
} from "../types/types";
import apiFetch from "./apiConfig";

// import { mockTodayMatches } from "../../../testSetup/matches";
// import { mockStandings } from "../../../testSetup/leagueInfo";
// import { mockMatchDetails } from "../../../testSetup/matchDetails";
// import { lastFiveData } from "../../../testSetup/teamsform";

// export const fetchTodayMatches = async (
//   status: string
// ): Promise<TodayMatch[]> => Promise.resolve(mockTodayMatches);
// export const fetchLeagueStanding = async (
//   leagueId: Number
// ): Promise<LeagueStandingInfo[]> => Promise.resolve(mockStandings);
// export const fetchMatchDetails = async (
//   matchId: number
// ): Promise<MatchDetails> => Promise.resolve(mockMatchDetails);

// export const fetchLastFiveMatches = async (
//   homeTeamId: number,
//   awayTeamId: number
// ): Promise<TeamForm> => Promise.resolve(lastFiveData);

export const fetchTodayMatches = async (
  status: string
): Promise<TodayMatch[]> => {
  const response = await apiFetch.get<TodayMatch[]>(
    `/api/matches/today/${status}`
  );
  return response.data;
};

export const fetchLeagueStanding = async (
  leagueId: Number
): Promise<LeagueStandingInfo[]> => {
  const response = await apiFetch.get<LeagueStandingInfo[]>(
    `/api/league/standing/${leagueId}`
  );
  return response.data;
};

export const fetchMatchDetails = async (
  matchId: number
): Promise<MatchDetails> => {
  const response = await apiFetch.get<MatchDetails>(
    `/api/matches/${matchId}/details`
  );
  return response.data;
};

export const fetchLastFiveMatches = async (
  homeTeamId: number,
  awayTeamId: number
): Promise<TeamForm> => {
  const response = await apiFetch.get<TeamForm>(
    `/api/teams/lastfive/${homeTeamId}/${awayTeamId}`
  );
  return response.data;
};
