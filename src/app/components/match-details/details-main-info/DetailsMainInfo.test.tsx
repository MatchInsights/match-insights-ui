import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { DetailsMainInfo } from "./DetailsMainInfo";

vi.mock("../../ball-animation/BallAnimation", () => ({
  BallAnimation: ({ isSubHeader }: { isSubHeader: boolean }) => (
    <div data-testid={`ball-animation-${isSubHeader ? "subheader" : "main"}`} />
  ),
}));

vi.mock("./details-header/DetailsHeader", () => ({
  default: ({ homeTeam, awayTeam }: any) => (
    <div data-testid="details-header">
      <span>{homeTeam.name}</span> vs <span>{awayTeam.name}</span>
    </div>
  ),
}));

describe("DetailsMainInfo", () => {
  const homeTeam = { id: 1, name: "Home FC", logo: "home.png" };
  const awayTeam = { id: 2, name: "Away United", logo: "away.png" };
  const league = { id: 10, name: "Premier League", season: 2025 };
  const venue = { id: 100, name: "Big Stadium", city: "Metropolis" };
  const goals = { home: 2, away: 1 };
  const score = {
    halftime: { home: 1, away: 0 },
    fulltime: { home: 2, away: 1 },
  };

  const renderComponent = (overrideProps = {}) =>
    render(
      <MemoryRouter>
        <DetailsMainInfo
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          date="2024-03-10T15:30:00Z"
          league={league}
          venue={venue}
          goals={goals}
          score={score}
          {...overrideProps}
        />
      </MemoryRouter>
    );

  it("renders BallAnimation on both sides", () => {
    renderComponent();
    expect(screen.getAllByTestId(/ball-animation/)).toHaveLength(2);
  });

  it("renders DetailsHeader with both team names", () => {
    renderComponent();
    expect(screen.getByTestId("details-header")).toHaveTextContent(
      "Home FC vs Away United"
    );
  });

  it("renders league link with correct href and name", () => {
    renderComponent();
    const leagueLink = screen.getByTestId("league-link");
    expect(leagueLink).toHaveAttribute("href", "/league/10");
    expect(leagueLink).toHaveTextContent("Premier League");
  });

  it("renders fallback league text when league id is missing", () => {
    renderComponent({ league: { id: undefined, name: "" } });
    expect(screen.getByTestId("league-link")).toHaveTextContent(
      "Unknown League"
    );
  });

  it("renders venue and date correctly", () => {
    renderComponent();
    expect(screen.getByText(/Big Stadium, Metropolis/)).toBeInTheDocument();
    expect(screen.getByText(/📅/)).toBeInTheDocument(); // formatted date
  });
});
