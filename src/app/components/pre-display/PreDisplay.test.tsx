import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PreDisplay from "./PreDisplay";

describe("PreDisplay component", () => {
  it("renders the title and child content", () => {
    render(
      <PreDisplay
        title="Test Title"
        onRefresh={() => {}}
        child={<p>Child Content</p>}
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("calls onRefresh when refresh button is clicked", () => {
    const mockRefresh = vi.fn();
    render(
      <PreDisplay
        title="Refresh Test"
        onRefresh={mockRefresh}
        child={<p>Content</p>}
      />
    );

    const button = screen.getByTestId("refresh-icon");
    fireEvent.click(button);
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("uses default title class if none is provided", () => {
    render(
      <PreDisplay title="Default Class" onRefresh={() => {}} child={<p />} />
    );
    const titleEl = screen.getByText("Default Class");
    expect(titleEl).toHaveClass(
      "flex-grow text-brand-white text-2xl font-bold"
    );
  });

  it("uses custom title class if provided", () => {
    render(
      <PreDisplay
        title="Custom Class"
        titleClass="custom-class"
        onRefresh={() => {}}
        child={<p />}
      />
    );
    const titleEl = screen.getByText("Custom Class");
    expect(titleEl).toHaveClass("custom-class");
  });
});
