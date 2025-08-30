import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SubHeader from "./SubHeader";
import { MemoryRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../ball-animation/BallAnimation", () => ({
  BallAnimation: ({ isSubHeader }: { isSubHeader: boolean }) => (
    <div data-testid="ball-animation">
      {isSubHeader ? "SubHeader Animation" : ""}
    </div>
  ),
}));

describe("SubHeader component", () => {
  it("renders the title", () => {
    render(
      <MemoryRouter>
        <SubHeader
          title="Test Title"
          onRefresh={() => {}}
          navigateBack={false}
          displayAnimation={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("calls onRefresh when refresh button is clicked", () => {
    const mockRefresh = vi.fn();

    render(
      <MemoryRouter>
        <SubHeader
          title="Refresh Test"
          onRefresh={mockRefresh}
          navigateBack={false}
          displayAnimation={false}
        />
      </MemoryRouter>
    );

    const refreshButton = screen.getByTestId("refresh-icon");
    fireEvent.click(refreshButton);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("renders BallAnimation when displayAnimation is true", () => {
    render(
      <MemoryRouter>
        <SubHeader
          title="Animation Test"
          onRefresh={() => {}}
          navigateBack={false}
          displayAnimation={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("ball-animation")).toBeInTheDocument();
    expect(screen.getByText("SubHeader Animation")).toBeInTheDocument();
  });

  it("does not render BallAnimation when displayAnimation is false", () => {
    render(
      <MemoryRouter>
        <SubHeader
          title="No Animation Test"
          onRefresh={() => {}}
          navigateBack={false}
          displayAnimation={false}
        />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("ball-animation")).not.toBeInTheDocument();
  });
});
