// Shared styles for KnowledgeTab components
import { SxProps } from "@mui/material";

// Color palette based on the AppearanceTab theme
export const colors = {
  background: "#070b15",
  cardBackground: "#0a0f1e",
  primary: "#00e5ff",
  text: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  border: "rgba(0, 229, 255, 0.2)",
  borderHover: "rgba(0, 229, 255, 0.4)",
  success: "#10B981",
  successLight: "#ECFDF5",
};

// Shared input style
export const inputStyles: SxProps = {
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
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
      opacity: 1,
    },
  },
};

// Card style
export const cardStyles: SxProps = {
  p: 3,
  color: colors.text,
  bgcolor: colors.cardBackground,
  borderRadius: "16px",
  border: `1px solid ${colors.border}`,
  mb: 3,
};

// Primary button style
export const primaryButtonStyles: SxProps = {
  bgcolor: colors.primary,
  color: colors.cardBackground,
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: "600",
  "&:hover": {
    bgcolor: "rgba(0, 229, 255, 0.8)",
  },
  "&:disabled": {
    bgcolor: "rgba(0, 229, 255, 0.5)",
    color: colors.cardBackground,
  },
};

// Secondary button style
export const secondaryButtonStyles: SxProps = {
  color: colors.text,
  textTransform: "none",
  "&:hover": {
    bgcolor: "rgba(0, 229, 255, 0.05)",
  },
};

// Dialog paper props
export const dialogPaperProps = {
  sx: {
    borderRadius: "16px",
    bgcolor: colors.cardBackground,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  },
};

// Dropdown style
export const dropdownMenuStyles = {
  "& .MuiPaper-root": {
    borderRadius: "10px",
    minWidth: "200px",
    mt: 1,
    boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
    bgcolor: colors.cardBackground,
    border: `1px solid ${colors.border}`,
  },
  "& .MuiMenuItem-root": {
    py: 1.5,
    color: colors.textSecondary,
    "&:hover": {
      bgcolor: "rgba(0, 229, 255, 0.05)",
    },
  },
};

// Knowledge list item style
export const knowledgeItemStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  p: 2,
  borderBottom: `1px solid ${colors.border}`,
  transition: "all 0.2s",
  "&:hover": {
    bgcolor: "rgba(0, 229, 255, 0.05)",
  },
};
