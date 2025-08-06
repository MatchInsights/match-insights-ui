import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

vi.mock("../services/apiService", () => ({
  fetchTodayMatches: vi.fn().mockResolvedValue([]),
  fetchLeagueStanding: vi.fn().mockResolvedValue([]),
  fetchMatchDetails: vi.fn().mockResolvedValue([]),
  fetchLastFiveMatches: vi
    .fn()
    .mockResolvedValue({ homeTeamLastFive: [], awayTeamLastFive: [] }),
  fetchHeadToHead: vi.fn().mockResolvedValue([]),
  fetchSeasonStats: vi
    .fn()
    .mockResolvedValue({ homeTeamStats: {}, awayTeamStats: {} }),
  fetchH2HStats: vi
    .fn()
    .mockResolvedValue({ homeTeamStats: {}, awayTeamStats: {} }),
}));

vi.mock("../pages/home/Home", () => ({
  default: ({
    fetchTodayMatches,
  }: {
    fetchTodayMatches: (status: string) => Promise<any[]>;
  }) => {
    fetchTodayMatches("NOT_STARTED");
    return <div data-testid="home-page">Mock HomePage</div>;
  },
}));

vi.mock("./navigation/Navbar", () => ({
  default: () => <nav data-testid="navbar">Mock Navbar</nav>,
}));

vi.mock("./footer/Footer", () => ({
  default: () => <footer data-testid="footer">Mock Footer</footer>,
}));

describe("App", () => {
  it("renders Navbar, Footer, and HomePage on '/' route", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();

    const { fetchTodayMatches } = await import("../services/apiService");
    await waitFor(() => {
      expect(fetchTodayMatches).toHaveBeenCalledWith("NOT_STARTED");
    });
  });
});
