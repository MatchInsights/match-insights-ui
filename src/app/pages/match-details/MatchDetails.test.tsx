import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MatchDetail from "./MatchDetail";
import { MatchDetails } from "../../types/types";

import { mockMatchDetails } from "../../../../testSetup/matchDetails";

const mockMatch: MatchDetails = mockMatchDetails;

describe("MatchDetail Component", () => {
  let mockApiService: any;

  beforeEach(() => {
    mockApiService = {
      fetchMatchDetails: vi.fn(),
      fetchLastFiveMatches: vi.fn(),
      fetchHeadToHead: vi.fn(),
      fetchSeasonStats: vi.fn(),
      fetchH2HStats: vi.fn(),
      fetchTeamLeagueStats: vi.fn(),
      fetchOdds: vi.fn(),
      fetchLastFiveMatchesEvents: vi.fn(),
      fetchTeamsRestStatus: vi.fn(),
      fetchTeamsScorePerformance: vi.fn(),
      fetchOddWinnerFeeling: vi.fn(),
    };

    mockApiService.fetchLastFiveMatches.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchHeadToHead.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchSeasonStats.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchH2HStats.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchTeamLeagueStats.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchOdds.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchLastFiveMatchesEvents.mockRejectedValue(
      new Error("Failed")
    );
    mockApiService.fetchTeamsRestStatus.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchTeamsScorePerformance.mockRejectedValue(
      new Error("Failed")
    );
    mockApiService.fetchOddWinnerFeeling.mockRejectedValue(new Error("Failed"));
  });

  const renderComponent = (matchId: string) =>
    render(
      <MemoryRouter initialEntries={[`/match/${matchId}`]}>
        <Routes>
          <Route
            path="/match/:id"
            element={<MatchDetail apiService={mockApiService} />}
          />
        </Routes>
      </MemoryRouter>
    );

  it("renders loading state initially", () => {
    mockApiService.fetchMatchDetails.mockReturnValue(new Promise(() => {}));
    renderComponent("1");

    expect(screen.getByText(/Fetching Match Details/i)).toBeDefined();
  });

  it("renders failed fetch state", async () => {
    mockApiService.fetchMatchDetails.mockRejectedValue(new Error("Failed"));
    renderComponent("1");

    await waitFor(() => {
      expect(screen.getByText(/Failed Fetching Match Details/i)).toBeDefined();
    });
  });

  it("renders match details when data is returned", async () => {
    mockApiService.fetchMatchDetails.mockResolvedValue(mockMatch);
    renderComponent("1");

    await waitFor(() => {
      expect(screen.getByText(mockMatch.homeTeam.name)).toBeDefined();
      expect(screen.getByText(mockMatch.awayTeam.name)).toBeDefined();
    });
  });
});
