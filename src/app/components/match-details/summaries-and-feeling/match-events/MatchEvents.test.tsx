import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MatchEvents from "./MatchEvents";

const mockApiService = {
  fetchLastFiveMatchesEvents: vi.fn(),
} as any;

describe("MatchEvents", () => {
  const props = {
    title: "Last 5 Matches Events",
    teamId: 10,
    apiService: mockApiService,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    mockApiService.fetchLastFiveMatchesEvents.mockReturnValue(
      new Promise(() => {})
    );

    render(<MatchEvents {...props} />);

    expect(
      screen.getByText("Fetching Previous Matches info.")
    ).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    mockApiService.fetchLastFiveMatchesEvents.mockRejectedValue(
      new Error("API Error")
    );

    render(<MatchEvents {...props} />);

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Previous Matches info.")
      ).toBeInTheDocument()
    );
  });

  it("renders match events when fetch succeeds", async () => {
    const mockData: LastFiveMatchesEvents = {
      firstHalfGoals: 1,
      secondHalfGoals: 2,
      extraTimeGoals: 0,
      penalties: 1,
      firstHalfYellowCards: 3,
      secondHalfYellowCards: 2,
      extraTimeYellowCards: 1,
      firstHalfRedCards: 0,
      secondHalfRedCards: 1,
      extraTimeRedCards: 0,
    };

    mockApiService.fetchLastFiveMatchesEvents.mockResolvedValue(mockData);

    render(<MatchEvents {...props} />);

    await waitFor(() => {
      expect(screen.getByTestId("goals-data")).toBeInTheDocument();
      expect(screen.getByTestId("cards-data")).toBeInTheDocument();
    });
  });
});
