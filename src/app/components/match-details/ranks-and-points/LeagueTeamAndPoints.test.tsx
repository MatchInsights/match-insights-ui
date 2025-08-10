import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { LeagueTeamAndPoints } from "./LeagueTeamAndPoints";
import { ApiService } from "../../../services/apiService";
import { TeamPositionsAndPoints } from "../../../types/types";

const createApiService = (
  data: TeamPositionsAndPoints | Promise<TeamPositionsAndPoints> | null,
  shouldReject = false
) => {
  return {
    fetchTeamLeagueStats: vi.fn(() =>
      shouldReject ? Promise.reject(new Error("Failed")) : Promise.resolve(data)
    ),
  } as unknown as ApiService;
};

describe("LeagueTeamAndPoints", () => {
  const homeTeamId = 1;
  const awayTeamId = 2;
  const leagueId = 3;

  it("renders loading state after clicking expand", () => {
    const apiService = createApiService({
      homeTeamPoints: 10,
      awayTeamPoints: 12,
      homeTeamPosition: 1,
      awayTeamPosition: 2,
    });
    render(
      <LeagueTeamAndPoints
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        apiService={apiService}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Ranks And Points/i }));

    expect(screen.getByText(/Loading League Stats.../i)).toBeInTheDocument();
  });

  it("renders data when API returns league stats", async () => {
    const mockStats: TeamPositionsAndPoints = {
      homeTeamPoints: 20,
      awayTeamPoints: 18,
      homeTeamPosition: 1,
      awayTeamPosition: 3,
    };
    const apiService = createApiService(mockStats);

    render(
      <LeagueTeamAndPoints
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        apiService={apiService}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Ranks And Points/i }));

    await waitFor(() =>
      expect(screen.getByText(/League Points:/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/20 vs 18/i)).toBeInTheDocument();
    expect(screen.getByText(/1 vs 3/i)).toBeInTheDocument();
  });

  it("renders error state when API call fails", async () => {
    const apiService = createApiService(null, true);

    render(
      <LeagueTeamAndPoints
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        apiService={apiService}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Ranks And Points/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load League Stats./i)
      ).toBeInTheDocument()
    );
  });

  it("renders fallback dashes when stats are partially missing", async () => {
    const partialStats: TeamPositionsAndPoints = {
      homeTeamPoints: undefined as unknown as number,
      awayTeamPoints: 15,
      homeTeamPosition: undefined as unknown as number,
      awayTeamPosition: 4,
    };
    const apiService = createApiService(partialStats);

    render(
      <LeagueTeamAndPoints
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        apiService={apiService}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Ranks And Points/i }));

    await waitFor(() =>
      expect(screen.getByText(/- vs 15/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/- vs 4/i)).toBeInTheDocument();
  });
});
