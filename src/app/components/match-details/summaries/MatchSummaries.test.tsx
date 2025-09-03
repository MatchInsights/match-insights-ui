import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MatchSummaries from "./MatchSummaries";

vi.mock("./match-events/MatchEvents", () => ({
  default: vi.fn(({ title, teamId }) => (
    <div data-testid={`match-events-${teamId}`}>{title}</div>
  )),
}));

vi.mock("./ranks-and-points/RanksAndPoints", () => ({
  RanksAndPoints: vi.fn(({ homeTeamId, awayTeamId }) => (
    <div data-testid="ranks-and-points">
      RanksAndPoints: {homeTeamId} vs {awayTeamId}
    </div>
  )),
}));

vi.mock("./odds-winner-feeling/OddsWinnerFeeling", () => ({
  default: vi.fn(({ homeTeam, awayTeam, fixtureId }) => (
    <div data-testid="odds-winner-feeling">
      OddsWinnerFeeling: {homeTeam} vs {awayTeam} ({fixtureId})
    </div>
  )),
}));

describe("SummariesAndFeeling", () => {
  const mockApi = {} as any;
  const props = {
    apiService: mockApi,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeam: "Home FC",
    awayTeam: "Away United",
    leagueId: 99,
    matchId: 123,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all children with correct props", () => {
    render(<MatchSummaries {...props} />);

    expect(
      screen.getByTestId(`match-events-${props.homeTeamId}`)
    ).toHaveTextContent("Home FC Last Five Matches Summary");

    expect(
      screen.getByTestId(`match-events-${props.awayTeamId}`)
    ).toHaveTextContent("Away United Last Five Matches Summary");

    expect(screen.getByTestId("ranks-and-points")).toHaveTextContent(
      "RanksAndPoints: 1 vs 2"
    );

    expect(screen.getByTestId("odds-winner-feeling")).toHaveTextContent(
      "OddsWinnerFeeling: Home FC vs Away United (123)"
    );
  });
});
