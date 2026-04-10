import { Typography } from "@mui/material";
import type { ErrorProps } from "../types";

function ErrorComp({ errorMsg }: ErrorProps) {
  return <Typography color="error">{errorMsg}</Typography>;
}

export default ErrorComp;
