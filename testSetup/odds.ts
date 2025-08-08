import { Bet } from "../src/app/types/types";

export const bets: Bet[] = [
  {
    betName: "Match Winner",
    values: [
      { label: "Team A", odd: 1.85 },
      { label: "Draw", odd: 3.4 },
      { label: "Team B", odd: 2.1 },
    ],
  },
  {
    betName: "Total Goals Over/Under",
    values: [
      { label: "Over 2.5", odd: 1.95 },
      { label: "Under 2.5", odd: 1.85 },
    ],
  },
  {
    betName: "Both Teams to Score",
    values: [
      { label: "Yes", odd: 1.7 },
      { label: "No", odd: 2.0 },
    ],
  },
  {
    betName: "Correct Score",
    values: [
      { label: "1-0", odd: 7.5 },
      { label: "2-1", odd: 8.0 },
      { label: "0-0", odd: 9.0 },
    ],
  },
  {
    betName: "First Half Result",
    values: [
      { label: "Team A", odd: 2.0 },
      { label: "Draw", odd: 2.2 },
      { label: "Team B", odd: 3.5 },
    ],
  },
];
