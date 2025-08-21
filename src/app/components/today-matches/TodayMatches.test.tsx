import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TodayMatches from "./TodayMatches";
import type { TodayMatch } from "../../types/types";
import { ApiService } from "../../services/apiService";

vi.mock("./match-card/MatchCard", () => ({
  default: ({ todayMatch }: { todayMatch: TodayMatch }) => (
    <div data-testid="match-card">
      {todayMatch.homeTeam.name} vs {todayMatch.awayTeam.name}
    </div>
  ),
}));

vi.mock("./match-controls/MatchControls", () => ({
  default: ({
    status,
    setStatus,
    teamFilter,
    setTeamFilter,
    leagueFilter,
    setLeagueFilter,
  }: any) => (
    <div>
      <button onClick={() => setStatus("IN_PLAY")}>Change Status</button>
      <input
        placeholder="Team Filter"
        value={teamFilter}
        onChange={(e) => setTeamFilter(e.target.value)}
      />
      <input
        placeholder="League Filter"
        value={leagueFilter}
        onChange={(e) => setLeagueFilter(e.target.value)}
      />
    </div>
  ),
}));

const mockMatches: TodayMatch[] = [
  {
    id: 1,
    date: "2024-06-01T15:00:00Z",
    matchStatus: {
      long: "Not Started",
      short: "NS",
      elapsed: 0,
      extra: 0,
    },
    venue: { name: "Stadium A", city: "City A" },
    homeTeam: { id: 101, name: "Team A" },
    awayTeam: { id: 102, name: "Team B" },
    league: {
      id: 201,
      name: "Premier League",
      country: "England",
      flag: "",
      season: 2024,
      round: "Regular Season - 1",
      logo: "",
    },
  },
  {
    id: 2,
    date: "2024-06-01T15:00:00Z",
    matchStatus: {
      long: "Not Started",
      short: "NS",
      elapsed: 0,
      extra: 0,
    },
    venue: { name: "Stadium A", city: "City A" },
    homeTeam: { id: 103, name: "Team C" },
    awayTeam: { id: 104, name: "Team D" },
    league: {
      id: 201,
      name: "La Liga",
      country: "Spain",
      flag: "",
      season: 2025,
      round: "Regular Season - 1",
      logo: "",
    },
  },
];

describe("TodayMatches", () => {
  let fetchTodayMatches: any;

  it("renders heading and calls fetchTodayMatches on mount", async () => {
    const apiService: Partial<ApiService> = {
      fetchTodayMatches: vi.fn().mockReturnValue(new Promise(() => {})),
    };

    render(<TodayMatches apiService={apiService as ApiService} />);
    expect(screen.getByText("No Data Available")).toBeInTheDocument();

    await waitFor(() => {
      expect(apiService.fetchTodayMatches).toHaveBeenCalledWith("NOT_STARTED");
    });
  });

  it("renders match cards after fetch", async () => {
    const apiService: Partial<ApiService> = {
      fetchTodayMatches: vi.fn().mockResolvedValue(mockMatches),
    };

    render(<TodayMatches apiService={apiService as ApiService} />);

    await waitFor(() => {
      expect(screen.getAllByTestId("match-card")).toHaveLength(2);
    });
  });

  it("shows no match message if filters exclude all matches", async () => {
    const apiService: Partial<ApiService> = {
      fetchTodayMatches: vi.fn().mockResolvedValue(mockMatches),
    };
    render(<TodayMatches apiService={apiService as ApiService} />);

    await waitFor(() => {
      expect(screen.getAllByTestId("match-card")).toHaveLength(2);
    });

    fireEvent.change(screen.getByPlaceholderText("Team Filter"), {
      target: { value: "Nonexistent Team" },
    });

    expect(
      screen.getByText("No matches found for the selected filters.")
    ).toBeInTheDocument();
  });

  it("filters by league", async () => {
    const apiService: Partial<ApiService> = {
      fetchTodayMatches: vi.fn().mockResolvedValue(mockMatches),
    };

    render(<TodayMatches apiService={apiService as ApiService} />);

    await waitFor(() => {
      expect(screen.getAllByTestId("match-card")).toHaveLength(2);
    });

    fireEvent.change(screen.getByPlaceholderText("League Filter"), {
      target: { value: "la liga" },
    });

    expect(screen.getAllByTestId("match-card")).toHaveLength(1);
    expect(screen.getByText("Team C vs Team D")).toBeInTheDocument();
  });

  it("refetches when status changes", async () => {
    const apiService: Partial<ApiService> = {
      fetchTodayMatches: vi.fn().mockResolvedValue(mockMatches),
    };

    render(<TodayMatches apiService={apiService as ApiService} />);

    await waitFor(() => {
      expect(apiService.fetchTodayMatches).toHaveBeenCalledWith("NOT_STARTED");
    });

    fireEvent.click(screen.getByText("Change Status"));

    await waitFor(() => {
      expect(apiService.fetchTodayMatches).toHaveBeenCalledWith("IN_PLAY");
    });
  });
});
