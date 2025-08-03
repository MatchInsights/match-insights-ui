import { TodayMatch } from "../src/app/types/types";

export const mockTodayMatches: TodayMatch[] = [
  {
    id: 301,
    date: "2025-08-03T14:00:00Z",
    venue: {
      name: "Anfield",
      city: "Liverpool",
    },
    matchStatus: {
      long: "First Half",
      short: "1H",
      elapsed: 35,
    },
    league: {
      id: 1,
      name: "Premier League",
      season: 2025,
    },
    homeTeam: {
      id: 30,
      name: "Liverpool",
      logo: "https://example.com/liverpool-logo.png",
      goals: 1,
    },
    awayTeam: {
      id: 40,
      name: "Chelsea",
      logo: "https://example.com/chelsea-logo.png",
      goals: 0,
    },
  },
  {
    id: 302,
    date: "2025-08-03T17:30:00Z",
    venue: {
      name: "Tottenham Hotspur Stadium",
      city: "London",
    },
    matchStatus: {
      long: "Scheduled",
      short: "NS",
    },
    league: {
      id: 1,
      name: "Premier League",
      season: 2025,
    },
    homeTeam: {
      id: 50,
      name: "Tottenham",
      logo: "https://example.com/spurs-logo.png",
    },
    awayTeam: {
      id: 60,
      name: "Brighton",
      logo: "https://example.com/brighton-logo.png",
    },
  },
];
