import { render, screen } from "@testing-library/react";
import { TeamSquad } from "./TeamSquad";
import type { TeamPlayer } from "../../../types/types";

describe("TeamSquad", () => {
  const players: TeamPlayer[] = [
    {
      name: "J. Ruddy",
      age: 39,
      nationality: "Unknown",
      position: "Goalkeeper",
    },
    {
      name: "Max Thompson",
      age: 21,
      nationality: "Unknown",
      position: "Goalkeeper",
    },
    {
      name: "Cathal Heffernan",
      age: 20,
      nationality: "Unknown",
      position: "Defender",
    },
  ];

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
