import {
  TodayMatch,
  LeagueStandingInfo,
  MatchDetails,
  TeamForm,
  H2HDetails,
} from "../types/types";

import { mockTodayMatches } from "../../../testSetup/matches";
import { mockStandings } from "../../../testSetup/leagueInfo";
import { mockMatchDetails } from "../../../testSetup/matchDetails";
import { lastFiveData } from "../../../testSetup/teamsform";
import { mockH2HDetails } from "../../../testSetup/head2head";

export const fetchTodayMatches = async (
  status: string
): Promise<TodayMatch[]> => Promise.resolve(mockTodayMatches);
export const fetchLeagueStanding = async (
  leagueId: Number
): Promise<LeagueStandingInfo[]> => Promise.resolve(mockStandings);
export const fetchMatchDetails = async (
  matchId: number
): Promise<MatchDetails> => Promise.resolve(mockMatchDetails);

export const fetchLastFiveMatches = async (
  homeTeamId: number,
  awayTeamId: number
): Promise<TeamForm> => Promise.resolve(lastFiveData);

export const fetchHeadToHead = async (
  homeTeamId: number,
  awayTeamId: number
): Promise<H2HDetails[]> => Promise.resolve(mockH2HDetails);
