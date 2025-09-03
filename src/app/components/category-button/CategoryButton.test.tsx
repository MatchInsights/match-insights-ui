import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryButton } from "./CategoryButton";
import { describe, it, expect, vi } from "vitest";

describe("CategoryButton", () => {
  it("renders with default variant and size", () => {
    render(<CategoryButton>Click me</CategoryButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("hover:bg-brand-orange");
    expect(button).toHaveClass("p-2");
  });

  it("renders with 'dark' variant", () => {
    render(<CategoryButton variant="dark">Dark Mode</CategoryButton>);
    const button = screen.getByRole("button", { name: /dark mode/i });
    expect(button).toHaveClass("bg-brand-navbar");
    expect(button).toHaveClass("text-brand-white");
  });

  it("renders with icon size", () => {
    render(<CategoryButton size="icon">i</CategoryButton>);
    const button = screen.getByRole("button", { name: "i" });
    expect(button).toHaveClass("rounded-full", "w-10", "h-10");
  });

  it("accepts and applies custom className", () => {
    render(<CategoryButton className="custom-class">Styled</CategoryButton>);
    const button = screen.getByRole("button", { name: /styled/i });
    expect(button).toHaveClass("custom-class");
  });

  it("fires onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<CategoryButton onClick={handleClick}>Click</CategoryButton>);
    const button = screen.getByRole("button", { name: /click/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
