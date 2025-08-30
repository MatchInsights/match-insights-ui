import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import MatchCard from "./MatchCard";

const mockMatch = {
  id: 123,
  homeTeam: { id: 1, name: "Home FC", logo: "home-logo.png" },
  awayTeam: { id: 2, name: "Away FC", logo: "away-logo.png" },
  date: "2025-08-30T15:00:00Z",
  matchStatus: { long: "Live", elapsed: 30 },
  venue: { id: 1, name: "Stadium", city: "City" },
  league: { id: 1, name: "Premier League" },
};

describe("MatchCard component", () => {
  it("renders teams and match info correctly", () => {
    render(
      <MemoryRouter>
        <MatchCard todayMatch={mockMatch} />
      </MemoryRouter>
    );

    expect(screen.getByText("Home FC")).toBeInTheDocument();
    expect(screen.getByText("Away FC")).toBeInTheDocument();

    expect(screen.getByText(/Premier League/)).toBeInTheDocument();

    expect(screen.getByText(/Live/)).toBeInTheDocument();
    expect(screen.getByText(/\(30 min\)/)).toBeInTheDocument();

    expect(screen.getByText(/Stadium/)).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/match/123");
  });
});
