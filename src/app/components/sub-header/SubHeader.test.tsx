import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SubHeader from "./SubHeader";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SubHeader", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the title correctly", () => {
    render(
      <MemoryRouter>
        <SubHeader title="Test Title" />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("calls navigate(-1) when the back button is clicked", () => {
    render(
      <MemoryRouter>
        <SubHeader title="Go Back Test" />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
