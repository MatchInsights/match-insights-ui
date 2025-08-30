import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardInfo from "./CardInfo";

describe("CardInfo component", () => {
  const mockDate = "2025-08-30T14:30:00Z";

  it("renders all props correctly", () => {
    render(
      <CardInfo
        date={mockDate}
        matchStatus={{ long: "Live", elapsed: 55, short: "" }}
        venue={{ name: "Stadium A", city: "City X" }}
        league={{ id: 1, name: "Premier League", season: 2025 }}
      />
    );

    expect(screen.getByText(/Live/)).toBeInTheDocument();
    expect(screen.getByText(/\(55 min\)/)).toBeInTheDocument();
    expect(screen.getByTestId("league")).toHaveTextContent("Premier League");
    expect(screen.getByText(/🏟 Stadium A/)).toBeInTheDocument();
    expect(screen.getByText(/📅/)).toBeInTheDocument();
    expect(screen.getByText(/⏰/)).toBeInTheDocument();
  });

  it("renders fallback values when props are undefined", () => {
    render(
      <CardInfo
        date={undefined}
        matchStatus={undefined}
        venue={undefined}
        league={undefined}
      />
    );

    expect(screen.getByText(/Unknown Status/)).toBeInTheDocument();
    expect(screen.getByTestId("league")).toHaveTextContent("Unknown League");
    expect(screen.getByText(/Unknown Venue/)).toBeInTheDocument();
    expect(screen.getByText(/Unknown Date/)).toBeInTheDocument();
    expect(screen.getByText(/Unknown Time/)).toBeInTheDocument();
  });
});
