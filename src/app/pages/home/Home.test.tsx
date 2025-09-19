import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { TodayMatch } from "../../types/types";
import { mockTodayMatches } from "../../../../testSetup/matches";
import { mockLeaguesGroups } from "../../../../testSetup/leaguegroups";

const mockMatches: TodayMatch[] = mockTodayMatches;

describe("Home Component", () => {
  let mockApiService: any;

  beforeEach(() => {
    mockApiService = {
      fetchTodayMatches: vi.fn(),
      fetchLeaguesGroups: vi.fn(),
    };
  });

  it("renders loading state initially", () => {
    mockApiService.fetchTodayMatches.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <Home apiService={mockApiService} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Fetching Matches of the Day/i)).toBeDefined();
  });

  it("renders no matches message when API returns empty array", async () => {
    mockApiService.fetchTodayMatches.mockResolvedValue([]);
    render(
      <MemoryRouter>
        <Home apiService={mockApiService} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/We could not find any matches/i)).toBeDefined();
    });
  });

  it("renders matches when API returns data", async () => {
    mockApiService.fetchTodayMatches.mockResolvedValue(mockMatches);
    render(
      <MemoryRouter>
        <Home apiService={mockApiService} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockMatches[0].homeTeam.name)).toBeDefined();
      expect(screen.getByText(mockMatches[0].awayTeam.name)).toBeDefined();
    });
  });

  it("filters matches by team name", async () => {
    mockApiService.fetchTodayMatches.mockResolvedValue(mockMatches);
    render(
      <MemoryRouter>
        <Home apiService={mockApiService} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockMatches[0].homeTeam.name)).toBeDefined();
    });

    const input = screen.getByPlaceholderText(/Filter by team name/i);
    fireEvent.change(input, {
      target: { value: mockMatches[0].homeTeam.name },
    });

    await waitFor(() => {
      expect(screen.getByText(mockMatches[0].homeTeam.name)).toBeDefined();
      expect(screen.queryByText(mockMatches[1].homeTeam.name)).toBeNull();
    });
  });

  it("filter by the selected league", async () => {
    mockApiService.fetchTodayMatches.mockResolvedValue(mockMatches);
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);

    render(
      <MemoryRouter>
        <Home apiService={mockApiService} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockMatches[0].homeTeam.name)).toBeDefined();
    });

    const leagueMenu = screen.getByTestId("menu-ball-icon");
    fireEvent.click(leagueMenu);

    await waitFor(() => {
      expect(screen.getByText("Internationals")).toBeDefined();
    });

    const inertantionalLeagues = screen.getByText("Internationals");
    fireEvent.click(inertantionalLeagues);

    await waitFor(() => {
      expect(
        screen.getByText(mockLeaguesGroups.internationals[0].name)
      ).toBeDefined();
    });

    const league0 = screen.getByText(mockLeaguesGroups.internationals[0].name);

    fireEvent.click(league0);

    await waitFor(() => {
      expect(screen.getByTestId("league-link")).toBeDefined();
      expect(screen.getByText(mockMatches[0].homeTeam.name)).toBeDefined();
      expect(screen.queryByText(mockMatches[1].homeTeam.name)).toBeDefined();
    });

    expect(mockApiService.fetchTodayMatches).toHaveBeenCalledTimes(2);
    expect(mockApiService.fetchLeaguesGroups).toHaveBeenCalledTimes(1);
  });
});
