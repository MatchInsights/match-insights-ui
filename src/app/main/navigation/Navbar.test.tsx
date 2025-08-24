import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";

describe("Navbar", () => {
  it("renders the navbar brand, home and about links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByTestId("brand-link")).toBeInTheDocument();
    expect(screen.getByTestId("home-about-links")).toBeInTheDocument();
  });
});
