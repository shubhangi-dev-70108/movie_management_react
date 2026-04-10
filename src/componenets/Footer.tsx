import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        background: "#141414",
        color: "#fff",
        textAlign: "center",
        padding: "15px",
        marginTop: "40px",
        borderTop: "1px solid #333",
      }}
    >
      <Typography variant="body2">
        Made with ❤️ by Shubhangi Sharma<br></br> © 2026 Movie Mate. All rights
        reserved.
      </Typography>

      <Typography variant="caption" sx={{ color: "#aaa" }}>
        Built with React & Material UI
      </Typography>
    </Box>
  );
}

export default Footer;
