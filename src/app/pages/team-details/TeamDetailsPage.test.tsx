import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TeamDetailsPage from "./TeamDetailsPage";
import { TeamDetails, TeamPlayer } from "../../types/types";
import { teamDetails, players } from "../../../../testSetup/team";

describe("TeamDetailsPage", () => {
  let mockApiService: any;

  beforeEach(() => {
    mockApiService = {
      fetchTeamDetails: vi.fn(),
      fetchTeamPlayers: vi.fn(),
    };
  });

  const renderComponent = (teamId: string) =>
    render(
      <MemoryRouter initialEntries={[`/team/${teamId}`]}>
        <Routes>
          <Route
            path="/team/:id"
            element={<TeamDetailsPage apiService={mockApiService} />}
          />
        </Routes>
      </MemoryRouter>
    );

  it("shows loading state initially", () => {
    mockApiService.fetchTeamDetails.mockReturnValue(new Promise(() => {}));
    mockApiService.fetchTeamPlayers.mockReturnValue(new Promise(() => {}));

    renderComponent("1");
    expect(screen.getByText(/Fetching Team Details/i)).toBeDefined();
  });

  it("renders failure messages when fetch fails", async () => {
    mockApiService.fetchTeamDetails.mockRejectedValue(new Error("Failed"));
    mockApiService.fetchTeamPlayers.mockRejectedValue(new Error("Failed"));

    renderComponent("1");

    await waitFor(() => {
      expect(screen.getAllByText(/Failed Fetching/i)).toHaveLength(2);
    });
  });

  it("renders team details and squad when fetch succeeds", async () => {
    mockApiService.fetchTeamDetails.mockResolvedValue(teamDetails);
    mockApiService.fetchTeamPlayers.mockResolvedValue(players);

    renderComponent("1");

    await waitFor(() => {
      expect(screen.getByText(teamDetails.coachName)).toBeDefined();
      expect(screen.getByText(players[0].name)).toBeDefined();
    });
  });
});
