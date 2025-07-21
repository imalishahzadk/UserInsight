"use client";

import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        backgroundColor: "#0A0F1E",
        minHeight: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "#7367f0" }} />
    </Box>
  );
}
