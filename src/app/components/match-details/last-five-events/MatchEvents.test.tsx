// MatchEvents.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import MatchEvents from "./MatchEvents";

const mockApiService = {
  fetchLastFiveMatchesEvents: vi.fn(),
};

const sampleData = {
  firstHalfGoals: 1,
  secondHalfGoals: 2,
  extraTimeGoals: 0,
  penalties: 1,
  firstHalfYellowCards: 3,
  secondHalfYellowCards: 1,
  extraTimeYellowCards: 0,
  firstHalfRedCards: 1,
  secondHalfRedCards: 0,
  extraTimeRedCards: 0,
};

describe("MatchEvents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders collapsed initially", () => {
    render(
      <MatchEvents
        title="Test Title"
        teamId={123}
        apiService={mockApiService as any}
      />
    );
    expect(screen.queryByText(/Goals/i)).not.toBeInTheDocument();
    expect(mockApiService.fetchLastFiveMatchesEvents).not.toHaveBeenCalled();
  });

  it("shows loading state when expanded and fetching", async () => {
    mockApiService.fetchLastFiveMatchesEvents.mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <MatchEvents
        title="Test Title"
        teamId={123}
        apiService={mockApiService as any}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));

    expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
  });

  it("shows 'No data available' when API returns null", async () => {
    mockApiService.fetchLastFiveMatchesEvents.mockResolvedValue(null);

    render(
      <MatchEvents
        title="Test Title"
        teamId={123}
        apiService={mockApiService as any}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));

    expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
  });

  it("shows 'No data available' when API rejects", async () => {
    mockApiService.fetchLastFiveMatchesEvents.mockRejectedValue(
      new Error("Network error")
    );

    render(
      <MatchEvents
        title="Test Title"
        teamId={123}
        apiService={mockApiService as any}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));

    expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
  });

  it("renders match details when API returns data", async () => {
    mockApiService.fetchLastFiveMatchesEvents.mockResolvedValue(sampleData);

    render(
      <MatchEvents
        title="Test Title"
        teamId={123}
        apiService={mockApiService as any}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));

    await waitFor(() => expect(screen.getByText(/Goals/i)).toBeInTheDocument());

    expect(screen.getByTestId("goals-data")).toBeInTheDocument();
    expect(screen.getByTestId("cards-data")).toBeInTheDocument();
  });
});
