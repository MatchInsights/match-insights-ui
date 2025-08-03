import { render, screen } from "@testing-library/react";
import { DetailsMainCard } from "./DetailsMainCard";
import { MemoryRouter } from "react-router-dom";
import type { Team, League, Venue, Goal, Score } from "../../../types/types";

describe("DetailsMainCard", () => {
  const homeTeam: Team = {
    id: 1,
    name: "Home Team",
    logo: "home-logo.png",
  };

  const awayTeam: Team = {
    id: 2,
    name: "Away Team",
    logo: "away-logo.png",
  };

  const league: League = {
    id: 12,
    name: "Premier League",
    round: "Matchday 5",
    logo: "league-logo.png",
    country: "England",
    season: 2023,
    flag: "https://example.com/flag.png",
  };

  const venue: Venue = {
    name: "Stadium ABC",
    city: "City XYZ",
  };

  const goals: Goal = {
    home: 2,
    away: 1,
  };

  const scoreFT: Score = {
    fulltime: { home: 2, away: 1 },
  };

  const scoreScheduled: Score = {
    fulltime: { home: undefined, away: undefined },
  };

  const testDate = "2024-03-15T18:00:00Z";

  function renderCard(score: Score = scoreFT) {
    return render(
      <MemoryRouter>
        <DetailsMainCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          date={testDate}
          league={league}
          venue={venue}
          goals={goals}
          score={score}
        />
      </MemoryRouter>
    );
  }

  it("renders team names via DetailsHeader", () => {
    renderCard();
    expect(screen.getByText("Home Team")).toBeInTheDocument();
    expect(screen.getByText("Away Team")).toBeInTheDocument();
  });

  it("renders league name with correct link", () => {
    renderCard();
    const leagueLink = screen.getByTestId("league-link");
    expect(leagueLink).toHaveTextContent("🏆 Premier League — Matchday 5");
    expect(leagueLink).toHaveAttribute("href", "/league/12");
  });

  it("renders fallback league name if id is missing", () => {
    const badLeague = { id: null, name: "", round: "" } as League;
    render(
      <MemoryRouter>
        <DetailsMainCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          date={testDate}
          league={badLeague}
          venue={venue}
          goals={goals}
          score={scoreFT}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("league-link")).toHaveTextContent(
      "Unknown League"
    );
  });

  it("renders venue name and city", () => {
    renderCard();
    expect(screen.getByText(/Stadium ABC, City XYZ/)).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    renderCard();
    const expected = new Date(testDate).toLocaleString();
    expect(screen.getByText(`📅 ${expected}`)).toBeInTheDocument();
  });

  it("renders the correct score and FT label", () => {
    renderCard(scoreFT);
    expect(screen.getByText("2 : 1")).toBeInTheDocument();
    expect(screen.getByText("FT")).toBeInTheDocument();
  });

  it("renders dash score and Scheduled label when not fulltime", () => {
    renderCard(scoreScheduled);
    expect(screen.getByText("2 : 1")).toBeInTheDocument(); // goals still show
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
  });

  it("renders dash if goal values are null", () => {
    const nullGoals: Goal = { home: null, away: null };
    render(
      <MemoryRouter>
        <DetailsMainCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          date={testDate}
          league={league}
          venue={venue}
          goals={nullGoals}
          score={scoreScheduled}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("- : -")).toBeInTheDocument();
  });
});
