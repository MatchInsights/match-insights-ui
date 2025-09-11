import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LeagueTable } from "./LeagueTable";
import { LeagueTeamInfo } from "../../types/league-types";

const mockTeams: LeagueTeamInfo[] = [
  {
    teamId: 1,
    rank: 20,
    teamName: "Team A",
    logo: "https://team-a.png",
    points: 10,
    played: 5,
    won: 3,
    draw: 1,
    lost: 1,
    goalsFor: 8,
    goalsAgainst: 4,
    form: "WWDLW",
    update: "2025-02-01",
  },
  {
    teamId: 2,
    rank: 15,
    teamName: "Team B",
    logo: "https://team-b.png",
    points: 8,
    played: 5,
    won: 2,
    draw: 2,
    lost: 1,
    goalsFor: 6,
    goalsAgainst: 3,
    form: "WDDWL",
    update: "2025-02-01",
  },
];

describe("LeagueTable", () => {
  it("renders table headers correctly", () => {
    render(<LeagueTable teams={mockTeams} />);
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Pts")).toBeInTheDocument();
    expect(screen.getByText("Form")).toBeInTheDocument();
  });

  it("renders team rows with correct data", () => {
    render(<LeagueTable teams={mockTeams} />);

    expect(screen.getByText(mockTeams[0].teamName)).toBeInTheDocument();
    expect(screen.getByText(mockTeams[0].rank)).toBeInTheDocument();
    expect(screen.getByText(mockTeams[1].rank)).toBeInTheDocument();
    expect(screen.getByText(mockTeams[1].teamName)).toBeInTheDocument();
  });

  it("renders no rows when teams array is empty", () => {
    render(<LeagueTable teams={[]} />);
    const rows = screen.queryAllByRole("row");
    expect(rows.length).toBe(1);
  });
});
