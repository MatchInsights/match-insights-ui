import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import MatchOdds from "./MatchOdds";
import { ApiService } from "../../../services/apiService";
import { Bet } from "../../../types/types";

const createApiService = (
  odds: Bet[] | Promise<Bet[]>,
  shouldReject = false
) => {
  return {
    fetchOdds: vi.fn(() =>
      shouldReject ? Promise.reject(new Error("Failed")) : Promise.resolve(odds)
    ),
  } as unknown as ApiService;
};

describe("MatchOdds", () => {
  const fixtureId = 123;

  it("renders loading state initially", () => {
    const apiService = createApiService([]);
    render(<MatchOdds fixtureId={fixtureId} apiService={apiService} />);
    expect(screen.getByText(/Loading Odds/i)).toBeInTheDocument();
  });

  it("renders info state when no odds are available", async () => {
    const apiService = createApiService([]);
    render(<MatchOdds fixtureId={fixtureId} apiService={apiService} />);

    await waitFor(() =>
      expect(screen.getByText(/Odds Not Available/i)).toBeInTheDocument()
    );
  });

  it("renders odds when data is available", async () => {
    const mockOdds: Bet[] = [
      {
        betName: "Full Time Result",
        values: [
          { label: "Home", odd: 1.8 },
          { label: "Draw", odd: 3.5 },
          { label: "Away", odd: 4.2 },
        ],
      },
    ];

    const apiService = createApiService(mockOdds);
    render(<MatchOdds fixtureId={fixtureId} apiService={apiService} />);

    await waitFor(() =>
      expect(screen.getByText(/🧮 Match Odds/i)).toBeInTheDocument()
    );

    expect(screen.getByText("Full Time Result")).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("renders info state when API call fails", async () => {
    const apiService = createApiService([], true);
    render(<MatchOdds fixtureId={fixtureId} apiService={apiService} />);

    await waitFor(() =>
      expect(screen.getByText(/Odds Not Available/i)).toBeInTheDocument()
    );
  });
});
