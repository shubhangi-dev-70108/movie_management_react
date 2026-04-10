import { AppBar, Toolbar, Typography, Link, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";

function Header({ onLogOutFn }: any) {
  const { state } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: state?.userRole == "admin" ? "#134E4A" : "#0d0d0d",
        borderBottom: "1px solid #333",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Moviemate */}
        <Typography
          variant="h6"
          sx={{
            color: "#f5e90a",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#e5cb09",
            },
          }}
        >
          MovieMate
        </Typography>

        {/* Box of home,watchlist and logout */}

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          {/* Profile */}
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#f5e90a",
              "&:hover": {
                color: "#efeddc",
              },
            }}
          >
            {/* checking state of role and changing logo */}
            {state.userRole == "admin" ? (
              <AdminPanelSettingsIcon fontSize="medium" />
            ) : (
              <AccountCircleIcon fontSize="medium" />
            )}
          </Link>

          {/* Home */}
          <Link
            component={RouterLink}
            to="/movies"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#f5e90a",
              "&:hover": {
                color: "#efeddc",
              },
            }}
          >
            <HomeIcon fontSize="medium" />
          </Link>

          {/* Wishlist  */}
          <Link
            component={RouterLink}
            to="/watchlist"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#f5e90a",
              "&:hover": {
                color: "#e7e7e7",
              },
            }}
          >
            <FavoriteIcon fontSize="medium" />
          </Link>

          {/* Logout  */}
          <Link
            component="button"
            className="bn"
            onClick={onLogOutFn}
            // to="/signin"
            sx={{
              color: "#f5e90a",
              "&:hover": {
                color: "#ff4d4f",
              },
            }}
          >
            <LogoutIcon fontSize="medium" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
