"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import {
  Close as CloseIcon,
  TableChartOutlined as TableChartOutlinedIcon,
} from "@mui/icons-material";
import {
  colors,
  dialogPaperProps,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../styles";

interface TableDialogProps {
  open: boolean;
  isLoading: boolean;
  file: File | null;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const TableDialog = ({
  open,
  isLoading,
  file,
  onFileChange,
  onSubmit,
  onClose,
}: TableDialogProps) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

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
          Import Table
        </Typography>
        <IconButton onClick={onClose} sx={{ color: colors.text }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box
          sx={{
            mt: 2,
            border: `2px dashed ${colors.border}`,
            borderRadius: "10px",
            p: 4,
            textAlign: "center",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: colors.borderHover,
              bgcolor: "rgba(0, 229, 255, 0.05)",
            },
          }}
        >
          <TableChartOutlinedIcon
            sx={{ fontSize: 48, color: colors.textSecondary, mb: 2 }}
          />
          <Typography sx={{ color: colors.text, mb: 1 }}>
            Drag and drop your table file here
          </Typography>
          <Typography sx={{ color: colors.textSecondary, mb: 2 }}>
            or
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "100px",
              textTransform: "none",
              borderColor: colors.border,
              color: colors.text,
              "&:hover": {
                borderColor: colors.borderHover,
                bgcolor: "rgba(0, 229, 255, 0.05)",
              },
            }}
            component="label"
          >
            Browse files
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          {file && (
            <Typography
              sx={{ mt: 2, color: colors.text, fontWeight: "bold" }}
            >
              Selected File: {file.name}
            </Typography>
          )}
          <Typography
            sx={{ color: colors.textSecondary, mt: 2, fontSize: "0.875rem" }}
          >
            Supported formats: CSV, Excel
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={secondaryButtonStyles}>
          Cancel
        </Button>
        {file && (
          <Button
            disabled={isLoading}
            variant="contained"
            onClick={onSubmit}
            sx={primaryButtonStyles}
          >
            {isLoading ? "Uploading..." : "Import Table"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TableDialog;
