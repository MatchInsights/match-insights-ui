import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders Footer component", () => {
    render(<Footer />);

    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} MatchInsights. All rights reserved.`
      )
    ).toBeInTheDocument();
  });
});
