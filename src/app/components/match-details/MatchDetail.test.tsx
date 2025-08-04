import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import MatchDetail from "./MatchDetail";
import type { MatchDetails, Team, League } from "../../types/types";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

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
    const fetchMock = vi.fn(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={["/match/1"]}>
        <MatchDetail
          fetchMatchDetails={fetchMock}
          fetchLastFiveMatches={fetchMock}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading Match Details...")).toBeInTheDocument();
  });

  it("renders error state when match is null", async () => {
    const fetchMock = vi.fn().mockResolvedValue(null);

    render(
      <MemoryRouter>
        <MatchDetail
          fetchMatchDetails={fetchMock}
          fetchLastFiveMatches={fetchMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Match not found.")).toBeInTheDocument();
    });
  });

  it("renders match details on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockMatchDetails);

    render(
      <MemoryRouter>
        <MatchDetail
          fetchMatchDetails={fetchMock}
          fetchLastFiveMatches={fetchMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(homeTeam.name)).toBeInTheDocument();
      expect(screen.getByText(awayTeam.name)).toBeInTheDocument();
      expect(screen.getAllByText("2 : 3").length).is.toBe(2);
    });
  });
});
