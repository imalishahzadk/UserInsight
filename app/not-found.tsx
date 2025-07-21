"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Button
        component={Link}
        href="/"
        variant="contained"
        sx={{
          background: "rgba(30, 30, 50, 0.4)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(115, 103, 240, 0.2)",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
          position: "relative",
          overflow: "hidden",

          "&:hover": {
            background: "rgb(50, 30, 30) !important",
            color: "#fff",
          },
        }}
      >
        Return Home
      </Button>
    </Box>
  );
}
