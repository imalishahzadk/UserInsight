import React from "react";
import { Box, Paper } from "@mui/material";

interface MetricCardProps {
  title: string;
  value: string | number;
  changePercentage: number;
  subtitle: string;
  subtitleValue: string | number;
  colorTheme: any;
  sx: any;
}

const getColorClass = (theme: string) => {
  const colors = {
    blue: "#4285f4",
    red: "#ea4335",
    yellow: "#fbbc05",
    green: "#34a853",
  };
  return colors.blue;
};
//colors[theme]

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  changePercentage,
  subtitle,
  subtitleValue,
  colorTheme,
}) => {
  return (
    <Paper
      className="box-style"
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        height: "100%",
        color: "white",
      }}
    >
      <Box sx={{ color: "text.white", mb: 2 }}>{title}</Box>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
        <Box
          className="main-color"
          component="span"
          sx={{
            fontSize: "2.5rem",
            fontWeight: 600,
          }}
        >
          {value}
        </Box>
        <Box
          component="span"
          sx={{
            color: changePercentage >= 0 ? "#34a853" : "#ea4335",
            fontSize: "0.875rem",
          }}
        >
          {changePercentage >= 0 ? "+" : ""}
          {changePercentage}%
        </Box>
      </Box>
      {/* <Box
        sx={{
          color: "text.secondary",
          fontSize: "0.875rem",
        }}
      >
        {subtitle}: {subtitleValue}
      </Box> */}
    </Paper>
  );
};

export default MetricCard;
