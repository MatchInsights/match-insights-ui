import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TodayMatches from "./TodayMatches";
import type { TodayMatch } from "../../types/types";

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
    date: "2025-07-31",
    homeTeam: { name: "Team A" },
    awayTeam: { name: "Team B" },
    league: { name: "Premier League" },
  },
  {
    date: "2025-07-31",
    homeTeam: { name: "Team C" },
    awayTeam: { name: "Team D" },
    league: { name: "La Liga" },
  },
];

describe("TodayMatches", () => {
  let fetchTodayMatches: any;

  beforeEach(() => {
    fetchTodayMatches = vi.fn().mockResolvedValue(mockMatches);
  });

  it("renders heading and calls fetchTodayMatches on mount", async () => {
    render(<TodayMatches fetchTodayMatches={fetchTodayMatches} />);
    expect(screen.getByText("Loading Today Matches...")).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchTodayMatches).toHaveBeenCalledWith("NOT_STARTED");
    });
  });

  it("renders match cards after fetch", async () => {
    render(<TodayMatches fetchTodayMatches={fetchTodayMatches} />);

    await waitFor(() => {
      expect(screen.getAllByTestId("match-card")).toHaveLength(2);
    });
  });

  it("shows no match message if filters exclude all matches", async () => {
    render(<TodayMatches fetchTodayMatches={fetchTodayMatches} />);

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
    render(<TodayMatches fetchTodayMatches={fetchTodayMatches} />);

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
    render(<TodayMatches fetchTodayMatches={fetchTodayMatches} />);

    await waitFor(() => {
      expect(fetchTodayMatches).toHaveBeenCalledWith("NOT_STARTED");
    });

    fireEvent.click(screen.getByText("Change Status"));

    await waitFor(() => {
      expect(fetchTodayMatches).toHaveBeenCalledWith("IN_PLAY");
    });
  });
});
