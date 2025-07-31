import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the navbar with site title", () => {
    render(<Navbar />);
    expect(screen.getByText("Before You Bet")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Before You Bet" })
    ).toHaveAttribute("href", "/");
  });

  it("renders navigation links with correct hrefs", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const leaguesLink = screen.getByRole("link", { name: "Leagues" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    expect(leaguesLink).toBeInTheDocument();
    expect(leaguesLink).toHaveAttribute("href", "/leagues");

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("has a nav container", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
