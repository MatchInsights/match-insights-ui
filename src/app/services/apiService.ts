import { TodayMatch, LeagueStandingInfo, MatchDetails } from "../types/types";

import apiFetch from "./apiConfig";

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
