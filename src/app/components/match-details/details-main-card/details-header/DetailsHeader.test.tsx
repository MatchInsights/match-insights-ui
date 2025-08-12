import { render, screen } from "@testing-library/react";
import DetailsHeader from "./DetailsHeader";
import type { Team } from "../../../../types/types";

describe("DetailsHeader", () => {
  const homeTeam: Team = {
    name: "Home Team",
    logo: "https://example.com/home-logo.png",
  };

  const awayTeam: Team = {
    name: "Away Team",
    logo: "https://example.com/away-logo.png",
  };

  it("renders both team names", () => {
    render(<DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />);

    expect(screen.getByText("Home Team")).toBeInTheDocument();
    expect(screen.getByText("Away Team")).toBeInTheDocument();
  });

  it("renders both team logos when provided", () => {
    render(<DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />);

    expect(screen.getAllByTestId("team-logo").length).toBe(2);
  });
});
