"use client";

import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0A0F1E",
      }}
    >
      <CircularProgress sx={{ color: "#7367f0" }} />
    </Box>
  );
}
