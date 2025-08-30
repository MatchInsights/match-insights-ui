import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import OddsWinnerFeelingComponent from "./OddsWinnerFeeling";
import { OddsWinnerFeeling } from "../../../../types/types";

const mockApi = {
  fetchOddWinnerFeeling: vi.fn(),
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

describe("OddsWinnerFeelingComponent", () => {
  const props = {
    homeTeam: "Home FC",
    awayTeam: "Away United",
    fixtureId: 123,
    apiService: mockApi,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    mockApi.fetchOddWinnerFeeling.mockReturnValue(new Promise(() => {}));

    render(<OddsWinnerFeelingComponent {...props} />);

    expect(
      screen.getByText("Fetching Odds Winner Feeling.")
    ).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    mockApi.fetchOddWinnerFeeling.mockRejectedValue(new Error("API Error"));

    render(<OddsWinnerFeelingComponent {...props} />);

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Odds Winner Feeling.")
      ).toBeInTheDocument()
    );
  });

  it("renders home, draw, and away values with correct color classes", async () => {
    const mockData: OddsWinnerFeeling = {
      home: "Strong Home",
      draw: "Neutral",
      away: "Weak Away",
    };

    mockApi.fetchOddWinnerFeeling.mockResolvedValue(mockData);

    render(<OddsWinnerFeelingComponent {...props} />);

    const homeSpan = await screen.findByText("Strong Home");
    const drawSpan = screen.getByText("Neutral");
    const awaySpan = screen.getByText("Weak Away");

    expect(homeSpan).toHaveClass("bg-brand-success");
    expect(drawSpan).toHaveClass("bg-brand-white");
    expect(awaySpan).toHaveClass("bg-brand-white");

    expect(screen.getByText("Home FC")).toBeInTheDocument();
    expect(screen.getByText("Draw")).toBeInTheDocument();
    expect(screen.getByText("Away United")).toBeInTheDocument();
  });

  it("calls fetchData again when Refresh button is clicked", async () => {
    mockApi.fetchOddWinnerFeeling.mockResolvedValue(null);

    render(<OddsWinnerFeelingComponent {...props} />);

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Odds Winner Feeling.")
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchOddWinnerFeeling).toHaveBeenCalledTimes(2);
  });
});
