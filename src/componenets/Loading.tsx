import { Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1">Loading movies...</Typography>
    </Box>
  );
}

export default Loading;
