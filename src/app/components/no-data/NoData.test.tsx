import { render, screen } from "@testing-library/react";
import FetchStatus from "./NoData";
import NoData from "./NoData";

describe("NoData", () => {
  it("show not data is available", () => {
    render(<NoData />);

    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });
});
