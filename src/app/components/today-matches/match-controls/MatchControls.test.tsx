import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MatchControls, { statuses } from "./MatchControls";

describe("MatchControls component", () => {
  it("renders all status options", () => {
    render(
      <MatchControls
        status="NOT_STARTED"
        setStatus={vi.fn()}
        teamFilter=""
        setTeamFilter={vi.fn()}
      />
    );

    statuses.forEach((statusOption) => {
      expect(screen.getByText(statusOption.value)).toBeInTheDocument();
    });
  });

  it("calls setStatus when a new status is selected", () => {
    const setStatusMock = vi.fn();
    render(
      <MatchControls
        status="NOT_STARTED"
        setStatus={setStatusMock}
        teamFilter=""
        setTeamFilter={vi.fn()}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "FULL_TIME" },
    });

    expect(setStatusMock).toHaveBeenCalledWith("FULL_TIME");
  });

  it("calls setTeamFilter when typing in the input", () => {
    const setTeamFilterMock = vi.fn();
    render(
      <MatchControls
        status="NOT_STARTED"
        setStatus={vi.fn()}
        teamFilter=""
        setTeamFilter={setTeamFilterMock}
      />
    );

    const input = screen.getByPlaceholderText("Filter by team name...");
    fireEvent.change(input, { target: { value: "Home FC" } });

    expect(setTeamFilterMock).toHaveBeenCalledWith("Home FC");
  });
});
