"use client";
import { IconButton, Avatar } from "@mui/material";

interface ButtonViewProps {
  primaryColor: string;
  image?: string | File | null;
  onStateChange?: (state: "full" | "mini" | "button") => void;
}

export default function ButtonView({
  primaryColor,
  image,
  onStateChange,
}: ButtonViewProps) {
  return (
    <IconButton
      onClick={() => onStateChange?.("full")}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        bgcolor: primaryColor,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        "&:hover": {
          bgcolor: primaryColor,
        },
      }}
    >
      <Avatar
        src={
          image
            ? image instanceof File
              ? URL.createObjectURL(image)
              : image
            : undefined
        }
        sx={{
          width: 40,
          height: 40,
          bgcolor: "transparent",
        }}
      />
    </IconButton>
  );
}
