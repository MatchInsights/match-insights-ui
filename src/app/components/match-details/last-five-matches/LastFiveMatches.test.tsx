import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import LastFiveMatches from "./LastFiveMatches";

const mockFetchLastFiveMatches = vi.fn();

const homeTeamId = 1;
const awayTeamId = 2;
const homeTeam = "Team A";
const awayTeam = "Team B";

describe("LastFiveMatches", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading initially", () => {
    mockFetchLastFiveMatches.mockReturnValue(new Promise(() => {}));

    render(
      <LastFiveMatches
        fetchLastFiveMatches={mockFetchLastFiveMatches}
        homeTeamId={homeTeamId}
        homeTeam={homeTeam}
        awayTeamId={awayTeamId}
        awayTeam={awayTeam}
      />
    );

    expect(screen.getByText(/Loading Teams Form/i)).toBeInTheDocument();
  });

  it("renders badges correctly after loading", async () => {
    mockFetchLastFiveMatches.mockResolvedValue({
      homeTeamLastFive: ["W", "D", "L", "W", "D"],
      awayTeamLastFive: ["L", "L", "W", "D", "W"],
    });

    render(
      <LastFiveMatches
        fetchLastFiveMatches={mockFetchLastFiveMatches}
        homeTeamId={homeTeamId}
        homeTeam={homeTeam}
        awayTeamId={awayTeamId}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Team A")).toBeInTheDocument();
      expect(screen.getByText("Team B")).toBeInTheDocument();
    });

    expect(screen.getAllByText("W").length).toBe(4);
    expect(screen.getAllByText("D").length).toBe(3);
    expect(screen.getAllByText("L").length).toBe(3);
  });

  it("renders fallback message when no data is available", async () => {
    mockFetchLastFiveMatches.mockResolvedValue({
      homeTeamLastFive: [],
      awayTeamLastFive: [],
    });

    render(
      <LastFiveMatches
        fetchLastFiveMatches={mockFetchLastFiveMatches}
        homeTeamId={homeTeamId}
        homeTeam={homeTeam}
        awayTeamId={awayTeamId}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByText(/No data available/i)).toHaveLength(2);
    });
  });
});
