import { Box } from "@mui/material";
import Card from "./Card";
import Loading from "./Loading";
import type { CardListProps } from "../types";

function CardList({
  isLoading,
  arrayList,
  onDeleteMovie,
  onEditMovie,
  onWishlist,
  isAdmin,
}: CardListProps) {
  if (isLoading) {
    return <Loading />;
  }

  return (
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
      {arrayList.map((movie, index) => (
        <Card
          key={index}
          title={movie.Title}
          year={movie.Year}
          rating={movie.imdbRating}
          img={movie.Poster}
          isWatch={movie.isWatchList}
          movieId={movie.id}
          onDeleteMovie={onDeleteMovie}
          onEditMovie={onEditMovie}
          isAdmin={isAdmin}
          onWishlist={onWishlist}
        />
      ))}
    </Box>
  );
}

export default CardList;
