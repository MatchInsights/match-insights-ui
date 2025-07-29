import { TodayMatch } from "../types/types";

import apiFetch from "./apiConfig";

export const fetchTodayMatches = async (
  status: string
): Promise<TodayMatch[]> => {
  const response = await apiFetch.get<TodayMatch[]>(
    `/api/matches/today/${status}`
  );
  return response.data;
};
