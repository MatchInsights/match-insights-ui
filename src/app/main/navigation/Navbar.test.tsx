import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the navbar with site title", () => {
    render(<Navbar />);
    expect(screen.getByText("MatchInsights")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "MatchInsights" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("renders navigation links with correct hrefs", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("has a nav container", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
