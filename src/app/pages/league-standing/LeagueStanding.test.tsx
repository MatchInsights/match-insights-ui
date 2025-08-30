import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LeagueStanding from "./LeagueStanding";
import { mockStandings } from "../../../../testSetup/leagueInfo";

describe("LeagueStanding Component", () => {
  let mockApiService: any;

  beforeEach(() => {
    mockApiService = {
      fetchLeagueStanding: vi.fn(),
    };
  });

  const renderComponent = (leagueId: string) =>
    render(
      <MemoryRouter initialEntries={[`/league/${leagueId}`]}>
        <Routes>
          <Route
            path="/league/:leagueId"
            element={<LeagueStanding apiService={mockApiService} />}
          />
        </Routes>
      </MemoryRouter>
    );

  it("renders loading state initially", () => {
    mockApiService.fetchLeagueStanding.mockReturnValue(new Promise(() => {}));
    renderComponent("1");

    expect(screen.getByText(/Fetching League Details/i)).toBeDefined();
  });

  it("renders no data message when API returns empty array", async () => {
    mockApiService.fetchLeagueStanding.mockResolvedValue([]);
    renderComponent("1");

    await waitFor(() => {
      expect(screen.getByText(/League Details Not Found/i)).toBeDefined();
    });
  });

  it("renders league standings table when data is returned", async () => {
    mockApiService.fetchLeagueStanding.mockResolvedValue(mockStandings);
    renderComponent("1");

    await waitFor(() => {
      expect(screen.getByText(mockStandings[0].teamName)).toBeDefined();
      expect(screen.getByText(mockStandings[1].teamName)).toBeDefined();
    });
  });

  it("calls fetchData again when refresh button is clicked", async () => {
    mockApiService.fetchLeagueStanding.mockResolvedValue(mockStandings);
    renderComponent("1");

    await waitFor(() => {
      expect(screen.getByText(mockStandings[0].teamName)).toBeDefined();
    });

    const refreshButton = screen.getByTitle("Refresh");
    fireEvent.click(refreshButton);

    expect(mockApiService.fetchLeagueStanding).toHaveBeenCalledTimes(2);
  });
});
