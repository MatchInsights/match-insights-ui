import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import type { TodayMatch } from "../../types/types";
import { ApiService } from "../../services/apiService";

vi.mock("../../components/today-matches/TodayMatches", () => ({
  default: ({ apiService: ApiService }: { apiService: ApiService }) => {
    ApiService.fetchTodayMatches("TEST_STATUS");
    return <div data-testid="mock-today-matches">Mock TodayMatches</div>;
  },
}));

describe("HomePage", () => {
  it("renders TodayMatches component and passes fetchTodayMatches prop", () => {
    const apiService: Partial<ApiService> = {
      fetchTodayMatches: vi.fn().mockResolvedValue([]),
    };

    render(<Home apiService={apiService as ApiService} />);

    expect(screen.getByTestId("today-matches")).toBeInTheDocument();
    expect(screen.getByTestId("mock-today-matches")).toBeInTheDocument();
    expect(apiService.fetchTodayMatches).toHaveBeenCalledWith("TEST_STATUS");
  });
});
