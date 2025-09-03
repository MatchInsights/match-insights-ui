import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LeagueStanding from "./LeagueStanding";
import { LeagueInfo } from "../../types/league-types";

vi.mock("../../components/no-data/NoData", () => ({
  default: ({ displayedMessage }: { displayedMessage: string }) => (
    <div data-testid="no-data">{displayedMessage}</div>
  ),
}));

vi.mock("../../components/sub-header/SubHeader", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="sub-header">{title}</div>
  ),
}));

vi.mock("../../components/CategoryPills/CategoryPills", () => ({
  CategoryPills: ({
    categories,
    selectedCategory,
  }: {
    categories: string[];
    selectedCategory: string;
  }) => (
    <div data-testid="category-pills">
      {categories.join(",")} - {selectedCategory}
    </div>
  ),
}));

vi.mock("../../components/league-table/LeagueTable", () => ({
  LeagueTable: ({ teams }: { teams: any[] }) => (
    <div data-testid="league-table">{teams.length} teams</div>
  ),
}));

vi.mock("../../components/logo/Logo", () => ({
  default: ({ src }: { src: string }) => (
    <img data-testid="logo" src={src} alt="logo" />
  ),
}));

const mockLeagueInfo: LeagueInfo = {
  id: 1,
  name: "Mock League",
  country: "Mockland",
  logo: "https://mock-logo.png",
  flag: "https://mock-flag.png",
  season: 2025,
  group: [
    {
      label: "Group A",
      teams: [
        {
          teamId: 1,
          rank: 1,
          teamName: "Team A",
          logo: "https://team-a.png",
          points: 10,
          played: 5,
          won: 3,
          draw: 1,
          lost: 1,
          goalsFor: 8,
          goalsAgainst: 4,
          form: "WWDLW",
          update: "2025-02-01",
        },
      ],
    },
  ],
};

function renderWithRouter(ui: React.ReactNode, leagueId: string) {
  return render(
    <MemoryRouter initialEntries={[`/league/${leagueId}`]}>
      <Routes>
        <Route path="/league/:leagueId" element={ui} />
      </Routes>
    </MemoryRouter>
  );
}

describe("LeagueStanding", () => {
  let apiService: any;

  beforeEach(() => {
    apiService = {
      fetchLeagueStanding: vi.fn(),
    };
  });

  it("renders loading state initially", () => {
    apiService.fetchLeagueStanding.mockReturnValue(new Promise(() => {}));

    renderWithRouter(<LeagueStanding apiService={apiService} />, "1");

    expect(screen.getByTestId("no-data")).toHaveTextContent(
      "Fetching League Details."
    );
  });

  it("renders error state when API fails", async () => {
    apiService.fetchLeagueStanding.mockRejectedValue(new Error("API Error"));

    renderWithRouter(<LeagueStanding apiService={apiService} />, "1");

    await waitFor(() =>
      expect(screen.getByTestId("no-data")).toHaveTextContent(
        "League Details Not Found."
      )
    );
  });
  it("renders league info on success", async () => {
    apiService.fetchLeagueStanding.mockResolvedValue(mockLeagueInfo);

    renderWithRouter(<LeagueStanding apiService={apiService} />, "1");

    expect(await screen.findByTestId("sub-header")).toHaveTextContent(
      "League Standing"
    );

    expect(await screen.getByTestId("h1-category")).toHaveTextContent(
      "Group A - 2025"
    );

    expect(await screen.findByTestId("category-pills")).toHaveTextContent(
      "Group A - Group A"
    );

    expect(await screen.findByTestId("league-table")).toHaveTextContent(
      "1 teams"
    );
  });
});
