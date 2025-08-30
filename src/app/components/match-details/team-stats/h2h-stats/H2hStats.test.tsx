import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import H2hStats from "./H2hStats";

const mockApi = {
  fetchH2HStats: vi.fn(),
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

describe("H2hStats", () => {
  const props = {
    title: "H2H Stats",
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "Home FC",
    awayTeamName: "Away United",
    apiService: mockApi,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    mockApi.fetchH2HStats.mockReturnValue(new Promise(() => {}));

    render(<H2hStats {...props} />);

    expect(screen.getByText("Fetching H2H Stats.")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    mockApi.fetchH2HStats.mockRejectedValue(new Error("API Error"));

    render(<H2hStats {...props} />);

    await waitFor(() =>
      expect(screen.getByText("Failed Fetching H2H Stats.")).toBeInTheDocument()
    );
  });

  it("renders categories with home/away stats and symbols", async () => {
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
    mockApi.fetchH2HStats.mockResolvedValue(mockData);

    render(<H2hStats {...props} />);

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

      expect(stats[0].textContent).toContain(">"); // 10 > 8
      expect(stats[1].textContent).toContain("<"); // 5 < 6
      expect(stats[2].textContent).toContain(">"); // 3 > 2
    });
  });

  it("renders 'Unknown' when stats values are missing", async () => {
    const mockData: TwoTeamStats = {
      team0: {
        goalsFor: null,
        goalsAgainst: undefined,
        cleanSheet: 2,
        scoredIn: 5,
        concededIn: 1,
      },
      team1: {
        goalsFor: null,
        goalsAgainst: undefined,
        cleanSheet: 2,
        scoredIn: 5,
        concededIn: 1,
      },
    };
    mockApi.fetchH2HStats.mockResolvedValue(mockData);

    render(<H2hStats {...props} />);

    await waitFor(() => {
      const stats = screen.getAllByTestId("home-away-stats");
      expect(stats[0].textContent).toContain("Unknown");
      expect(stats[1].textContent).toContain("Unknown");
      expect(stats[2].textContent).not.toContain("Unknown");
    });
  });

  it("calls fetchData again when Refresh button is clicked", async () => {
    mockApi.fetchH2HStats.mockRejectedValue(new Error("API Error"));

    render(<H2hStats {...props} />);

    await waitFor(() =>
      expect(screen.getByText("Failed Fetching H2H Stats.")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchH2HStats).toHaveBeenCalledTimes(2);
  });
});
