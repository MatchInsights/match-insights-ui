import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TeamsScorePerformanceComponent from "./TeamsScorePerformance";
import { ApiService } from "../../../services/apiService";

const homeTeamId = 1;
const awayTeamId = 2;
const homeTeam = "Team A";
const awayTeam = "Team B";

describe("Teams Score Performance", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("no data available initially", () => {
    const apiService: Partial<ApiService> = {
      fetchTeamsScorePerformance: () => new Promise(() => {}),
    };

    render(
      <TeamsScorePerformanceComponent
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={1}
        awayTeam={awayTeam}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Teams Score Performance/i })
    );

    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
  });

  it("renders info after loading", async () => {
    const apiService: Partial<ApiService> = {
      fetchTeamsScorePerformance: vi.fn().mockResolvedValue({
        homeTeamPerformance: "Good",
        awayTeamPerformance: "Poor",
      }),
    };

    render(
      <TeamsScorePerformanceComponent
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={1}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Teams Score Performance/i })
    );
    await waitFor(() => {
      expect(screen.getByText("Team A:")).toBeInTheDocument();
      expect(screen.getByText("Team B:")).toBeInTheDocument();
    });

    expect(screen.getAllByText("Good").length).toBe(1);
    expect(screen.getAllByText("Poor").length).toBe(1);
  });

  it("renders fallback message when no data is available", async () => {
    const apiService: Partial<ApiService> = {
      fetchTeamsScorePerformance: vi.fn().mockRejectedValueOnce({}),
    };

    render(
      <TeamsScorePerformanceComponent
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={1}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Teams Score Performance/i })
    );
    await waitFor(() => {
      expect(screen.getAllByText(/No data available/i)).toHaveLength(1);
    });
  });
});
