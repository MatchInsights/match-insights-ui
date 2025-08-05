import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import About from "./About";

describe("AboutPage", () => {
  it("renders text and headers", () => {
    render(<About />);

    expect(screen.getByTestId("header-0")).toBeInTheDocument();
    expect(screen.getByTestId("header-1")).toBeInTheDocument();
    expect(screen.getByTestId("header-2")).toBeInTheDocument();
    expect(screen.getByTestId("text-0")).toBeInTheDocument();
    expect(screen.getByTestId("text-0")).toBeInTheDocument();
    expect(screen.getByTestId("text-0")).toBeInTheDocument();
  });
});
