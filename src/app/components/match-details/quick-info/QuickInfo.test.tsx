import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import QuickInfo from "./QuickInfo";

vi.mock("./last-five-matches/LastFiveMatches", () => ({
  default: vi.fn(({ homeTeam, awayTeam }) => (
    <div data-testid="last-five-matches">
      LastFiveMatches: {homeTeam} vs {awayTeam}
    </div>
  )),
}));

vi.mock("./teams-rest-status/TeamRestStatus", () => ({
  default: vi.fn(({ homeTeam, awayTeam }) => (
    <div data-testid="teams-rest-status">
      RestStatus: {homeTeam} vs {awayTeam}
    </div>
  )),
}));

vi.mock("./teams-score-performance/TeamsScorePerformance", () => ({
  default: vi.fn(({ homeTeam, awayTeam }) => (
    <div data-testid="teams-score-performance">
      ScorePerformance: {homeTeam} vs {awayTeam}
    </div>
  )),
}));

describe("QuickInfo", () => {
  const mockApi = {} as any;
  const props = {
    apiService: mockApi,
    homeTeamId: 1,
    awayTeamId: 2,
    leagueId: 99,
    fixtureDate: "2025-08-30",
    homeTeam: "Home FC",
    awayTeam: "Away United",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all three child components with correct props", () => {
    render(<QuickInfo {...props} />);

    expect(screen.getByTestId("last-five-matches")).toHaveTextContent(
      "LastFiveMatches: Home FC vs Away United"
    );
    expect(screen.getByTestId("teams-score-performance")).toHaveTextContent(
      "ScorePerformance: Home FC vs Away United"
    );
    expect(screen.getByTestId("teams-rest-status")).toHaveTextContent(
      "RestStatus: Home FC vs Away United"
    );
  });
});
