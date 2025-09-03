import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RanksAndPoints } from "./RanksAndPoints";
import { mockTeamPositionsAndPoints } from "../../../../../../testSetup/leagueInfo";

const mockApi = {
  fetchTeamLeagueStats: vi.fn(),
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

describe("LeagueTeamAndPoints", () => {
  const props = {
    homeTeam: "TeamA",
    awayTeam: "TeamB",
    homeTeamId: 1,
    awayTeamId: 2,
    leagueId: 99,
    apiService: mockApi,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    mockApi.fetchTeamLeagueStats.mockReturnValue(new Promise(() => {}));

    render(<RanksAndPoints {...props} />);

    expect(screen.getByText("Fetching ranks and points.")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    mockApi.fetchTeamLeagueStats.mockRejectedValue(new Error("API Error"));

    render(<RanksAndPoints {...props} />);

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching ranks and points.")
      ).toBeInTheDocument()
    );
  });

  it("renders league points and positions when fetch succeeds", async () => {
    mockApi.fetchTeamLeagueStats.mockResolvedValue(mockTeamPositionsAndPoints);

    render(<RanksAndPoints {...props} />);

    await waitFor(() => {
      expect(screen.getAllByTestId("grp-label").length).toBe(2);
      expect(screen.getAllByTestId("grp-data").length).toBe(2);
    });
  });

  it("calls fetchData again when Refresh button is clicked", async () => {
    mockApi.fetchTeamLeagueStats.mockRejectedValue(new Error("API Error"));

    render(<RanksAndPoints {...props} />);

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching ranks and points.")
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchTeamLeagueStats).toHaveBeenCalledTimes(2);
  });
});
