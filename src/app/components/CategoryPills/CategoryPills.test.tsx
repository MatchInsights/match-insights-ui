import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryPills } from "./CategoryPills";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("CategoryPills", () => {
  const categories = ["a", "b", "c"];
  const onSelectMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all category buttons", () => {
    render(
      <CategoryPills
        categories={categories}
        selectedCategory="a"
        onSelect={onSelectMock}
      />
    );

    categories.forEach((category) => {
      expect(
        screen.getByRole("button", { name: category })
      ).toBeInTheDocument();
    });
  });

  it("highlights the selected category with 'dark' variant", () => {
    render(
      <CategoryPills
        categories={categories}
        selectedCategory="b"
        onSelect={onSelectMock}
      />
    );

    const selectedButton = screen.getByRole("button", { name: "b" });
    expect(selectedButton).toHaveClass("bg-brand-card");
  });

  it("calls onSelect with correct category when a button is clicked", () => {
    render(
      <CategoryPills
        categories={categories}
        selectedCategory="a"
        onSelect={onSelectMock}
      />
    );

    const button = screen.getByRole("button", { name: "b" });
    fireEvent.click(button);
    expect(onSelectMock).toHaveBeenCalledWith("b");
  });

  it("applies scrollable container with correct styling", () => {
    const { container } = render(
      <CategoryPills
        categories={categories}
        selectedCategory="a"
        onSelect={onSelectMock}
      />
    );

    const scrollDiv = container.querySelector(".overflow-x-auto");
    expect(scrollDiv).toBeInTheDocument();
    expect(scrollDiv).toHaveClass("scroll-smooth", "scrollbar-hide");
  });
});
