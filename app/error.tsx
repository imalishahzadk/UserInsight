"use client";

import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        Something went wrong!
      </Typography>
      <Button
        variant="contained"
        onClick={reset}
        sx={{
          background: "rgba(30, 30, 50, 0.4)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(115, 103, 240, 0.2)",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
          },
          "&::hover": {
            background: "rgb(30, 30, 50) !important",
            color: "#fff",
          },
        }}
      >
        Try again
      </Button>
    </Box>
  );
}
