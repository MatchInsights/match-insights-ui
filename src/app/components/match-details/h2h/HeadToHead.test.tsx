import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HeadToHead from "./HeadToHead";

vi.mock("../../pre-display/PreDisplay", () => ({
  default: ({ title, child, onRefresh }: any) => (
    <div data-testid="pre-display">
      <h2>{title}</h2>
      <button onClick={onRefresh}>Refresh</button>
      {child}
    </div>
  ),
}));

vi.mock("../../no-data/NoData", () => ({
  default: ({ displayedMessage }: { displayedMessage: string }) => (
    <div data-testid="no-data">{displayedMessage}</div>
  ),
}));

describe("HeadToHead", () => {
  const mockApi = {
    fetchHeadToHead: vi.fn(),
  };

  const homeTeamId = 1;
  const awayTeamId = 2;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", async () => {
    mockApi.fetchHeadToHead.mockResolvedValueOnce([]);

    render(
      <HeadToHead
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
      />
    );

    expect(screen.getByText("Fetching H2H Info.")).toBeInTheDocument();
  });

  it("renders 'no data' when API returns empty array", async () => {
    mockApi.fetchHeadToHead.mockResolvedValueOnce([]);

    render(
      <HeadToHead
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
      />
    );

    await waitFor(() =>
      expect(screen.getByText("H2H Info is not available.")).toBeInTheDocument()
    );
  });

  it("renders match details when API returns data", async () => {
    mockApi.fetchHeadToHead.mockResolvedValueOnce([
      {
        date: "2024-03-15T18:00:00Z",
        venue: { name: "Stadium X" },
        leagueName: "Super League",
        season: "2024",
        round: "Quarterfinal",
        homeHalfTimeGoal: 1,
        awayHalfTimeGoal: 0,
        homeFullTimeGoal: 2,
        awayFullTimeGoal: 1,
        homeExtraTimeGoal: 0,
        awayExtraTimeGoal: 0,
        homePenalty: 4,
        awayPenalty: 3,
        winner: "Home FC",
      },
    ]);

    render(
      <HeadToHead
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
      />
    );

    expect(await screen.findByText(/Stadium X/)).toBeInTheDocument();
    expect(screen.getByText(/Super League/)).toBeInTheDocument();
    expect(screen.getByText(/Quarterfinal/)).toBeInTheDocument();
    expect(screen.getByText(/Home FC/)).toBeInTheDocument();
  });

  it("calls fetchData again when Refresh is clicked", async () => {
    mockApi.fetchHeadToHead.mockResolvedValue([]);
    render(
      <HeadToHead
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
      />
    );

    await waitFor(() =>
      expect(screen.getByText("H2H Info is not available.")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchHeadToHead).toHaveBeenCalledTimes(2);
  });
});
