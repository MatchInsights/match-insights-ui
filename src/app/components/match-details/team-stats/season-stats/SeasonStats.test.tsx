import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SeasonStats from "./SeasonStats";

const mockApi = {
  fetchSeasonStats: vi.fn(),
} as any;

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

describe("SeasonStats", () => {
  const props = {
    title: "Season Stats",
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "Home FC",
    awayTeamName: "Away United",
    leagueId: 99,
    apiService: mockApi,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    mockApi.fetchSeasonStats.mockReturnValue(new Promise(() => {}));
    render(<SeasonStats {...props} />);
    expect(screen.getByText("Fetching Season Stats.")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    mockApi.fetchSeasonStats.mockRejectedValue(new Error("API Error"));
    render(<SeasonStats {...props} />);
    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Season Stats.")
      ).toBeInTheDocument()
    );
  });

  it("renders all categories with home/away numbers on success", async () => {
    const mockData: TwoTeamStats = {
      team0: {
        goalsFor: 10,
        goalsAgainst: 5,
        cleanSheet: 3,
        scoredIn: 8,
        concededIn: 4,
      },
      team1: {
        goalsFor: 8,
        goalsAgainst: 6,
        cleanSheet: 2,
        scoredIn: 6,
        concededIn: 5,
      },
    };
    mockApi.fetchSeasonStats.mockResolvedValue(mockData);

    render(<SeasonStats {...props} />);

    await waitFor(() => {
      const labels = screen
        .getAllByTestId("stat-label")
        .map((el) => el.textContent);
      expect(labels).toContain("Goals For");
      expect(labels).toContain("Goals Against");
      expect(labels).toContain("Clean Sheet");
      expect(labels).toContain("Scored In");
      expect(labels).toContain("Conceded In");

      const stats = screen.getAllByTestId("home-away-stats");
      stats.forEach((statEl) => {
        expect(statEl.textContent).toContain("Home FC");
        expect(statEl.textContent).toContain("Away United");
      });

      expect(stats[0].textContent).toContain("10");
      expect(stats[0].textContent).toContain("8");
      expect(stats[1].textContent).toContain("5");
      expect(stats[1].textContent).toContain("6");
    });
  });

  it("calls fetchData again when Refresh button is clicked", async () => {
    mockApi.fetchSeasonStats.mockRejectedValue(new Error("API Error"));
    render(<SeasonStats {...props} />);
    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Season Stats.")
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchSeasonStats).toHaveBeenCalledTimes(2);
  });
});
