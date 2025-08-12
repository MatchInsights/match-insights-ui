import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TeamLogo from "./TeamLogo";

const getShieldIcon = () =>
  screen.queryByTestId("shield-icon") ||
  screen.queryByRole("img", { hidden: true });

describe("TeamLogo", () => {
  it("renders shield icon when no src is provided", () => {
    render(<TeamLogo />);
    expect(screen.getByTestId("shield-fallback")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(<TeamLogo src="https://example.com/logo.png" />);
    const img = screen.getByTestId("team-logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/logo.png");
  });
});
