import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LeaguesMenu } from "./LeaguesMenu";
import { ApiService } from "../../services/apiService";
import { mockLeaguesGroups } from "../../../../testSetup/leaguegroups";

describe("LeaguesMenu component", () => {
  let mockApiService: any;
  const setLeague = vi.fn();

  beforeEach(() => {
    mockApiService = {
      fetchLeaguesGroups: vi.fn(),
    };
  });

  it("renders the ball icon", () => {
    render(<LeaguesMenu setLeague={setLeague} apiService={mockApiService} />);
    expect(screen.getByTestId("menu-ball-icon")).toBeInTheDocument();
  });

  it("opens and closes the menu", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);

    render(<LeaguesMenu setLeague={setLeague} apiService={mockApiService} />);

    const ball = screen.getByTestId("menu-ball-icon");
    fireEvent.click(ball);

    expect(await screen.findByTestId("leagues-menu")).toBeInTheDocument();

    const closeIcon = screen.getByTestId("close-leagues-menu-icon");
    fireEvent.click(closeIcon);

    expect(mockApiService.fetchLeaguesGroups).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByTestId("leagues-menu")).toBeNull();
    });
  });

  it("shows loading state while fetching leagues", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(new Promise(() => {}));

    render(<LeaguesMenu setLeague={setLeague} apiService={mockApiService} />);

    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    expect(await screen.findByText("Fetching Leagues...")).toBeInTheDocument();
    expect(mockApiService.fetchLeaguesGroups).toHaveBeenCalledTimes(1);
  });

  it("shows error state if fetch fails", async () => {
    mockApiService.fetchLeaguesGroups.mockRejectedValueOnce(new Error("fail"));

    render(<LeaguesMenu setLeague={setLeague} apiService={mockApiService} />);

    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    expect(
      await screen.findByText("We could not find any Leagues.")
    ).toBeInTheDocument();
    expect(mockApiService.fetchLeaguesGroups).toHaveBeenCalledTimes(1);
  });

  it("filters leagues by league name", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);
    render(<LeaguesMenu setLeague={setLeague} apiService={mockApiService} />);

    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    const nameInput = await screen.findByPlaceholderText("League Name");
    fireEvent.change(nameInput, { target: { value: "UEFA" } });

    await waitFor(() => {
      expect(
        screen.getByTestId(`league-${mockLeaguesGroups.internationals[0].id}`)
      ).toBeInTheDocument();
    });
  });

  it("filters leagues by country name", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);

    render(<LeaguesMenu setLeague={setLeague} apiService={mockApiService} />);

    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    const countryInput = await screen.findByPlaceholderText("League Country");
    fireEvent.change(countryInput, { target: { value: "England" } });

    await waitFor(() => {
      expect(
        screen.getByTestId(
          `league-${mockLeaguesGroups.countryLeagues[0].leagues[0].id}`
        )
      ).toBeInTheDocument();
    });
  });
});
