import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import LastFiveMatches from "./LastFiveMatches";
import { ApiService } from "../../../services/apiService";

const homeTeamId = 1;
const awayTeamId = 2;
const homeTeam = "Team A";
const awayTeam = "Team B";

describe("LastFiveMatches", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows initiall state", () => {
    const apiService: Partial<ApiService> = {
      fetchLastFiveMatches: () => new Promise(() => {}),
    };

    render(
      <LastFiveMatches
        apiService={apiService as ApiService}
        homeTeamId={homeTeamId}
        homeTeam={homeTeam}
        awayTeamId={awayTeamId}
        awayTeam={awayTeam}
      />
    );

    fireEvent.click(screen.getByTestId("expand-icon"));

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  it("renders badges correctly after loading", async () => {
    const apiService: Partial<ApiService> = {
      fetchLastFiveMatches: vi.fn().mockResolvedValue({
        homeTeamLastFive: ["W", "D", "L", "W", "D"],
        awayTeamLastFive: ["L", "L", "W", "D", "W"],
      }),
    };

    render(
      <LastFiveMatches
        apiService={apiService as ApiService}
        homeTeamId={homeTeamId}
        homeTeam={homeTeam}
        awayTeamId={awayTeamId}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(screen.getByTestId("expand-icon"));
    await waitFor(() => {
      expect(screen.getByText("Team A")).toBeInTheDocument();
      expect(screen.getByText("Team B")).toBeInTheDocument();
    });

    expect(screen.getAllByText("W").length).toBe(4);
    expect(screen.getAllByText("D").length).toBe(3);
    expect(screen.getAllByText("L").length).toBe(3);
  });

  it("renders fallback message when no data is available", async () => {
    const apiService: Partial<ApiService> = {
      fetchLastFiveMatches: vi.fn().mockResolvedValue({
        homeTeamLastFive: [],
        awayTeamLastFive: [],
      }),
    };

    render(
      <LastFiveMatches
        apiService={apiService as ApiService}
        homeTeamId={homeTeamId}
        homeTeam={homeTeam}
        awayTeamId={awayTeamId}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(screen.getByTestId("expand-icon"));
    await waitFor(() => {
      expect(screen.getAllByText(/No data available/i)).toHaveLength(1);
    });
  });
});
