import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeadToHead from "./HeadToHead";
import type { H2HDetails } from "../../../types/types";
import { ApiService } from "../../../services/apiService";

const mockH2HData: H2HDetails[] = [
  {
    date: "2023-10-01T18:30:00Z",
    venue: { name: "Camp Nou" },
    leagueName: "La Liga",
    season: 2023,
    round: "Round 5",
    winner: "Barcelona",
    homeHalfTimeGoal: 1,
    awayHalfTimeGoal: 0,
    homeFullTimeGoal: 2,
    awayFullTimeGoal: 1,
    homeExtraTimeGoal: 0,
    awayExtraTimeGoal: 0,
    homePenalty: 0,
    awayPenalty: 0,
  },
];

describe("HeadToHead", () => {
  it("renders initiall state", async () => {
    const apiService: Partial<ApiService> = {
      fetchHeadToHead: () => new Promise(() => {}),
    };

    render(
      <HeadToHead
        homeTeamId={1}
        awayTeamId={2}
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByTestId("expand-icon"));

    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
  });

  it("renders empty state when no data is returned", async () => {
    const apiService: Partial<ApiService> = {
      fetchHeadToHead: vi.fn().mockResolvedValue([]),
    };

    render(
      <HeadToHead
        homeTeamId={1}
        awayTeamId={2}
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByTestId("expand-icon"));
    await waitFor(() => {
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });
  });

  it("renders match cards when data is returned", async () => {
    const apiService: Partial<ApiService> = {
      fetchHeadToHead: vi.fn().mockResolvedValue(mockH2HData),
    };

    render(
      <HeadToHead
        homeTeamId={1}
        awayTeamId={2}
        apiService={apiService as ApiService}
      />
    );
    fireEvent.click(screen.getByTestId("expand-icon"));

    await waitFor(() => {
      expect(screen.getByText(/Head to Head/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Camp Nou/i)).toBeInTheDocument();
    expect(screen.getByText(/La Liga/i)).toBeInTheDocument();
    expect(screen.getByText(/Season:/i)).toBeInTheDocument();
    expect(screen.getByText(/Round 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Winner:/i)).toBeInTheDocument();
    expect(screen.getByText(/Barcelona/i)).toBeInTheDocument();
  });
});
