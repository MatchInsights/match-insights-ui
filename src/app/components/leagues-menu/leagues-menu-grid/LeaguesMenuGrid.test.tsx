import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LeaguesMenuGrid } from "./LeaguesMenuGrid";

import { mockLeaguesGroups } from "../../../../../testSetup/leaguegroups";

describe("LeaguesMenuGrid component", () => {
  it("renders international leagues when not hidden", () => {
    render(
      <LeaguesMenuGrid
        internationals={mockLeaguesGroups.internationals}
        countryLeagues={[]}
        others={[]}
        setLeague={vi.fn()}
        closeMenu={vi.fn()}
        isInternationalHidden={false}
      />
    );

    expect(screen.getByText("Internationals")).toBeInTheDocument();
    expect(
      screen.getByText(mockLeaguesGroups.internationals[0].name)
    ).toBeInTheDocument();
  });

  it("does not render internationals when hidden", () => {
    render(
      <LeaguesMenuGrid
        internationals={mockLeaguesGroups.internationals}
        countryLeagues={[]}
        others={[]}
        setLeague={vi.fn()}
        closeMenu={vi.fn()}
        isInternationalHidden={true}
      />
    );

    expect(screen.queryByText("Internationals")).toBeNull();
    expect(screen.queryByText("World Cup")).toBeNull();
  });

  it("renders country leagues and their nested leagues", () => {
    render(
      <LeaguesMenuGrid
        internationals={[]}
        countryLeagues={mockLeaguesGroups.countryLeagues}
        others={[]}
        setLeague={vi.fn()}
        closeMenu={vi.fn()}
        isInternationalHidden={false}
      />
    );

    expect(screen.getByText("By Country")).toBeInTheDocument();
    expect(
      screen.getByText(mockLeaguesGroups.countryLeagues[0].country)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockLeaguesGroups.countryLeagues[0].leagues[0].name)
    ).toBeInTheDocument();
  });

  it("renders other leagues", () => {
    render(
      <LeaguesMenuGrid
        internationals={[]}
        countryLeagues={[]}
        others={mockLeaguesGroups.others}
        setLeague={vi.fn()}
        closeMenu={vi.fn()}
        isInternationalHidden={false}
      />
    );

    expect(screen.getByText("Others")).toBeInTheDocument();
    expect(
      screen.getByText(mockLeaguesGroups.others[0].name)
    ).toBeInTheDocument();
  });

  it("calls setLeague and closeMenu when a league is clicked", () => {
    const setLeague = vi.fn();
    const closeMenu = vi.fn();

    render(
      <LeaguesMenuGrid
        internationals={mockLeaguesGroups.internationals}
        countryLeagues={[]}
        others={[]}
        setLeague={setLeague}
        closeMenu={closeMenu}
        isInternationalHidden={false}
      />
    );

    const leagueItem = screen.getByTestId(
      `league-${mockLeaguesGroups.internationals[0].id}`
    );
    fireEvent.click(leagueItem);

    expect(setLeague).toHaveBeenCalledTimes(1);
    expect(closeMenu).toHaveBeenCalled();
  });
});
