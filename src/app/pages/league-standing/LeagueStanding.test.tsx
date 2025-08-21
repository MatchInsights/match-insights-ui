import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import LeagueStanding from "./LeagueStanding";
import type { LeagueStandingInfo } from "../../types/types";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ApiService } from "../../services/apiService";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ leagueId: "123" }),
  };
});

describe("LeagueStanding Component", () => {
  const mockStandings: LeagueStandingInfo[] = [
    {
      rank: 1,
      teamName: "Test FC",
      logo: "https://example.com/logo.png",
      points: 45,
      played: 20,
      won: 14,
      draw: 3,
      lost: 3,
      goalsFor: 40,
      goalsAgainst: 20,
      form: "WWDWL",
    },
  ];

  it("renders heading and empty message if no standings", async () => {
    const apiService: Partial<ApiService> = {
      fetchLeagueStanding: vi.fn().mockResolvedValue([]),
    };

    render(
      <MemoryRouter>
        <LeagueStanding apiService={apiService as ApiService} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
    });

    expect(apiService.fetchLeagueStanding).toHaveBeenCalledWith(123);
  });

  it("renders table rows when standings are available", async () => {
    const apiService: Partial<ApiService> = {
      fetchLeagueStanding: vi.fn().mockResolvedValueOnce(mockStandings),
    };

    render(
      <MemoryRouter>
        <LeagueStanding apiService={apiService as ApiService} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test FC")).toBeInTheDocument();
      expect(screen.getByText("45")).toBeInTheDocument(); // points
    });
  });

  it("calls fetchStandings with correct leagueId", async () => {
    const apiService: Partial<ApiService> = {
      fetchLeagueStanding: vi.fn().mockResolvedValueOnce([]),
    };

    render(
      <MemoryRouter>
        <LeagueStanding apiService={apiService as ApiService} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(apiService.fetchLeagueStanding).toHaveBeenCalledWith(123);
    });
  });
});
