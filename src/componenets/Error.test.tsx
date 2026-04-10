import { render, screen } from "@testing-library/react";
import Error from "./Error";
import "@testing-library/jest-dom";

describe("ErrorComp", () => {
  test("renders error message", () => {
    const message = "Something went wrong";

    render(<Error errorMsg={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("displays the correct error text", () => {
    render(<Error errorMsg="API failed" />);

    const errorElement = screen.getByText("API failed");
    expect(errorElement).toBeInTheDocument();
  });
});
