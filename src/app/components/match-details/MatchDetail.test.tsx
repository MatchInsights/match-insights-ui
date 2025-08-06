import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import MatchDetail from "./MatchDetail";
import type {
  MatchDetails,
  Team,
  League,
  MatchDetailsFetchFunctions,
  TwoTeamStats,
} from "../../types/types";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

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

const homeTeam: Team = {
  id: 1,
  name: "Home Team",
  logo: "home-logo.png",
};

const awayTeam: Team = {
  id: 2,
  name: "Away Team",
  logo: "away-logo.png",
};

const league: League = {
  id: 12,
  name: "Premier League",
  round: "Matchday 5",
  logo: "league-logo.png",
  country: "England",
  season: 2023,
  flag: "https://example.com/flag.png",
};

const mockMatchDetails: MatchDetails = {
  id: 1,
  homeTeam: homeTeam,
  awayTeam: awayTeam,
  date: "2025-07-01T18:00:00Z",
  venue: { name: "Big Stadium", city: "Sportstown" },
  league: league,
  goals: { home: 2, away: 3 },
  score: {
    halftime: { home: 1, away: 1 },
    fulltime: { home: 2, away: 3 },
  },
};

describe("MatchDetail", () => {
  it("renders loading state initially", () => {
    const fetchFunctions: MatchDetailsFetchFunctions = {
      fetchMatchDetails: vi.fn(
        (id: number) => new Promise<MatchDetails>(() => {})
      ),
      fetchLastFiveMatches: vi.fn(),
      fetchHeadToHead: vi.fn(),
      fetchH2HStats: vi.fn(),
      fetchSeasonStats: vi.fn(),
    };

    render(
      <MemoryRouter initialEntries={["/match/1"]}>
        <MatchDetail fetchFunctions={fetchFunctions} />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading Match Details...")).toBeInTheDocument();
  });

  it("renders error state when match is null", async () => {
    const fetchFunctions: MatchDetailsFetchFunctions = {
      fetchMatchDetails: vi.fn().mockResolvedValue(null),
      fetchLastFiveMatches: vi.fn(),
      fetchHeadToHead: vi.fn(),
      fetchH2HStats: vi.fn(),
      fetchSeasonStats: vi.fn(),
    };
    render(
      <MemoryRouter>
        <MatchDetail fetchFunctions={fetchFunctions} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Match not found.")).toBeInTheDocument();
    });
  });

  it("renders match details on success", async () => {
    const fetchFunctions: MatchDetailsFetchFunctions = {
      fetchMatchDetails: vi.fn().mockResolvedValue(mockMatchDetails),
      fetchLastFiveMatches: vi
        .fn()
        .mockResolvedValue({ homeTeamLastFive: [], awayTeamLastFive: [] }),
      fetchHeadToHead: vi.fn().mockResolvedValue([]),
      fetchH2HStats: vi.fn().mockResolvedValue(mockTwoTeamStats),
      fetchSeasonStats: vi.fn().mockResolvedValue(mockTwoTeamStats),
    };
    render(
      <MemoryRouter>
        <MatchDetail fetchFunctions={fetchFunctions} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("main-card")).toBeInTheDocument();
      expect(screen.getByTestId("score-card")).toBeInTheDocument();
      expect(screen.getByTestId("last-five-card")).toBeInTheDocument();
      expect(screen.getByTestId("last-five-info")).toBeInTheDocument();
      expect(screen.getByTestId("h2h-stats")).toBeInTheDocument();
      expect(screen.getByTestId("season-stats")).toBeInTheDocument();
    });
  });
});
