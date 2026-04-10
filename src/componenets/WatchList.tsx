import { Box } from "@mui/material";
import Card from "./Card";
import useGetMovies from "../hooks/useGetMovies";
import Header from "../componenets/Header";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function WatchList() {
  const { arrayList } = useGetMovies();
  const { state, dispatch, logoutFn } = useAuth();
  const navigate = useNavigate();

  const watchItem = arrayList.filter((movie) => movie.isWatchList);

  const onLogOutCb = () => {
    logoutFn?.();

    //calling reducer dispatch to reseting the role while log out
    dispatch?.({
      type: "LOGOUT",
    });

    navigate(0); // reload the current page
  };

  return (
    <div>
      <Header onLogOutFn={onLogOutCb} />
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "auto",
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          justifyContent: "center",
        }}
      >
        {watchItem.map((movie, index) => (
          <Card
            key={index}
            title={movie.Title}
            year={movie.Year}
            rating={movie.imdbRating}
            img={movie.Poster}
            isWatch={movie.isWatchList}
            isAdmin={state?.userRole == "admin"}
            onDeleteMovie={() => {}}
            onEditMovie={() => {}}
            movieId={movie.id}
            onWishlist={() => {}}
          />
        ))}
      </Box>
    </div>
  );
}

export default WatchList;
