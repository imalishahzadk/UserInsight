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

interface TextDialogProps {
  open: boolean;
  isLoading: boolean;
  text: string;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const TextDialog = ({
  open,
  isLoading,
  text,
  onTextChange,
  onSubmit,
  onClose,
}: TextDialogProps) => {
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
          Add Text
        </Typography>
        <IconButton onClick={onClose} sx={{ color: colors.text }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <TextField
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Enter your text here..."
          sx={{
            mt: 2,
            ...inputStyles,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              color: colors.text,
              backgroundColor: colors.cardBackground,
              border: `1px solid ${colors.border}`,
              "&:hover": {
                borderColor: colors.borderHover,
              },
              "& fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primary,
              },
              height: "auto",
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
          {isLoading ? "Adding Text..." : "Add Text"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextDialog;
