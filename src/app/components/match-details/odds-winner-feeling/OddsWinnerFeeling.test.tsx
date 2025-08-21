import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import OddsWinnerFeelingComponent from "./OddsWinnerFeeling";
import { ApiService } from "../../../services/apiService";

const homeTeamId = 1;
const awayTeamId = 2;
const homeTeam = "Team A";
const awayTeam = "Team B";

describe("Odds Winner Feeling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows initial state", () => {
    const apiService: Partial<ApiService> = {
      fetchOddWinnerFeeling: () => new Promise(() => {}),
    };

    render(
      <OddsWinnerFeelingComponent
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        fixtureId={1234}
        awayTeam={awayTeam}
      />
    );

    fireEvent.click(screen.getByTestId("expand-icon"));

    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
  });

  it("renders info after loading", async () => {
    const apiService: Partial<ApiService> = {
      fetchOddWinnerFeeling: vi.fn().mockResolvedValue({
        home: "Strong",
        draw: "Weak",
        away: "Weak",
      }),
    };

    render(
      <OddsWinnerFeelingComponent
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        fixtureId={1234}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(screen.getByTestId("expand-icon"));
    await waitFor(() => {
      expect(screen.getByText("Team A:")).toBeInTheDocument();
      expect(screen.getByText("Draw:")).toBeInTheDocument();
      expect(screen.getByText("Team B:")).toBeInTheDocument();
    });

    expect(screen.getAllByText("Strong").length).toBe(1);
    expect(screen.getAllByText("Weak").length).toBe(2);
  });

  it("renders fallback message when no data is available", async () => {
    const apiService: Partial<ApiService> = {
      fetchOddWinnerFeeling: vi.fn().mockRejectedValueOnce({}),
    };

    render(
      <OddsWinnerFeelingComponent
        apiService={apiService as ApiService}
        homeTeam={homeTeam}
        fixtureId={1234}
        awayTeam={awayTeam}
      />
    );
    fireEvent.click(screen.getByTestId("expand-icon"));
    await waitFor(() => {
      expect(screen.getAllByText(/No data available/i)).toHaveLength(1);
    });
  });
});
