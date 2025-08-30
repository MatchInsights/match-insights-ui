import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardHeader from "./CardHeader";

describe("CardHeader component", () => {
  const homeTeam = { id: 1, name: "Home FC", logo: "home-logo.png" };
  const awayTeam = { id: 2, name: "Away FC", logo: "away-logo.png" };

  it("renders home and away team names and logos", () => {
    render(<CardHeader hometeam={homeTeam} awayteam={awayTeam} />);

    expect(screen.getByText("Home FC")).toBeInTheDocument();
    expect(screen.getByText("Away FC")).toBeInTheDocument();

    const images = screen.getAllByTestId("team-logo");
    expect(images[0]).toHaveAttribute("src", "home-logo.png");
    expect(images[1]).toHaveAttribute("src", "away-logo.png");
  });

  it("renders fallback text when teams are undefined", () => {
    render(<CardHeader hometeam={undefined} awayteam={undefined} />);

    expect(screen.getAllByText("Unknown Team")).toHaveLength(2);
  });
});
