"use client";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import agentService from "@/services/api/user/agent-service";
import { Autocomplete } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MetricCard from "@/components/admin/agents/MetricCard";
import AgentCard from "@/components/admin/agents/AgentCard";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

export default function AgentsPage() {
  const { permissions } = useSelector((state: IRootState) => state.auth.user);

  const router = useRouter();
  const [agents, setAgents] = useState<any>();
  const [statistics, setStatistics] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>(dayjs("2025-01-05"));

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setIsSnackbarOpen(false);
  };

  const getAgentsWithStatistics = async () => {
    setLoading(true);
    const response = await agentService.getAgentsWithStatistics();
    setLoading(false);

    if (response.success) {
      setAgents(response.data.agents);
      setStatistics(response.data.statistics);
    } else {
      setIsSnackbarOpen(true);
      setMessage(response.message);
      setSeverity("error");
    }
  };

  const handleCreateNew = () => {
    router.push("/admin/agents/create");
  };

  const clients = [
    { label: "Client A", id: 1 },
    { label: "Client B", id: 2 },
    { label: "Client C", id: 3 },
  ];

  useEffect(() => {
    getAgentsWithStatistics();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#070b15",
        }}
      >
        <CircularProgress thickness={5} size={50} sx={{ color: "#7367f0" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#070b15",
        minHeight: "100vh",
      }}
    >
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Total agents"
            value={statistics.totalAgents}
            subtitle={`New this month: ${statistics.agentsThisMonth}`}
            valueColor="#00e5ff"
            percentage=""
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Active agents"
            value={statistics.activeAgents}
            subtitle={`Currently live: ${statistics.activeAgents}`}
            valueColor="#00e5ff"
            percentage=""
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Total Leads"
            value={statistics.totalLeads}
            subtitle={`This month leads: ${statistics.thisMonthLeads}`}
            valueColor="#00e5ff"
            percentage=""
          />
        </Grid>
      </Grid>

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
          Agents
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* Client Selection */}
          <Autocomplete
            options={clients}
            getOptionLabel={(option) => option.label}
            sx={{
              minWidth: 200,
              "& .MuiInputBase-root": {
                height: "40px",
                bgcolor: "#0a0f1e",
                borderRadius: "8px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
                "& fieldset": { border: "none" },
              },
              "& .MuiAutocomplete-input": {
                color: "#fff",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.5)",
                  opacity: 1,
                },
              },
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select client" />
            )}
          />

          {/* Search Input */}
          <TextField
            placeholder="Search agent"
            sx={{
              minWidth: 200,
              "& .MuiInputBase-root": {
                height: "40px",
                bgcolor: "#0a0f1e",
                borderRadius: "8px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
              },
              "& fieldset": { border: "none" },
              "& input": {
                color: "#fff",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.5)",
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00e5ff" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="DD MMM, YYYY"
              slotProps={{
                textField: {
                  sx: {
                    minWidth: 200,
                    "& .MuiInputBase-root": {
                      height: "40px",
                      bgcolor: "#0a0f1e",
                      borderRadius: "8px",
                      border: "1px solid rgba(0, 229, 255, 0.2)",
                      "&:hover": {
                        borderColor: "rgba(0, 229, 255, 0.4)",
                      },
                    },
                    "& fieldset": { border: "none" },
                    "& input": {
                      color: "#fff",
                      textAlign: "center",
                      cursor: "pointer",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      {/* Agents Grid */}
      <Grid container spacing={3}>
        {/* Create New Agent Card */}
        {permissions?.bots.add && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              onClick={handleCreateNew}
              sx={{
                bgcolor: "#0a0f1e",
                borderRadius: "16px",
                p: 3,
                height: "100%",
                minHeight: "280px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                border: "1px dashed rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "#00e5ff",
                  boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
                },
              }}
            >
              <AddIcon sx={{ fontSize: 40, color: "#00e5ff", mb: 1 }} />
              <Typography sx={{ color: "#00e5ff", fontWeight: 500 }}>
                Create new agent
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Agent Cards */}
        {agents.map((agent: any, index: Key | null | undefined) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <AgentCard
              id={agent._id}
              title={agent.name}
              initialActive={agent.isActive}
              imageUrl={agent.imageUrl}
              role={agent.role}
            />
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#00e5ff",
            color: "#0a0f1e",
            borderRadius: "8px",
            textTransform: "none",
            px: 6,
            py: 1.5,
            fontWeight: 600,
            "&:hover": {
              bgcolor: "rgba(0, 229, 255, 0.8)",
            },
          }}
        >
          Load More
        </Button>
      </Box>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
