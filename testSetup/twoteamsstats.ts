import { TwoTeamStats } from "../src/app/types/types";

export const mockTwoTeamStats: TwoTeamStats = {
  team0: {
    avgGoalsFor: 1.6,
    avgGoalsAgainst: 1.2,
    cleanSheetPercent: 30.0,
    scoredInPercent: 85.0,
    concededInPercent: 70.0,
  },
  team1: {
    avgGoalsFor: 1.1,
    avgGoalsAgainst: 1.8,
    cleanSheetPercent: 20.0,
    scoredInPercent: 65.0,
    concededInPercent: 80.0,
  },
};
