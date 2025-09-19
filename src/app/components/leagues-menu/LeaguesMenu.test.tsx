import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LeaguesMenu } from "./LeaguesMenu";
import { mockLeaguesGroups } from "../../../../testSetup/leaguegroups";

vi.mock("./leagues-menu-grid/LeaguesMenuGrid", () => ({
  LeaguesMenuGrid: ({ leagues, setLeague, closeMenu }: any) => (
    <div data-testid="leagues-menu-grid">{leagues.length} leagues</div>
  ),
}));

vi.mock("./leagues-menu-options/LeaguesMenuOptions", () => ({
  LeaguesMenuOptions: ({ items, selectItem }: any) => (
    <div data-testid="leagues-menu-options">
      {items.map((item: string) => (
        <button key={item} onClick={() => selectItem(item)}>
          {item}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("../no-data/NoData", () => ({
  default: ({ displayedMessage }: any) => (
    <div data-testid="no-data">{displayedMessage}</div>
  ),
}));

describe("LeaguesMenu Component", () => {
  let setLeagueMock = vi.fn();

  let mockApiService: any;

  beforeEach(() => {
    mockApiService = {
      fetchLeaguesGroups: vi.fn(),
    };
  });

  it("renders the menu ball icon", () => {
    render(
      <LeaguesMenu setLeague={setLeagueMock} apiService={mockApiService} />
    );
    expect(screen.getByTestId("menu-ball-icon")).toBeInTheDocument();
  });

  it("opens menu on clicking ball icon and shows loading", async () => {
    mockApiService.fetchLeaguesGroups.mockReturnValue(new Promise(() => {}));

    render(
      <LeaguesMenu setLeague={setLeagueMock} apiService={mockApiService} />
    );
    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    expect(screen.getByTestId("leagues-menu")).toBeInTheDocument();
    expect(screen.getByTestId("no-data").textContent).toContain(
      "Fetching Leagues..."
    );
  });

  it("displays leagues for a selected option", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);

    render(
      <LeaguesMenu setLeague={setLeagueMock} apiService={mockApiService} />
    );
    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    await waitFor(() => screen.getByTestId("leagues-menu-options"));
    fireEvent.click(screen.getByText("Internationals"));

    await waitFor(() => {
      expect(screen.getByTestId("leagues-menu-grid").textContent).toContain(
        "2 leagues"
      );
    });
  });

  it("closes menu on clicking close icon", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);

    render(
      <LeaguesMenu setLeague={setLeagueMock} apiService={mockApiService} />
    );
    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    await waitFor(() => screen.getByTestId("leagues-menu-options"));

    fireEvent.click(screen.getByTestId("close-leagues-menu-icon"));
    expect(screen.queryByTestId("leagues-menu")).not.toBeInTheDocument();
  });

  it("filters options based on search input", async () => {
    mockApiService.fetchLeaguesGroups.mockResolvedValue(mockLeaguesGroups);

    render(
      <LeaguesMenu setLeague={setLeagueMock} apiService={mockApiService} />
    );
    fireEvent.click(screen.getByTestId("menu-ball-icon"));

    await waitFor(() => screen.getByTestId("leagues-menu-options"));

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "spa" },
    });

    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.queryByText("Internationals")).not.toBeInTheDocument();
  });
});
