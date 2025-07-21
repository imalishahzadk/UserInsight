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
      className="box-style"
      sx={{
        borderRadius: 2,
        p: 3,
        minWidth: 240,
        height: "100%",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: "white",
          mb: 2,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <Typography
        className="main-color"
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
          color: "#6B7280",
          fontSize: "0.875rem",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
