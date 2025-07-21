"use client";
import { Box, Typography } from "@mui/material";

interface MetricCardProps {
  title: string;
  value: string;
  percentage: string;
  subtitle: string; // Changed from completed to subtitle
  valueColor?: string;
}

export default function MetricCard({
  title,
  value,
  percentage,
  subtitle,
  valueColor = "#4285f4",
}: MetricCardProps) {
  return (
    <Box
      // className="box-style"
      sx={{
        borderRadius: 2,
        p: 3,
        minWidth: 240,
        height: "100%",
        border: "1px solid #7367f033",
        bgcolor: "#7367f033",
        color: "#ffffff",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: "#ffffff",
          mb: 2,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <Typography
        // className="main-color"
        variant="h3"
        sx={{
          color: valueColor,
          fontWeight: 700,
          mb: 1,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          color: "#10B981",
          fontSize: "0.875rem",
          mb: 2,
        }}
      >
        {percentage}
      </Typography>

      <Typography
        sx={{
          color: "#ffffff",
          fontSize: "0.875rem",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
