import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlayerCard } from "./PlayerCard";
import { PlayerSummary } from "../../../../types/types";

describe("PlayerCard", () => {
  const mockPlayer: PlayerSummary = {
    name: "Lionel Messi",
    age: 36,
    position: "Forward",
    height: "1.70m",
    weight: "72kg",
    goals: 30,
    yellowCards: 3,
    redCards: 1,
    penaltiesScored: 5,
    penaltiesSaved: 0,
  };

  it("renders player information correctly", () => {
    render(<PlayerCard playerSummary={mockPlayer} />);

    expect(screen.getByText(/Lionel Messi/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 36/i)).toBeInTheDocument();
    expect(screen.getByText(/Position: Forward/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 1.70m/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 72kg/i)).toBeInTheDocument();

    expect(screen.getByText(/goals: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/yellow-cards: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/red-cards: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/penalties-scored: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/penalties-saved: 0/i)).toBeInTheDocument();
  });
});
