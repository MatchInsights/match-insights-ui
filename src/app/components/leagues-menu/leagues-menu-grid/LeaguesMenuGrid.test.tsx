import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LeaguesMenuGrid } from "./LeaguesMenuGrid";
import { mockLeaguesGroups } from "../../../../../testSetup/leaguegroups";

vi.mock("../../logo/Logo", () => ({
  default: ({
    src,
    customImageClass,
  }: {
    src: string;
    customImageClass?: string;
  }) => <img data-testid="mock-logo" src={src} className={customImageClass} />,
}));

describe("LeaguesMenuGrid", () => {
  const mockSetLeague = vi.fn();
  const mockCloseMenu = vi.fn();

  const setup = (leagues) =>
    render(
      <LeaguesMenuGrid
        leagues={leagues}
        setLeague={mockSetLeague}
        closeMenu={mockCloseMenu}
      />
    );

  it("renders without crashing", () => {
    setup(mockLeaguesGroups.internationals);
    expect(
      screen.getByRole("list", { name: /responsive-grid/i })
    ).toBeInTheDocument();
  });

  it("renders all leagues with their names and logos", () => {
    setup(mockLeaguesGroups.internationals);
    mockLeaguesGroups.internationals.forEach((league) => {
      expect(screen.getByText(league.name)).toBeVisible();
      const logo = screen
        .getAllByTestId("mock-logo")
        .find((img) => img.getAttribute("src") === league.logo);
      expect(logo).toBeTruthy();
    });
  });

  it("calls setLeague and closeMenu when a league is clicked", () => {
    setup(mockLeaguesGroups.internationals);
    const leagueItem = screen.getByText(
      mockLeaguesGroups.internationals[0].name
    );
    fireEvent.click(leagueItem);

    expect(mockSetLeague).toHaveBeenCalled();
    expect(mockCloseMenu).toHaveBeenCalled();
  });
});
