import { render, screen, waitFor } from "@testing-library/react";
import TeamStats from "./TeamStats";
import { describe, it, expect, vi } from "vitest";

const mockStats = {
  team0: {
    avgGoalsFor: 1.5,
    avgGoalsAgainst: 0.8,
    cleanSheetPercent: 60,
    scoredInPercent: 80,
    concededInPercent: 20,
  },
  team1: {
    avgGoalsFor: 1.3,
    avgGoalsAgainst: 1.1,
    cleanSheetPercent: 40,
    scoredInPercent: 70,
    concededInPercent: 50,
  },
};

describe("TeamStats", () => {
  it("renders loading state initially", () => {
    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        fetchH2HTeamStats={() => new Promise(() => {})}
      />
    );

    expect(screen.getByText(/Loading Data.../i)).toBeInTheDocument();
  });

  it("renders fallback if no data returned", async () => {
    const fetchH2HTeamStats = vi.fn().mockResolvedValue(null);

    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        fetchH2HTeamStats={fetchH2HTeamStats}
      />
    );

    await waitFor(() =>
      expect(screen.getByText(/no stats data available/i)).toBeInTheDocument()
    );
  });

  it("renders stats correctly with H2H data", async () => {
    const fetchH2HTeamStats = vi.fn().mockResolvedValue(mockStats);

    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        fetchH2HTeamStats={fetchH2HTeamStats}
      />
    );

    await waitFor(() =>
      expect(screen.getByText(/h2h team stats/i)).toBeInTheDocument()
    );

    expect(screen.getByText("Team A: 1.5")).toBeInTheDocument();
    expect(screen.getByText("Team B: 1.3")).toBeInTheDocument();
    expect(screen.getByText(/Avg Goals For/i)).toBeInTheDocument();
  });

  it("calls season stats fetch if provided with leagueId", async () => {
    const fetchSeasonTeamStats = vi.fn().mockResolvedValue(mockStats);

    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        leagueId={99}
        homeTeamName="Team A"
        awayTeamName="Team B"
        fetchSeasonTeamStats={fetchSeasonTeamStats}
      />
    );

    await waitFor(() =>
      expect(fetchSeasonTeamStats).toHaveBeenCalledWith(1, 2, 99)
    );

    expect(await screen.findByText("Team A: 1.5")).toBeInTheDocument();
  });
});
