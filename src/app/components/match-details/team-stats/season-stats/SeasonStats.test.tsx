import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SeasonStats from "./SeasonStats";
import { TwoTeamStats } from "../../../../types/types";

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
      expect(screen.getByTestId("stat-label-0")).toBeDefined();
      expect(screen.getByTestId("stat-label-1")).toBeDefined();
      expect(screen.getByTestId("stat-label-2")).toBeDefined();
      expect(screen.getByTestId("stat-label-3")).toBeDefined();
      expect(screen.getByTestId("stat-label-4")).toBeDefined();
      expect(screen.getByTestId("stat-data-0")).toBeDefined();
      expect(screen.getByTestId("stat-data-1")).toBeDefined();
      expect(screen.getByTestId("stat-data-2")).toBeDefined();
      expect(screen.getByTestId("stat-data-3")).toBeDefined();
      expect(screen.getByTestId("stat-data-4")).toBeDefined();
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
