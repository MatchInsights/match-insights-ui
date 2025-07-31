import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardInfo from "./CardInfo";
import { MatchStatus, Venue, League } from "../../../../types/types";

describe("CardInfo", () => {
  const mockStatus: MatchStatus = {
    long: "In Progress",
    elapsed: 42,
  };

  const mockVenue: Venue = {
    name: "National Stadium",
  };

  const mockLeague: League = {
    name: "Champions League",
  };

  it("renders match status and elapsed time", () => {
    render(
      <CardInfo
        date="2023-09-10T18:00:00Z"
        matchStatus={mockStatus}
        venue={mockVenue}
        league={mockLeague}
      />
    );

    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("(42 min)")).toBeInTheDocument();
  });

  it("renders league name and venue name", () => {
    render(
      <CardInfo
        date="2023-09-10T18:00:00Z"
        matchStatus={undefined}
        venue={mockVenue}
        league={mockLeague}
      />
    );

    expect(screen.getByText("🏆 Champions League")).toBeInTheDocument();
    expect(screen.getByText("🏟 National Stadium")).toBeInTheDocument();
  });

  it("renders date and time correctly", () => {
    render(
      <CardInfo
        date="2023-09-10T18:00:00Z"
        matchStatus={undefined}
        venue={undefined}
        league={undefined}
      />
    );

    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{2,4}/;
    const timeRegex = /\d{1,2}:\d{2}/;

    expect(
      screen.getByText((content) => dateRegex.test(content))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => timeRegex.test(content))
    ).toBeInTheDocument();
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

    expect(screen.getByText("Unknown Status")).toBeInTheDocument();
    expect(screen.getByText("🏆 Unknown League")).toBeInTheDocument();
    expect(screen.getByText("🏟 Unknown Venue")).toBeInTheDocument();
    expect(
      screen.getByText("📅 Unknown Date — ⏰ Unknown Time")
    ).toBeInTheDocument();
  });

  it("handles invalid date format gracefully", () => {
    render(
      <CardInfo
        date="invalid-date"
        matchStatus={mockStatus}
        venue={mockVenue}
        league={mockLeague}
      />
    );
    expect(
      screen.getByText("📅 Invalid Date — ⏰ Invalid Date")
    ).toBeInTheDocument();
  });
});
