import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TeamRestStaus from "./TeamRestStatus";
import { ApiService } from "../../../services/apiService";

const homeTeamId = 1;
const awayTeamId = 2;
const homeTeam = "Team A";
const awayTeam = "Team B";

describe("Team Rest Status", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows initial state", () => {
    const apiService: Partial<ApiService> = {
      fetchTeamsRestStatus: () => new Promise(() => {}),
    };

    render(
      <TeamRestStaus
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={"2025-08-03T16:00:00Z"}
        awayTeam={awayTeam}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Teams Rest Status/i }));

    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
  });

  it("renders info after loading", async () => {
    const apiService: Partial<ApiService> = {
      fetchTeamsRestStatus: vi.fn().mockResolvedValue({
        homeTeamStatus: "Good Rest",
        awayTeamStatus: "Moderate Congestion",
      }),
    };

    render(
      <TeamRestStaus
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={"2025-08-03T16:00:00Z"}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Teams Rest Status/i }));
    await waitFor(() => {
      expect(screen.getByText("Team A:")).toBeInTheDocument();
      expect(screen.getByText("Team B:")).toBeInTheDocument();
    });

    expect(screen.getAllByText("Good Rest").length).toBe(1);
    expect(screen.getAllByText("Moderate Congestion").length).toBe(1);
  });

  it("renders fallback message when no data is available", async () => {
    const apiService: Partial<ApiService> = {
      fetchTeamsRestStatus: vi.fn().mockRejectedValueOnce({}),
    };

    render(
      <TeamRestStaus
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={"2025-08-03T16:00:00Z"}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Teams Rest Status/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/No data available/i)).toHaveLength(1);
    });
  });
});
