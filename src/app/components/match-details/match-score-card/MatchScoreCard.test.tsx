import { render, screen } from "@testing-library/react";
import MatchScoreCard from "./MatchScoreCard";
import type { Score } from "../../../types/types";

describe("MatchScoreCard", () => {
  const fullScore: Score = {
    halftime: { home: 1, away: 0 },
    fulltime: { home: 3, away: 2 },
  };

  const partialScore: Score = {
    halftime: { home: undefined, away: undefined },
    fulltime: { home: 2, away: 2 },
  };

  const emptyScore: Score = {
    halftime: { home: undefined, away: undefined },
    fulltime: { home: undefined, away: undefined },
  };

  it("renders both halftime and fulltime headings", () => {
    render(<MatchScoreCard score={fullScore} />);
    expect(screen.getByText("Halftime")).toBeInTheDocument();
    expect(screen.getByText("Fulltime")).toBeInTheDocument();
  });

  it("renders valid halftime and fulltime scores", () => {
    render(<MatchScoreCard score={fullScore} />);
    expect(screen.getByText("1 : 0")).toBeInTheDocument();
    expect(screen.getByText("3 : 2")).toBeInTheDocument();
  });

  it("renders dash for undefined halftime and valid fulltime", () => {
    render(<MatchScoreCard score={partialScore} />);
    expect(screen.getByText("- : -")).toBeInTheDocument();
    expect(screen.getByText("2 : 2")).toBeInTheDocument();
  });

  it("renders dashes when no score values are available", () => {
    render(<MatchScoreCard score={emptyScore} />);
    const dashScores = screen.getAllByText("- : -");
    expect(dashScores).toHaveLength(2);
  });
});
