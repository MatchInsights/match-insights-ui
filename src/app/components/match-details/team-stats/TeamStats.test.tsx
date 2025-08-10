import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TeamStats from "./TeamStats";
import { describe, it, expect, vi } from "vitest";
import { ApiService } from "../../../services/apiService";

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
    const apiService: Partial<ApiService> = {
      fetchH2HStats: () => new Promise(() => {}),
    };

    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /H2H Stats/i }));
    expect(screen.getByText(/Loading Data.../i)).toBeInTheDocument();
  });

  it("renders fallback if no data returned", async () => {
    const apiService: Partial<ApiService> = {
      fetchH2HStats: vi.fn().mockResolvedValue(null),
    };
    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /H2H Stats/i }));
    await waitFor(() =>
      expect(screen.getByText(/No Stats data available./i)).toBeInTheDocument()
    );
  });

  it("renders stats correctly with H2H data", async () => {
    const apiService: Partial<ApiService> = {
      fetchH2HStats: vi.fn().mockResolvedValue(mockStats),
    };
    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        apiService={apiService as ApiService}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /H2H Stats/i }));

    await waitFor(() => {
      expect(screen.getByText("Team A: 1.5")).toBeInTheDocument();
      expect(screen.getByText("Team B: 1.3")).toBeInTheDocument();
      expect(screen.getByText(/Avg Goals For/i)).toBeInTheDocument();
    });
  });

  it("calls season stats fetch if provided with leagueId", async () => {
    const apiService: Partial<ApiService> = {
      fetchSeasonStats: vi.fn().mockResolvedValue(mockStats),
    };

    render(
      <TeamStats
        homeTeamId={1}
        awayTeamId={2}
        leagueId={99}
        homeTeamName="Team A"
        awayTeamName="Team B"
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Season Stats/i }));
    await waitFor(() =>
      expect(apiService.fetchSeasonStats).toHaveBeenCalledWith(1, 2, 99)
    );

    expect(await screen.findByText("Team A: 1.5")).toBeInTheDocument();
  });
});
