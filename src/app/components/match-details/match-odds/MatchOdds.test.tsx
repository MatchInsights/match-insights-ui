import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MatchOdds from "./MatchOdds";

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

describe("MatchOdds", () => {
  const fixtureId = 123;
  const mockApi = {
    fetchOdds: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockApi.fetchOdds.mockResolvedValueOnce([]);

    render(<MatchOdds fixtureId={fixtureId} apiService={mockApi as any} />);

    expect(screen.getByText("Fetching Match Odds.")).toBeInTheDocument();
  });

  it("renders 'not available' when API returns empty array", async () => {
    mockApi.fetchOdds.mockResolvedValueOnce([]);

    render(<MatchOdds fixtureId={fixtureId} apiService={mockApi as any} />);

    await waitFor(() =>
      expect(
        screen.getByText("Match Odds are not available.")
      ).toBeInTheDocument()
    );
  });

  it("renders odds when API returns data", async () => {
    mockApi.fetchOdds.mockResolvedValueOnce([
      {
        betName: "Winner",
        values: [
          { label: "Home", odd: "1.50" },
          { label: "Draw", odd: "3.40" },
          { label: "Away", odd: "5.25" },
        ],
      },
    ]);

    render(<MatchOdds fixtureId={fixtureId} apiService={mockApi as any} />);

    expect(await screen.findByText("Winner")).toBeInTheDocument();
    expect(screen.getByText("Home:")).toBeInTheDocument();
    expect(screen.getByText("1.50")).toBeInTheDocument();
    expect(screen.getByText("Draw:")).toBeInTheDocument();
    expect(screen.getByText("3.40")).toBeInTheDocument();
    expect(screen.getByText("Away:")).toBeInTheDocument();
    expect(screen.getByText("5.25")).toBeInTheDocument();
  });

  it("renders 'not available' if API rejects", async () => {
    mockApi.fetchOdds.mockRejectedValueOnce(new Error("API Error"));

    render(<MatchOdds fixtureId={fixtureId} apiService={mockApi as any} />);

    await waitFor(() =>
      expect(
        screen.getByText("Match Odds are not available.")
      ).toBeInTheDocument()
    );
  });

  it("calls fetchOdds again when Refresh is clicked", async () => {
    mockApi.fetchOdds.mockResolvedValue([]);

    render(<MatchOdds fixtureId={fixtureId} apiService={mockApi as any} />);

    await waitFor(() =>
      expect(
        screen.getByText("Match Odds are not available.")
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchOdds).toHaveBeenCalledTimes(2);
  });
});
