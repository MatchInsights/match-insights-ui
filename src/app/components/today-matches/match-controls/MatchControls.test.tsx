import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import MatchControls from "./MatchControls";
import { statuses } from "./MatchControls";

describe("MatchControls", () => {
  const setup = (
    status = "NOT_STARTED",
    teamFilter = "",
    leagueFilter = ""
  ) => {
    const setStatus = vi.fn();
    const setTeamFilter = vi.fn();
    const setLeagueFilter = vi.fn();

    render(
      <MatchControls
        status={status}
        setStatus={setStatus}
        teamFilter={teamFilter}
        setTeamFilter={setTeamFilter}
        leagueFilter={leagueFilter}
        setLeagueFilter={setLeagueFilter}
      />
    );

    return { setStatus, setTeamFilter, setLeagueFilter };
  };

  it("renders every status option from the list", () => {
    setup();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(statuses.length);
    statuses.forEach(({ value }) =>
      expect(screen.getByRole("option", { name: value })).toBeInTheDocument()
    );
  });

  it("reflects the initial selected status", () => {
    const currentStatus = "LIVE";
    setup(currentStatus);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe(currentStatus);
  });

  it("calls setStatus with the selected value when user changes it", async () => {
    const { setStatus } = setup("NOT_STARTED");
    const select = screen.getByRole("combobox");

    await userEvent.selectOptions(select, "FULL_TIME");
    expect(setStatus).toHaveBeenCalledWith("FULL_TIME");
  });

  it("calls setTeamFilter when user types in the team filter input", async () => {
    const { setTeamFilter } = setup();
    const teamInput = screen.getByPlaceholderText("Filter by team name...");

    await userEvent.type(teamInput, "Barcelona");
    expect(setTeamFilter).toHaveBeenCalledTimes("Barcelona".length);
  });

  it("calls setLeagueFilter when user types in the league filter input", async () => {
    const { setLeagueFilter } = setup();
    const leagueInput = screen.getByPlaceholderText("Filter by league...");

    await userEvent.type(leagueInput, "La Liga");
    expect(setLeagueFilter).toHaveBeenCalledTimes("La Liga".length);
  });
});
