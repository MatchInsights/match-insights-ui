import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DetailsHeader from "./DetailsHeader";

vi.mock("../../../team-logo/TeamLogo", () => ({
  default: ({ src }: { src: string }) => <img src={src} alt="team logo" />,
}));

describe("DetailsHeader", () => {
  const homeTeam = { id: 1, name: "Home FC", logo: "home-logo.png" };
  const awayTeam = { id: 2, name: "Away United", logo: "away-logo.png" };

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />
      </MemoryRouter>
    );

  it("renders the home team link with correct text and href", () => {
    renderComponent();

    const homeLink = screen.getByTestId("home-team-link");
    expect(homeLink).toHaveAttribute("href", "/team/1");
    expect(screen.getByText("Home FC")).toBeInTheDocument();

    const homeLogo = screen.getAllByAltText("team logo")[0];
    expect(homeLogo).toHaveAttribute("src", "home-logo.png");
  });

  it("renders the away team link with correct text and href", () => {
    renderComponent();

    const awayLink = screen.getByTestId("away-team-link");
    expect(awayLink).toHaveAttribute("href", "/team/2");
    expect(screen.getByText("Away United")).toBeInTheDocument();

    const awayLogo = screen.getAllByAltText("team logo")[1];
    expect(awayLogo).toHaveAttribute("src", "away-logo.png");
  });

  it("renders both team names in the document", () => {
    renderComponent();

    expect(screen.getByText("Home FC")).toBeInTheDocument();
    expect(screen.getByText("Away United")).toBeInTheDocument();
  });
});
