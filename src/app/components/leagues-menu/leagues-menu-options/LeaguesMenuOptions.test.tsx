import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LeaguesMenuOptions } from "./LeaguesMenuOptions";

describe("LeaguesMenuOptions", () => {
  const mockItems = ["Premier League", "La Liga", "Bundesliga"];
  const mockSelectItem = vi.fn();

  const setup = (items = mockItems) =>
    render(<LeaguesMenuOptions items={items} selectItem={mockSelectItem} />);

  it("renders without crashing", () => {
    setup();
    expect(
      screen.getByRole("list", { name: /responsive-grid/i })
    ).toBeInTheDocument();
  });

  it("renders all items", () => {
    setup();
    mockItems.forEach((item) => {
      expect(screen.getByTestId(item)).toBeInTheDocument();
      expect(screen.getByText(item)).toBeVisible();
    });
  });

  it("calls selectItem when an item is clicked", () => {
    setup();
    const item = screen.getByText("Premier League");
    fireEvent.click(item);
    expect(mockSelectItem).toHaveBeenCalledWith("Premier League");
  });

  it("each item is focusable via tabIndex", () => {
    setup();
    mockItems.forEach((item) => {
      expect(screen.getByTestId(item)).toHaveAttribute("tabIndex", "0");
    });
  });

  it("renders correctly when no items are passed", () => {
    setup([]);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
  });
});
