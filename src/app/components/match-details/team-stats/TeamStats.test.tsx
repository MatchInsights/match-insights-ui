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
  it("renders initiall state", () => {
    const apiService: Partial<ApiService> = {
      fetchH2HStats: () => new Promise(() => {}),
    };

    render(
      <TeamStats
        title="stats"
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /stats/i }));
    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
  });

  it("renders fallback if no data returned", async () => {
    const apiService: Partial<ApiService> = {
      fetchH2HStats: vi.fn().mockResolvedValue(null),
    };
    render(
      <TeamStats
        title="stats"
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /stats/i }));
    await waitFor(() =>
      expect(screen.getByText(/No data available/i)).toBeInTheDocument()
    );
  });

  it("renders stats correctly", async () => {
    const apiService: Partial<ApiService> = {
      fetchH2HStats: vi.fn().mockResolvedValue(mockStats),
    };
    render(
      <TeamStats
        title="stats"
        homeTeamId={1}
        awayTeamId={2}
        homeTeamName="Team A"
        awayTeamName="Team B"
        apiService={apiService as ApiService}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /stats/i }));

    await waitFor(() => {
      expect(screen.getAllByTestId("stat-label").length).toBe(5);
      expect(screen.getAllByTestId("home-away-stats").length).toBe(5);
    });
  });
});
