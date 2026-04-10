import { TextField } from "@mui/material";
import type { SearchBarProps } from "../types";

function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <TextField
        placeholder="Search movies..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{
          width: "350px",
          background: "#1f1f1f",
          borderRadius: "6px",
          input: { color: "#fff" },
        }}
      />
    </div>
  );
}

export default SearchBar;
