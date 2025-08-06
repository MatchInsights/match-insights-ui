import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { apiService } from "../../../testSetup/apiMock";
import { ApiService } from "../services/apiService";

vi.mock("../services/apiService", () => apiService);

vi.mock("../pages/home/Home", () => ({
  default: ({ apiService: ApiService }: { apiService: ApiService }) => {
    apiService.fetchTodayMatches("NOT_STARTED");
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
  });
});
