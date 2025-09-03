import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArrowStatusTile } from "./ArrowStatusTile";

describe("ArrowStatusTile", () => {
  it("renders an upward arrow with success colors when isUp=true and isFlat=false", () => {
    render(
      <ArrowStatusTile
        isUp={true}
        isFlat={false}
        status="Up"
        description="Everything is running smoothly"
      />
    );

    expect(screen.getByText("Up")).toBeInTheDocument();
    expect(
      screen.getByText("Everything is running smoothly")
    ).toBeInTheDocument();

    const arrowContainer = screen.getByTestId("arrow-icon");
    expect(arrowContainer).toHaveClass("bg-brand-success text-black");
  });

  it("renders a downward arrow with danger colors when isUp=false and isFlat=false", () => {
    render(
      <ArrowStatusTile
        isUp={false}
        isFlat={false}
        status="Down"
        description="Service is unavailable"
      />
    );

    expect(screen.getByText("Down")).toBeInTheDocument();
    expect(screen.getByText("Service is unavailable")).toBeInTheDocument();

    const arrowContainer = screen.getByTestId("arrow-icon");
    expect(arrowContainer).toHaveClass("bg-brand-danger text-white");
  });

  it("renders a flat arrow with yellow colors when isFlat=true", () => {
    render(
      <ArrowStatusTile
        isUp={false}
        isFlat={true}
        status="Flat"
        description="No significant change"
      />
    );

    expect(screen.getByText("Flat")).toBeInTheDocument();
    expect(screen.getByText("No significant change")).toBeInTheDocument();

    const arrowContainer = screen.getByTestId("arrow-icon");
    expect(arrowContainer).toHaveClass("bg-brand-yellow text-black");
  });

  it("renders both status and description correctly regardless of arrow", () => {
    render(
      <ArrowStatusTile
        isUp={true}
        isFlat={false}
        status="Custom Status"
        description="Custom Description"
      />
    );

    expect(screen.getByText("Custom Status")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });
});
