import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import type { Movie } from "./types";
import "@testing-library/jest-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const movies: Movie[] = [
  {
    Title: "Pathaan",
    Genre: "Action",
    Rated: "18",
    Poster:
      "https://filmfare.wwmindia.com/content/2020/feb/sooryanvanshi41582020595.jpg",
    isWatchList: true,
    Year: 2019,
    imdbRating: 7,
  },
];
//Mock Api sucess
describe("App Component", () => {
  beforeEach(() => {
    // Reset mock before each test
    mockedAxios.get.mockResolvedValue({ data: movies });
  });

  test("renders movie list after axios GET", async () => {
    render(<App />);

    // Wait for movie title to appear
    await waitFor(() => {
      expect(screen.getByText(/Pathaan/i)).toBeInTheDocument();
    });
  });
});

//API fails to load
describe("App Component - API failure", () => {
  test("shows nothing / handles error when API fails", async () => {
    // Simulate GET request failure
    mockedAxios.get.mockRejectedValue(new Error("error"));

    render(<App />);

    // Wait for the useEffect to finish
    await waitFor(() => {
      // Search by the text
      const errorMsg = screen.getByText(/Failed to load movies/i);
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
