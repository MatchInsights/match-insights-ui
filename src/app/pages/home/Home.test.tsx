import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import type { TodayMatch } from "../../types/types";

vi.mock("../../components/today-matches/TodayMatches", () => ({
  default: ({
    fetchTodayMatches,
  }: {
    fetchTodayMatches: (status: string) => Promise<TodayMatch[]>;
  }) => {
    fetchTodayMatches("TEST_STATUS");
    return <div data-testid="mock-today-matches">Mock TodayMatches</div>;
  },
}));

describe("HomePage", () => {
  it("renders TodayMatches component and passes fetchTodayMatches prop", () => {
    const mockFetch = vi.fn().mockResolvedValue([]);
    render(<Home fetchTodayMatches={mockFetch} />);

    expect(screen.getByTestId("today-matches")).toBeInTheDocument();
    expect(screen.getByTestId("mock-today-matches")).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith("TEST_STATUS");
  });
});
