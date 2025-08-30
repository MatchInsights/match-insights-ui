import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodayMatches from "./TodayMatches";
import { TodayMatch } from "../../types/types";
import { mockTodayMatches } from "../../../../testSetup/matches";
import { MemoryRouter } from "react-router-dom";

const mockMatches: TodayMatch[] = mockTodayMatches;

describe("TodayMatches component", () => {
  it("renders no matches message when matches array is empty", () => {
    render(
      <MemoryRouter>
        <TodayMatches matches={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No matches found/i)).toBeInTheDocument();
  });

  it("renders MatchCard components for each match", () => {
    render(
      <MemoryRouter>
        <TodayMatches matches={mockMatches} />
      </MemoryRouter>
    );
    mockMatches.forEach((match) => {
      expect(screen.getByText(match.homeTeam.name)).toBeInTheDocument();
      expect(screen.getByText(match.awayTeam.name)).toBeInTheDocument();
    });
  });
});
