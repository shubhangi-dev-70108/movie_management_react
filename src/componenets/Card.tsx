import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { CardProps } from "../types";

const MovieCard = ({
  title,
  year,
  rating,
  img,
  isWatch,
  movieId,
  onDeleteMovie,
  onEditMovie,
  isAdmin,
  onWishlist,
}: CardProps) => {
  return (
    <Card
      sx={{
        width: 250,
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia component="img" height="160" image={img} alt={title} />

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>

        <Typography variant="body2">
          <b>Year:</b> {year}
        </Typography>

        <Typography variant="body2">
          <b>Rating:</b> {rating}
        </Typography>
      </CardContent>

      {/* Favorite Button */}
      <CardActions sx={{ justifyContent: "center", gap: 4 }}>
        <IconButton
          sx={{ color: "#d83a41" }}
          onClick={() => {
            onWishlist?.(movieId);
          }}
        >
          {isWatch ? <FavoriteIcon /> : <AddIcon />}
        </IconButton>

        {/* Edit Button */}
        {isAdmin && (
          <IconButton sx={{ color: "#161718" }}>
            {/*when editted it will navigate to edit form  */}
            <EditIcon
              onClick={() => {
                onEditMovie?.(movieId);
              }}
            />
          </IconButton>
        )}

        {/* Delete Button */}
        {isAdmin && (
          <IconButton
            sx={{ color: "#161718" }}
            onClick={() => {
              onDeleteMovie?.(movieId);
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
      <></>
    </Card>
  );
};

export default MovieCard;
