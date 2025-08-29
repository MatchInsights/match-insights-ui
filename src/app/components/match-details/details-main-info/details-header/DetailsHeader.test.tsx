import { render, screen } from "@testing-library/react";
import DetailsHeader from "./DetailsHeader";
import type { Team } from "../../../../types/types";
import { MemoryRouter } from "react-router-dom";

describe("DetailsHeader", () => {
  const homeTeam: Team = {
    id: 1,
    name: "Home Team",
    logo: "https://example.com/home-logo.png",
  };

  const awayTeam: Team = {
    id: 2,
    name: "Away Team",
    logo: "https://example.com/away-logo.png",
  };

  it("renders both team names", () => {
    render(
      <MemoryRouter>
        <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />;
      </MemoryRouter>
    );

    expect(screen.getByText("Home Team")).toBeInTheDocument();
    expect(screen.getByText("Away Team")).toBeInTheDocument();
  });

  it("renders both team logos when provided", () => {
    render(
      <MemoryRouter>
        <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />;
      </MemoryRouter>
    );

    expect(screen.getAllByTestId("team-logo").length).toBe(2);
  });

  it("renders links to team details page", () => {
    render(
      <MemoryRouter>
        <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />;
      </MemoryRouter>
    );

    expect(screen.getByTestId("home-team-link")).toHaveAttribute(
      "href",
      "/team/1"
    );
    expect(screen.getByTestId("away-team-link")).toHaveAttribute(
      "href",
      "/team/2"
    );
  });
});
