import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LastFiveMatches from "./LastFiveMatches";

vi.mock("../../../pre-display/PreDisplay", () => ({
  default: ({ title, child, onRefresh }: any) => (
    <div data-testid="pre-display">
      <h2>{title}</h2>
      <button onClick={onRefresh}>Refresh</button>
      {child}
    </div>
  ),
}));

vi.mock("../../../no-data/NoData", () => ({
  default: ({ displayedMessage }: { displayedMessage: string }) => (
    <div data-testid="no-data">{displayedMessage}</div>
  ),
}));

describe("LastFiveMatches", () => {
  const homeTeamId = 1;
  const awayTeamId = 2;
  const homeTeam = "Home FC";
  const awayTeam = "Away United";

  const mockApi = {
    fetchLastFiveMatches: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockApi.fetchLastFiveMatches.mockResolvedValueOnce({
      homeTeamLastFive: [],
      awayTeamLastFive: [],
    });

    render(
      <LastFiveMatches
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    expect(screen.getByText("Fetching Last Five Matches.")).toBeInTheDocument();
  });

  it("renders 'not available' when API returns empty results", async () => {
    mockApi.fetchLastFiveMatches.mockResolvedValueOnce({
      homeTeamLastFive: [],
      awayTeamLastFive: [],
    });

    render(
      <LastFiveMatches
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByText("Last Five Matches results are not available.")
      ).toBeInTheDocument()
    );
  });

  it("renders data when it is available", async () => {
    mockApi.fetchLastFiveMatches.mockResolvedValueOnce({
      homeTeamLastFive: ["W", "D", "L"],
      awayTeamLastFive: ["L", "W"],
    });

    render(
      <LastFiveMatches
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    expect(await screen.findByText("Home FC")).toBeInTheDocument();
    expect(screen.getByText("Away United")).toBeInTheDocument();
  });

  it("renders 'not available' when API rejects", async () => {
    mockApi.fetchLastFiveMatches.mockRejectedValueOnce(new Error("API error"));

    render(
      <LastFiveMatches
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByText("Last Five Matches results are not available.")
      ).toBeInTheDocument()
    );
  });

  it("calls fetchLastFiveMatches again when Refresh is clicked", async () => {
    mockApi.fetchLastFiveMatches.mockResolvedValue({
      homeTeamLastFive: [],
      awayTeamLastFive: [],
    });

    render(
      <LastFiveMatches
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByText("Last Five Matches results are not available.")
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchLastFiveMatches).toHaveBeenCalledTimes(2);
  });
});
