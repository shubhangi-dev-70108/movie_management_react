import { render, screen, fireEvent } from "@testing-library/react";
import Sorting from "../componenets/Sorting";
import "@testing-library/jest-dom";

describe("Sorting Component", () => {
  test("renders Sort By text", () => {
    render(<Sorting sortBy="" setSortBy={jest.fn()} />);

    expect(screen.getByText("Sort By")).toBeInTheDocument();
  });

  test("shows Rating option", () => {
    render(<Sorting sortBy="" setSortBy={jest.fn()} />);

    fireEvent.mouseDown(screen.getByRole("combobox"));

    expect(screen.getByText("Rating")).toBeInTheDocument();
  });
});
