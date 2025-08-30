// TeamsRestStatusComponent.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TeamsRestStatusComponent from "./TeamRestStatus";

vi.mock("../../../pre-display/PreDisplay", () => ({
  default: ({ title, child, onRefresh }: any) => (
    <div data-testid="pre-display">
      <h2>{title}</h2>
      <button onClick={onRefresh}>Refresh</button>
      {child}
    </div>
  ),
}));

vi.mock("../../../no-data/NoData", () => ({
  default: ({ displayedMessage }: { displayedMessage: string }) => (
    <div data-testid="no-data">{displayedMessage}</div>
  ),
}));

describe("TeamsRestStatusComponent", () => {
  const homeTeamId = 1;
  const awayTeamId = 2;
  const fixtureDate = "2024-06-01";
  const homeTeam = "Home FC";
  const awayTeam = "Away United";

  const mockApi = {
    fetchTeamsRestStatus: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockApi.fetchTeamsRestStatus.mockResolvedValueOnce(null);

    render(
      <TeamsRestStatusComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={fixtureDate}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    expect(
      screen.getByText("Fetching Rest status for both teams.")
    ).toBeInTheDocument();
  });

  it("renders 'failed' state when API returns null", async () => {
    mockApi.fetchTeamsRestStatus.mockResolvedValueOnce(null);

    render(
      <TeamsRestStatusComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={fixtureDate}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Rest status for both teams.")
      ).toBeInTheDocument()
    );
  });

  it("renders statuses with correct color mapping", async () => {
    mockApi.fetchTeamsRestStatus.mockResolvedValueOnce({
      homeTeamStatus: "Severe Fatigue",
      awayTeamStatus: "Good Condition",
    });

    render(
      <TeamsRestStatusComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={fixtureDate}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    const severeStatus = await screen.findByText("Severe Fatigue");
    const goodStatus = await screen.findByText("Good Condition");

    expect(severeStatus).toHaveClass("bg-brand-danger");
    expect(goodStatus).toHaveClass("bg-brand-success");

    expect(screen.getByText("Home FC")).toBeInTheDocument();
    expect(screen.getByText("Away United")).toBeInTheDocument();
  });

  it("falls back to yellow style for unknown statuses", async () => {
    mockApi.fetchTeamsRestStatus.mockResolvedValueOnce({
      homeTeamStatus: "Neutral",
      awayTeamStatus: "Rested",
    });

    render(
      <TeamsRestStatusComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={fixtureDate}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    const neutral = await screen.findByText("Neutral");
    const rested = await screen.findByText("Rested");

    expect(neutral).toHaveClass("bg-brand-yellow");
    expect(rested).toHaveClass("bg-brand-yellow");
  });

  it("calls fetchTeamsRestStatus again when Refresh is clicked", async () => {
    mockApi.fetchTeamsRestStatus.mockResolvedValue(null);

    render(
      <TeamsRestStatusComponent
        apiService={mockApi as any}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        fixtureDate={fixtureDate}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByText("Failed Fetching Rest status for both teams.")
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Refresh"));
    expect(mockApi.fetchTeamsRestStatus).toHaveBeenCalledTimes(2);
  });
});
