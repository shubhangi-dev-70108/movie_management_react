import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import type { SuccessPopupProps } from "../types";

const SuccessPopup = ({
  open,
  handleOk,
  handleClose,
  title,
}: SuccessPopupProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Success</DialogTitle>
      <DialogContent>
        <Typography>{title}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;
