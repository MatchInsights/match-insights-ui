import { render, screen } from "@testing-library/react";
import { TeamSquad } from "./TeamSquad";
import type { PlayerSummary } from "../../../types/types";
import { players } from "../../../../../testSetup/team";

describe("TeamSquad", () => {
  it("renders the Squad title", () => {
    render(<TeamSquad players={players} />);
    expect(screen.getByText("Squad")).toBeInTheDocument();
  });

  it("renders all players provided", () => {
    render(<TeamSquad players={players} />);
    players.forEach((player) => {
      expect(screen.getByText(player.name)).toBeInTheDocument();
    });
  });

  it("renders correctly with an empty list", () => {
    render(<TeamSquad players={[]} />);
    expect(screen.getByText("Squad")).toBeInTheDocument();
    expect(screen.queryByText(/Age:/)).not.toBeInTheDocument();
  });
});
