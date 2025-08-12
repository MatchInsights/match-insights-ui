import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MatchCard from "./MatchCard"; // adjust if necessary
import { TodayMatch } from "../../../types/types";
import { MemoryRouter } from "react-router-dom";

describe("MatchCard", () => {
  const mockTodayMatch: TodayMatch = {
    homeTeam: {
      name: "Alpha FC",
      logo: "https://example.com/alpha.png",
    },
    awayTeam: {
      name: "Beta United",
      logo: "https://example.com/beta.png",
    },
    date: "2023-09-15T18:00:00Z",
    matchStatus: {
      long: "Live",
      elapsed: 25,
    },
    venue: {
      name: "Main Stadium",
    },
    league: {
      id: 1,
      name: "Super League",
    },
  };

  it("renders both team names and logos", () => {
    render(
      <MemoryRouter>
        <MatchCard todayMatch={mockTodayMatch} />
      </MemoryRouter>
    );

    expect(screen.getByText("Alpha FC")).toBeInTheDocument();
    expect(screen.getByText("Beta United")).toBeInTheDocument();

    const images = screen.getAllByTestId("team-logo");
    expect(images).toHaveLength(2);
  });

  it("renders the match info from CardInfo", () => {
    render(
      <MemoryRouter>
        <MatchCard todayMatch={mockTodayMatch} />
      </MemoryRouter>
    );

    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("(25 min)")).toBeInTheDocument();
    expect(screen.getByText("🏟 Main Stadium")).toBeInTheDocument();
    expect(screen.getByTestId("league")).toBeInTheDocument();

    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{2,4}/;
    const timeRegex = /\d{1,2}:\d{2}/;

    expect(
      screen.getByText((text) => dateRegex.test(text))
    ).toBeInTheDocument();
    expect(
      screen.getByText((text) => timeRegex.test(text))
    ).toBeInTheDocument();
  });
});
