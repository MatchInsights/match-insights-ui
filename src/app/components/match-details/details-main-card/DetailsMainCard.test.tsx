import { render, screen, waitFor } from "@testing-library/react";
import { DetailsMainCard } from "./DetailsMainCard";
import { MemoryRouter } from "react-router-dom";
import type { Team, League, Venue, Goal, Score } from "../../../types/types";
import { ApiService } from "../../../services/apiService";
import { describe, it, expect, vi } from "vitest";

describe("DetailsMainCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  const venue: Venue = {
    name: "Stadium ABC",
    city: "City XYZ",
  };

  const goals: Goal = {
    home: 2,
    away: 1,
  };

  const scoreFT: Score = {
    fulltime: { home: 2, away: 1 },
  };

  const scoreScheduled: Score = {
    fulltime: { home: undefined, away: undefined },
  };

  const testDate = "2024-03-15T18:00:00Z";

  function renderCard(score: Score, badLeague?: League) {
    const apiService: Partial<ApiService> = {
      fetchTeamLeagueStats: vi.fn().mockResolvedValue({
        homeTeamPosition: 1,
        awayTeamPosition: 2,
        homeTeamPoints: 30,
        awayTeamPoints: 28,
      }),
    };

    return render(
      <MemoryRouter>
        <DetailsMainCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          date={testDate}
          league={badLeague || league}
          venue={venue}
          goals={goals}
          score={score}
          apiService={apiService as ApiService}
        />
      </MemoryRouter>
    );
  }

  it("renders team names via DetailsHeader", async () => {
    renderCard(scoreFT);

    await waitFor(() => {
      expect(screen.getByText("Home Team")).toBeInTheDocument();
      expect(screen.getByText("Away Team")).toBeInTheDocument();
    });
  });

  it("renders league name with correct link", async () => {
    renderCard(scoreFT);

    await waitFor(() => {
      const leagueLink = screen.getByTestId("league-link");
      expect(leagueLink).toHaveTextContent("🏆 Premier League — Matchday 5");
      expect(leagueLink).toHaveAttribute("href", "/league/12");
    });
  });

  it("renders fallback league name if id is missing", async () => {
    const badLeague = { id: null, name: "", round: "" } as League;

    renderCard(scoreFT, badLeague);

    await waitFor(() => {
      expect(screen.getByTestId("league-link")).toHaveTextContent(
        "🏆 Unknown League — →"
      );
    });
  });

  it("renders venue name and city", async () => {
    renderCard(scoreFT);

    await waitFor(() => {
      expect(screen.getByText(/Stadium ABC, City XYZ/)).toBeInTheDocument();
    });
  });

  it("renders formatted date", async () => {
    renderCard(scoreFT);

    await waitFor(() => {
      const expected = new Date(testDate).toLocaleString();
      expect(screen.getByText(`📅 ${expected}`)).toBeInTheDocument();
    });
  });

  it("renders the correct score and FT label", async () => {
    renderCard(scoreFT);

    await waitFor(() => {
      expect(screen.getByText("2 : 1")).toBeInTheDocument();
      expect(screen.getByText("FT")).toBeInTheDocument();
    });
  });

  it("renders dash score and Scheduled label when not fulltime", async () => {
    renderCard(scoreScheduled);

    await waitFor(() => {
      expect(screen.getByText("2 : 1")).toBeInTheDocument();
    });
  });

  it("renders formatted date", async () => {
    renderCard(scoreFT);

    await waitFor(() => {
      const expected = new Date(testDate).toLocaleString();
      expect(screen.getByText(`📅 ${expected}`)).toBeInTheDocument();
    });
  });
});
