import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { DetailsSection } from "./DetailsSection";

describe("DetailsSection", () => {
  const mockComponents = [
    <div key="1">Component 1</div>,
    <div key="2">Component 2</div>,
  ];

  it("renders all provided components", () => {
    render(<DetailsSection components={mockComponents} />);
    expect(screen.getByText("Component 1")).toBeInTheDocument();
    expect(screen.getByText("Component 2")).toBeInTheDocument();
  });

  it("applies default container and card class names", () => {
    const { container } = render(
      <DetailsSection components={mockComponents} />
    );
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass("space-y-6");

    const cardDivs = containerDiv.querySelectorAll("div.rounded-2xl");
    expect(cardDivs.length).toBe(2);
    expect(cardDivs[0]).toHaveClass("p-4", "sm:p-6", "md:p-8");
  });

  it("applies custom container and card class names", () => {
    const { container } = render(
      <DetailsSection
        components={mockComponents}
        containerClassName="custom-container"
        cardClassName="custom-card"
      />
    );
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass("custom-container");

    const cardDivs = containerDiv.querySelectorAll("div.custom-card");
    expect(cardDivs.length).toBe(2);
  });

  it("renders with sectionId as data-testid", () => {
    render(
      <DetailsSection components={mockComponents} sectionId="test-section" />
    );
    expect(screen.getByTestId("test-section")).toBeInTheDocument();
  });
});
