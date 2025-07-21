"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  colors,
  dialogPaperProps,
  inputStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../styles";

interface WebsiteDialogProps {
  open: boolean;
  isLoading: boolean;
  websiteUrl: string;
  onUrlChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const WebsiteDialog = ({
  open,
  isLoading,
  websiteUrl,
  onUrlChange,
  onSubmit,
  onClose,
}: WebsiteDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={dialogPaperProps}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: colors.text,
          }}
        >
          Add Website
        </Typography>
        <IconButton onClick={onClose} sx={{ color: colors.text }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <TextField
          value={websiteUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          fullWidth
          label="Website URL"
          placeholder="Enter website URL"
          sx={{
            mt: 2,
            ...inputStyles,
            "& .MuiInputLabel-root": {
              color: colors.textSecondary,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.primary,
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={secondaryButtonStyles}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="contained"
          sx={primaryButtonStyles}
        >
          {isLoading ? "Crawling..." : "Add Website"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebsiteDialog;
