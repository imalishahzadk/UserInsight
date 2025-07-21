"use client";
import { Box, Grid, Typography } from "@mui/material";
import UsageChart from "@/components/client/dashboard/usage-chart";
import AgentsTable from "@/app/components/client/dashboard/AgentsTable";
import TopStats from "@/components/client/dashboard/top-stats";
import MostUsedAgents from "@/components/client/dashboard/most-used-agents";
import cookieService from "@/services/local/cookie-service";

export default function ClientDashboard() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#0A0F1E", // white background
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "#ffffff", // black text
          }}
        >
          Dashboard
        </Typography>
      </Box>

      {/* Top Statistics Section */}
      <TopStats />

      {/* <UsageChart /> */}

      {/* Most Used Agents Section */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "#ffffff",
              mb: 1,
            }}
          >
            Most Used Agents
          </Typography>
          <Typography
            sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.875rem" }}
          >
            Your most active bots
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#7367f033", // light gray background instead of dark
            borderRadius: "16px",
            p: 3,
            border: "1px solid #7367f033",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "#7367f033",
              transform: "translateY(-5px)",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
            },
          }}
        >
          <MostUsedAgents />
        </Box>
      </Box>
    </Box>
  );
}
