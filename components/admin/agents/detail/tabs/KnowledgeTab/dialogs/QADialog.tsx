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

interface QADialogProps {
  open: boolean;
  isLoading: boolean;
  question: string;
  answer: string;
  onQuestionChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const QADialog = ({
  open,
  isLoading,
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
  onSubmit,
  onClose,
}: QADialogProps) => {
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
          Add Q&A
        </Typography>
        <IconButton onClick={onClose} sx={{ color: colors.text }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <TextField
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          fullWidth
          label="Question"
          placeholder="Enter your question"
          sx={{
            mt: 2,
            mb: 3,
            ...inputStyles,
            "& .MuiInputLabel-root": {
              color: colors.textSecondary,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.primary,
            },
          }}
        />
        <TextField
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          fullWidth
          multiline
          rows={4}
          label="Answer"
          placeholder="Enter your answer"
          sx={{
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
          {isLoading ? "Adding Q&A..." : "Add Q&A"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QADialog;
