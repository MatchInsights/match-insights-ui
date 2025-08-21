import { render, screen } from "@testing-library/react";
import TeamInfo from "./TeamInfo";
import type { TeamDetails } from "../../../types/types";

describe("TeamInfo", () => {
  const baseTeam: TeamDetails = {
    teamName: "Newcastle",
    teamLogo: "https://example.com/logo.png",
    teamCountry: "England",
    teamFounded: 1892,
    venueName: "St. James' Park",
    venueCity: "Newcastle upon Tyne",
    venueCapacity: 52758,
    coachName: "E. Howe",
    coachAge: 48,
  };

  it("renders the team name and country", () => {
    render(<TeamInfo teamDetails={baseTeam} />);
    expect(screen.getByText("Newcastle")).toBeInTheDocument();
    expect(screen.getByText(/England • Founded/)).toBeInTheDocument();
  });

  it("renders founded year when valid", () => {
    render(<TeamInfo teamDetails={baseTeam} />);
    expect(screen.getByText(/Founded 1892/)).toBeInTheDocument();
  });

  it("renders 'Unknown' if founded year is invalid", () => {
    const team = { ...baseTeam, teamFounded: -1 };
    render(<TeamInfo teamDetails={team} />);
    expect(screen.getByText(/Founded Unknown/)).toBeInTheDocument();
  });

  it("renders 'Unknown' for capacity when invalid", () => {
    const team = { ...baseTeam, venueCapacity: -1 };
    render(<TeamInfo teamDetails={team} />);
    expect(screen.getByText(/Capacity: Unknown/)).toBeInTheDocument();
  });

  it("renders coach details with age", () => {
    render(<TeamInfo teamDetails={baseTeam} />);
    expect(screen.getByText("E. Howe")).toBeInTheDocument();
    expect(screen.getByText(/48 years old/)).toBeInTheDocument();
  });

  it("renders 'Unknown Age' if coach age is invalid", () => {
    const team = { ...baseTeam, coachAge: -1 };
    render(<TeamInfo teamDetails={team} />);
    expect(screen.getByText("Unknown Age")).toBeInTheDocument();
  });

  it("falls back to TeamLogo icon when no logo provided", () => {
    const team = { ...baseTeam, teamLogo: "" };
    render(<TeamInfo teamDetails={team} />);
    expect(screen.getByTestId("shield-fallback")).toBeInTheDocument();
  });
});
