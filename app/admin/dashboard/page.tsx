"use client";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import TopStats from "../../components/admin/dashboard/TopStats";
import Statistics from "../../components/admin/dashboard/Statistics";
import CreditsUsage from "../../components/admin/dashboard/CreditsUsage";
import MostUsedAgents from "../../components/admin/dashboard/MostUsedAgents";
import FinancialDetails from "../../components/admin/dashboard/FinancialDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import agentService from "@/services/api/user/agent-service";

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#ffffff",
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
            color: "#fff",
          }}
        >
          Dashboard
        </Typography>

        {/* <Select
          size="small"
          defaultValue="This month"
          sx={{
            minWidth: 120,
            bgcolor: "#0a0f1e",
            borderRadius: "8px",
            color: "#fff",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            "& .MuiSelect-icon": {
              color: "#00e5ff",
            },
            "&:hover": {
              borderColor: "rgba(0, 229, 255, 0.4)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="This month">This month</MenuItem>
          <MenuItem value="Last month">Last month</MenuItem>
          <MenuItem value="This year">This year</MenuItem>
        </Select> */}
      </Box>

      <TopStats />

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
        }}
      >
        <Statistics />
      </Box>

      <div className="my-4">
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ fontSize: "1.25rem", fontWeight: 500, color: "#fff", mb: 1 }}
          >
            Credits usage
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
          >
            Track your monthly consumption
          </Typography>
        </Box>
        <CreditsUsage />
      </div>
      <MostUsedAgents />
      <FinancialDetails />
    </Box>
  );
}
