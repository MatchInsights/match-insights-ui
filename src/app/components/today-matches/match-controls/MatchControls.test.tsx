import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MatchControls, { statuses } from "./MatchControls";
import { mockLeaguesGroups } from "../../../../../testSetup/leaguegroups";
import { MemoryRouter } from "react-router-dom";

describe("MatchControls component", () => {
  let mockApiService: any;

  beforeEach(() => {
    mockApiService = {
      fetchTodayMatches: vi.fn(),
      fetchLeaguesGroups: vi.fn(),
    };
  });

  it("renders all status options", () => {
    render(
      <MemoryRouter>
        <MatchControls
          status="NOT_STARTED"
          setStatus={vi.fn()}
          teamFilter=""
          setTeamFilter={vi.fn()}
          selectedLeague={null}
          setSelectedLeague={vi.fn()}
          apiService={mockApiService}
        />
      </MemoryRouter>
    );

    statuses.forEach((statusOption) => {
      expect(screen.getByText(statusOption.value)).toBeInTheDocument();
    });
  });

  it("calls setStatus when a new status is selected", () => {
    const setStatusMock = vi.fn();
    render(
      <MemoryRouter>
        <MatchControls
          status="NOT_STARTED"
          setStatus={setStatusMock}
          teamFilter=""
          setTeamFilter={vi.fn()}
          selectedLeague={null}
          setSelectedLeague={vi.fn()}
          apiService={mockApiService}
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "FULL_TIME" },
    });

    expect(setStatusMock).toHaveBeenCalledWith("FULL_TIME");
  });

  it("calls setTeamFilter when typing in the input", () => {
    const setTeamFilterMock = vi.fn();
    render(
      <MemoryRouter>
        <MatchControls
          status="NOT_STARTED"
          setStatus={vi.fn()}
          teamFilter=""
          setTeamFilter={setTeamFilterMock}
          selectedLeague={null}
          setSelectedLeague={vi.fn()}
          apiService={mockApiService}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Filter by team name...");
    fireEvent.change(input, { target: { value: "Home FC" } });

    expect(setTeamFilterMock).toHaveBeenCalledWith("Home FC");
  });

  it("show all leagues by default", () => {
    render(
      <MemoryRouter>
        <MatchControls
          status="NOT_STARTED"
          setStatus={vi.fn()}
          teamFilter=""
          setTeamFilter={vi.fn()}
          selectedLeague={null}
          setSelectedLeague={vi.fn()}
          apiService={mockApiService}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("ALL LEAGUES")).toBeInTheDocument();
  });

  it("select a league show and set it", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);
    const setLeague = vi.fn();
    render(
      <MemoryRouter>
        <MatchControls
          status="NOT_STARTED"
          setStatus={vi.fn()}
          teamFilter=""
          setTeamFilter={vi.fn()}
          selectedLeague={null}
          setSelectedLeague={setLeague}
          apiService={mockApiService}
        />
      </MemoryRouter>
    );

    const leagueMenu = screen.getByTestId("menu-ball-icon");
    fireEvent.click(leagueMenu);

    await waitFor(() => {
      expect(screen.getByText("Internationals")).toBeDefined();
    });

    const leagueOption = screen.getByTestId(
      `league-${mockLeaguesGroups.internationals[0].id}`
    );

    fireEvent.click(leagueOption);

    expect(setLeague).toHaveBeenCalledTimes(1);
    expect(mockApiService.fetchLeaguesGroups).toHaveBeenCalledTimes(1);
  });

  it("clean up  the selected league", async () => {
    const setLeague = vi.fn();
    render(
      <MemoryRouter>
        <MatchControls
          status="NOT_STARTED"
          setStatus={vi.fn()}
          teamFilter=""
          setTeamFilter={vi.fn()}
          selectedLeague={mockLeaguesGroups.internationals[0]}
          setSelectedLeague={setLeague}
          apiService={mockApiService}
        />
      </MemoryRouter>
    );

    const removeLeague = screen.getByTestId("remove-league-icon");
    fireEvent.click(removeLeague);

    expect(setLeague).toHaveBeenCalledTimes(1);
  });
});
