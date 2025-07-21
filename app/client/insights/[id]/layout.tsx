"use client";
import { Box } from "@mui/material";

export default function AgentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        bgcolor: "#0A0F1E",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
}
