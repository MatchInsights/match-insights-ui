import { TodayMatch } from "../src/app/types/types";

const todayMatches: TodayMatch[] = [
  {
    date: "2025-07-28T14:00:00Z",
    timeZone: "UTC",
    venue: {
      name: "Old Trafford",
      city: "Manchester",
    },
    matchStatus: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },
    league: {
      id: 1,
      name: "Premier League",
      country: "England",
      logo: "https://example.com/premier-league-logo.png",
      flag: "https://example.com/flags/england.png",
      season: 2025,
      round: "Week 1",
    },
    homeTeam: {
      id: 1,
      name: "Manchester United",
      logo: "https://example.com/logos/manu.png",
      winner: true,
      goals: 3,
    },
    awayTeam: {
      id: 2,
      name: "Chelsea",
      logo: "https://example.com/logos/chelsea.png",
      winner: false,
      goals: 1,
    },
  },
  {
    date: "2025-07-28T18:30:00Z",
    timeZone: "UTC+2",
    venue: {
      name: "Camp Nou",
      city: "Barcelona",
    },
    matchStatus: {
      long: "In Progress",
      short: "1H",
      elapsed: 35,
    },
    league: {
      id: 2,
      name: "La Liga",
      country: "Spain",
      logo: "https://example.com/laliga-logo.png",
      flag: "https://example.com/flags/spain.png",
      season: 2025,
      round: "Matchday 2",
    },
    homeTeam: {
      id: 3,
      name: "Barcelona",
      logo: "https://example.com/logos/barcelona.png",
      goals: 1,
    },
    awayTeam: {
      id: 4,
      name: "Real Betis",
      logo: "https://example.com/logos/betis.png",
      goals: 0,
    },
  },
  {
    date: "2025-07-28T21:00:00Z",
    timeZone: "UTC+3",
    venue: {
      name: "San Siro",
      city: "Milan",
    },
    matchStatus: {
      long: "Not Started",
      short: "NS",
    },
    league: {
      id: 3,
      name: "Serie A",
      country: "Italy",
      logo: "https://example.com/seriea-logo.png",
      flag: "https://example.com/flags/italy.png",
      season: 2025,
      round: "Round 1",
    },
    homeTeam: {
      id: 5,
      name: "AC Milan",
      logo: "https://example.com/logos/acmilan.png",
    },
    awayTeam: {
      id: 6,
      name: "Juventus",
      logo: "https://example.com/logos/juventus.png",
    },
  },
];

export default todayMatches;
