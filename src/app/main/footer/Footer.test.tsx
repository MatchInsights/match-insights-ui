import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders Footer component", () => {
    render(<Footer />);

    expect(
      screen.getByText(`© ${new Date().getFullYear()} MatchInsights.`)
    ).toBeInTheDocument();
  });

  it("renders Footer social links", () => {
    render(<Footer />);

    expect(screen.getByTestId("x-link")).toBeInTheDocument();
    expect(screen.getByTestId("discord-link")).toBeInTheDocument();
    expect(screen.getByTestId("git-link")).toBeInTheDocument();
  });
});
