import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import PreDisplay from "./PreDisplay";

describe("PreDisplay", () => {
  const defaultProps = {
    child: <div>Child Content</div>,
    title: "Test Title",
    expanded: false,
    setExpanded: vi.fn(),
  };

  it("renders the title", () => {
    render(<PreDisplay {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders the arrow down icon when collapsed", () => {
    render(<PreDisplay {...defaultProps} />);
    expect(screen.getByText("▼")).toBeInTheDocument();
  });

  it("renders the arrow up icon when expanded", () => {
    render(<PreDisplay {...defaultProps} expanded={true} />);
    expect(screen.getByText("▲")).toBeInTheDocument();
  });

  it("calls setExpanded with correct value when clicked", () => {
    const setExpanded = vi.fn();
    render(<PreDisplay {...defaultProps} setExpanded={setExpanded} />);

    fireEvent.click(screen.getByRole("button"));
    expect(setExpanded).toHaveBeenCalledWith(true);
  });

  it("renders child content only when expanded", () => {
    const { rerender } = render(
      <PreDisplay {...defaultProps} expanded={false} />
    );
    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();

    rerender(<PreDisplay {...defaultProps} expanded={true} />);
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("renders a banner image when banner prop is provided", () => {
    render(<PreDisplay {...defaultProps} banner="/test.png" expanded={true} />);
    const img = screen.getByAltText("Test Title icon");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test.png");
  });

  it("applies custom titleClass when provided", () => {
    render(<PreDisplay {...defaultProps} titleClass="custom-class" />);
    expect(screen.getByText("Test Title")).toHaveClass("custom-class");
  });
});
