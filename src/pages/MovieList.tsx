import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SearchBar from "../componenets/SearchBar";
import Sorting from "../componenets/Sorting";
import useGetMovies from "../hooks/useGetMovies";
import Header from "../componenets/Header";
import ErrorComp from "../componenets/Error";
import CardList from "../componenets/CardList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const MovieList = () => {
  const { arrayList, filteredMovies, setFilteredMovies, loading, error } =
    useGetMovies();
  const { state, dispatch, logoutFn } = useAuth();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("");

  const navigate = useNavigate();

  // delete button
  const onDeleteMovie = async (movieId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/movies/${movieId}`,
      );
      if (response.status === 200) {
        alert("Deleted successfully");
        // refresh the current page.
        navigate(0);
      }
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  //edit button
  const onEditMovie = (movieId: string) => {
    navigate(`/editmovie/${movieId}`);
  };

  //wishlist button
  const onWishlist = async (movieId: string) => {
    try {
      const selectedMovie = arrayList.filter((item) => item.id == movieId);
      if (selectedMovie && selectedMovie.length > 0) {
        const apiResponse = await axios.put(
          `http://localhost:3000/movies/${movieId}`,
          {
            ...selectedMovie[0],
            isWatchList: !selectedMovie[0].isWatchList,
          },
        );
        if (apiResponse.status == 200) {
          navigate(0);
          alert("updated");
        }
      }
    } catch (error) {
      alert("Failed to add in favorite");
    }
  };

  useEffect(() => {
    // reset to original movie list
    let result = [...arrayList];

    // check for search and update the list to result
    if (search && search.length > 0) {
      result = arrayList.filter((item) =>
        item.Title.toLowerCase().includes(search),
      );
    }
    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.imdbRating - a.imdbRating);
    }

    if (sortBy === "year") {
      result.sort((a, b) => b.Year - a.Year);
    }

    // update with new copy of result
    setFilteredMovies(result);
    //
  }, [arrayList, search, sortBy]);

  const onLogOutCb = () => {
    logoutFn?.();

    //calling reducer dispatch to reseting the role while log out
    dispatch?.({
      type: "LOGOUT",
    });

    navigate(0); // reload the current page
  };

  if (error) {
    return <ErrorComp errorMsg={error} />;
  }
  return (
    <div>
      <Header onLogOutFn={onLogOutCb} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          marginTop: 3,
          width: "100%",
        }}
      >
        {/* Searchbar and sortbar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
          <SearchBar search={search} setSearch={setSearch} />

          <Sorting sortBy={sortBy} setSortBy={setSortBy} />

          {/* Add movie button */}
          {state?.userRole == "admin" && (
            <Button
              variant="contained"
              sx={{
                mt: "21px",
                padding: "8px 16px",
                backgroundColor: "#292726",
              }}
              onClick={() => {
                navigate("/addmovie");
              }}
            >
              Add Movie
            </Button>
          )}
        </Box>
      </Box>

      <CardList
        isLoading={loading}
        arrayList={filteredMovies}
        onDeleteMovie={onDeleteMovie}
        onEditMovie={onEditMovie}
        isAdmin={state?.userRole == "admin"} //using state here form auth to get role
        onWishlist={onWishlist}
      />
    </div>
  );
};

export default MovieList;
