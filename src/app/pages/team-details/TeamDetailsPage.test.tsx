import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TeamDetailsPage from "./TeamDetailsPage";
import { describe, it, expect, vi } from "vitest";
import type { TeamDetails, TeamPlayer } from "../../types/types";

describe("TeamDetailsPage", () => {
  const mockTeam: TeamDetails = {
    teamName: "Newcastle",
    teamLogo: "https://example.com/logo.png",
    teamCountry: "England",
    teamFounded: 1892,
    venueName: "St. James' Park",
    venueCity: "Newcastle upon Tyne",
    venueCapacity: 52758,
    coachName: "E. Howe",
    coachAge: 48,
  };

  const mockPlayers: TeamPlayer[] = [
    {
      name: "J. Ruddy",
      age: 39,
      nationality: "England",
      position: "Goalkeeper",
    },
    {
      name: "Max Thompson",
      age: 21,
      nationality: "England",
      position: "Goalkeeper",
    },
  ];

  const setup = (
    fetchTeamDetails = vi.fn().mockResolvedValue(mockTeam),
    fetchTeamPlayers = vi.fn().mockResolvedValue(mockPlayers)
  ) => {
    const apiService = {
      fetchTeamDetails,
      fetchTeamPlayers,
    } as any;

    render(
      <MemoryRouter initialEntries={["/team/34"]}>
        <Routes>
          <Route
            path="/team/:id"
            element={<TeamDetailsPage apiService={apiService} />}
          />
        </Routes>
      </MemoryRouter>
    );

    return { apiService };
  };

  it("renders initial state", () => {
    setup();
    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
  });

  it("renders team info and squad when data is loaded", async () => {
    setup();
    expect(await screen.findByText("Newcastle")).toBeInTheDocument();
    expect(await screen.findByText("St. James' Park")).toBeInTheDocument();
    expect(await screen.findByText("J. Ruddy")).toBeInTheDocument();
  });

  it("renders error message when team details fetch fails", async () => {
    const failingDetails = vi.fn().mockRejectedValue(new Error("fail"));
    setup(failingDetails, vi.fn().mockResolvedValue(mockPlayers));

    await waitFor(() =>
      expect(screen.getByText(/No Data Available/i)).toBeInTheDocument()
    );
  });

  it("renders error message when players fetch fails", async () => {
    const failingPlayers = vi.fn().mockRejectedValue(new Error("fail"));
    setup(vi.fn().mockResolvedValue(mockTeam), failingPlayers);

    await waitFor(() =>
      expect(screen.getByText(/No Data Available/i)).toBeInTheDocument()
    );
  });

  it("renders both error states when both fail", async () => {
    const failing = vi.fn().mockRejectedValue(new Error("fail"));
    setup(failing, failing);

    await waitFor(() => {
      expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
      expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
    });
  });
});
