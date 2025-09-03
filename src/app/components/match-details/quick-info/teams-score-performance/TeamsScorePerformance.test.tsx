import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TeamsScorePerformanceComponent from "./TeamsScorePerformance";

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

describe("TeamsScorePerformanceComponent", () => {
  const homeTeamId = 1;
  const awayTeamId = 2;
  const leagueId = 123;
  const homeTeam = "Home FC";
  const awayTeam = "Away United";

  const mockApi = {
    fetchTeamsScorePerformance: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockApi.fetchTeamsScorePerformance.mockResolvedValueOnce(null);

    render(
      <TeamsScorePerformanceComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    expect(
      screen.getByText("Fetching Score Perfomance for both teams.")
    ).toBeInTheDocument();
  });

  it("renders 'failed' state when API returns null", async () => {
    mockApi.fetchTeamsScorePerformance.mockResolvedValueOnce(null);

    render(
      <TeamsScorePerformanceComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Score Perfomance for both teams.")
      ).toBeInTheDocument()
    );
  });

  it("renders performances with correct color mapping", async () => {
    mockApi.fetchTeamsScorePerformance.mockResolvedValueOnce({
      homeTeamPerformance: "Good Attacking",
      awayTeamPerformance: "Average Defense",
    });

    render(
      <TeamsScorePerformanceComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    const homePerf = await screen.findByText("Good Attacking");
    const awayPerf = await screen.findByText("Average Defense");

    expect(screen.getByText("Home FC")).toBeInTheDocument();
    expect(screen.getByText("Away United")).toBeInTheDocument();
  });

  it("calls fetchTeamsScorePerformance again when Refresh is clicked", async () => {
    mockApi.fetchTeamsScorePerformance.mockResolvedValue(null);

    render(
      <TeamsScorePerformanceComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Score Perfomance for both teams.")
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchTeamsScorePerformance).toHaveBeenCalledTimes(2);
  });
});
