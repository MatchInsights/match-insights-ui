import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NoData from "./NoData";

describe("NoData component", () => {
  it("renders the displayed message", () => {
    render(<NoData displayedMessage="No results found" />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders an image with the expected alt text", () => {
    render(<NoData displayedMessage="Nothing to show" />);
    const img = screen.getByAltText("status gif") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBeTruthy();
  });
});
