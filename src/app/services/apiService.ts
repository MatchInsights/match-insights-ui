import { TodayMatch, LeagueStandingInfo } from "../types/types";

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
