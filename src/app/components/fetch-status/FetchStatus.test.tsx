import { render, screen } from "@testing-library/react";
import FetchStatus from "./FetchStatus";

describe("FetchStatus", () => {
  const testCases = [
    {
      type: "loading",
      message: "Loading...",
      expectedClass: "text-brand-lightGray",
    },
    {
      type: "error",
      message: "Something went wrong",
      expectedClass: "text-brand-danger",
    },
    {
      type: "empty",
      message: "No data available",
      expectedClass: "text-brand-yellow",
    },
    {
      type: "info",
      message: "Informational message",
      expectedClass: "text-brand-white",
    },
  ] as const;

  testCases.forEach(({ type, message, expectedClass }) => {
    it(`renders correct styles and message for type="${type}"`, () => {
      render(<FetchStatus type={type} message={message} />);
      const element = screen.getByText(message);
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(expectedClass);
    });
  });

  it("applies custom className if provided", () => {
    render(
      <FetchStatus
        type="info"
        message="With custom class"
        className="custom-class"
      />
    );
    const element = screen.getByText("With custom class");
    expect(element).toHaveClass("custom-class");
  });
});
