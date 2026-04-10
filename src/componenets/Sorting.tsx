import { FormControl, Select, MenuItem } from "@mui/material";
import type { SortProps } from "../types";

function Sorting({ sortBy, setSortBy }: SortProps) {
  return (
    <FormControl
      size="small"
      style={{
        marginTop: 20,
      }}
    >
      <Select
        value={sortBy}
        displayEmpty
        onChange={(e) => setSortBy(e.target.value)}
        sx={{
          width: "180px",
          background: "#1f1f1f",
          borderRadius: "6px",
          color: "#fff",
        }}
      >
        <MenuItem value="">Sort By</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="year">Year</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sorting;
