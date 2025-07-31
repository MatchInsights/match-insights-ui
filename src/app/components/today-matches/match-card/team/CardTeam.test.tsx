import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardTeam from "./CardTeam";
import { Team } from "../../../../types/types";

describe("CardTeam", () => {
  const mockTeam: Team = {
    name: "FC Awesome",
    logo: "https://example.com/logo.png",
  };

  it("renders team name and logo when provided", () => {
    render(<CardTeam team={mockTeam} />);

    expect(screen.getByText("FC Awesome")).toBeInTheDocument();
    expect(screen.getByTestId("team-logo")).toBeInTheDocument();
  });

  it("renders unknownteam name when team is undefined", () => {
    render(<CardTeam team={undefined} />);

    expect(screen.getByText("Unknown Team")).toBeInTheDocument();
  });
});
