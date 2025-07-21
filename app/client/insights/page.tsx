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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Switch,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import agentService from "@/services/api/client/agent-service";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MetricCard from "@/components/client/insights/MetricCard";
import AgentCard from "@/components/client/insights/AgentCard";
import Link from "next/link";
import { C_CREATE_AGENTS_ROUTE, C_CREATE_INSIGHTS_ROUTE } from "@/core/routes";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";

interface Agent {
  _id: string;
  name: string;
  isActive: boolean;
  imageUrl: string;
  role: string;
}

interface Statistics {
  totalAgents: number;
  agentsThisMonth: number;
  activeAgents: number;
  totalLeads: number;
  thisMonthLeads: number;
}

export default function AgentsPage() {
  const { permissions } = useSelector((state: IRootState) => state.auth.user);
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [statistics, setStatistics] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingInsightId, setLoadingInsightId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("error");
  const [selectedDate, setSelectedDate] = useState<any>(dayjs("2025-01-05"));
  const [searchText, setSearchText] = useState("");
  const [isCreatingInsight, setIsCreatingInsight] = useState(false);

  const handleClose = () => setIsSnackbarOpen(false);

  const getAgentsWithStatistics = async () => {
    setLoading(true);
    const response = await agentService.getInsighsWithStatistics();
    setLoading(false);

    if (response.success) {
      setAgents(response.data.insights);
      setStatistics(response.data.statistics);
    } else {
      setIsSnackbarOpen(true);
      setMessage(response.message || "Something went wrong");
      setSeverity("error");
    }
  };

  useEffect(() => {
    getAgentsWithStatistics();
  }, []);

  const filteredAgents = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    if (!search) return agents;
    return agents.filter((a) => a.name.toLowerCase().includes(search));
  }, [agents, searchText]);

  if (loading || !statistics) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#0A0F1E",
        }}
      >
        <CircularProgress thickness={5} size={50} sx={{ color: "#7367f0" }} />
      </Box>
    );
  }

  const handleViewDetails = (id: string) => {
    setLoadingInsightId(id);
    setIsLoading(true);
    router.push(`/client/insights/${id}`);
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsActive(e.target.checked);
  };
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#0A0F1E", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            mb: 3,
          }}
        >
          Trackers
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "end",
            alignItems: { xs: "stretch", md: "center" },
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "flex-end",
            }}
          >
            <TextField
              placeholder="Search insights"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                flex: 1,
                "& .MuiInputBase-root": {
                  height: "48px",

                  borderRadius: "12px",
                  border: "1px solid #7367f033",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    borderColor: "#7367f033",
                  },
                  "&:focus-within": {
                    borderColor: "#7367f033",
                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
                  },
                },
                "& fieldset": { border: "none" },
                "& input": {
                  color: "#fff",
                  "&::placeholder": {
                    color: "rgba(196, 196, 196, 0.664)",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#ffffff" }} />
                  </InputAdornment>
                ),
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                format="DD MMM, YYYY"
                slotProps={{
                  textField: {
                    sx: {
                      minWidth: { xs: "100%", sm: 200 },
                      "& .MuiInputBase-root": {
                        height: "48px",
                        bgcolor: "#1e1e3266",
                        borderRadius: "12px",
                        border: "1px solid #7367f033",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                          borderColor: "#7367f033",
                        },
                        "&:focus-within": {
                          borderColor: "#7367f033",
                          boxShadow: "0 0 20px rgba(115, 103, 240, 0.2)",
                        },
                      },
                      "& fieldset": { border: "none" },
                      "& input": {
                        color: "#ffffff",
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
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Total Insights"
            value={statistics.totalInsights}
            subtitle={`New this month: ${statistics.totalInsights}`}
            valueColor="#ffffff"
            percentage=""
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Active Insights"
            value={statistics.activeInsights}
            subtitle={`Currently live: ${statistics.activeInsights}`}
            valueColor="#ffffff"
            percentage=""
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Total Leads"
            value={statistics.totalLeads}
            subtitle={`This month leads: ${statistics.thisMonthLeads}`}
            valueColor="#ffffff"
            percentage=""
          />
        </Grid>
      </Grid>

      {/* Insights Table */}
      {permissions?.bots?.add && (
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setIsCreatingInsight(true);
              router.push(C_CREATE_INSIGHTS_ROUTE);
            }}
            variant="outlined"
            startIcon={
              isCreatingInsight ? (
                <CircularProgress size={20} sx={{ color: "#7367f0" }} />
              ) : (
                <AddIcon />
              )
            }
            disabled={isCreatingInsight}
            sx={{
              borderColor: "#7367f0",
              color: "#7367f0",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "rgba(115, 103, 240, 0.03)",
              },
              "&.Mui-disabled": {
                borderColor: "rgba(115, 103, 240, 0.3)",
                color: "rgba(115, 103, 240, 0.3)",
              },
            }}
          >
            {isCreatingInsight ? "loading..." : "Create Insight"}
          </Button>
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "none",
          border: "1px solid #7367f033",
          background: "#7367f033",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Agent</TableCell>
              {/* <TableCell sx={{ color: "#fff" }}>Role</TableCell> */}
              {/* <TableCell sx={{ color: "#fff" }}>Status</TableCell> */}
              <TableCell sx={{ color: "#fff" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgents.length > 0 ? (
              filteredAgents?.map((agent) => (
                <TableRow key={agent._id}>
                  <TableCell sx={{ color: "#fff" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src={agent.imageUrl} alt={agent.name} />
                      <Typography>{agent.name}</Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell sx={{ color: "#fff" }}>{agent.role}</TableCell> */}
                  {/* <TableCell>
                  <Switch
                    checked={isActive}
                    onChange={handleSwitchChange}
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#cd9ffca0",
                        },
                      },
                      "& .MuiSwitch-track": {
                        backgroundColor: "#e0c1ff",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#ce9ffc",
                        },
                    }}
                  />
                </TableCell> */}
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(agent._id)}
                      disabled={loadingInsightId === agent._id}
                      sx={{
                        textTransform: "none",
                        borderColor: "#7367f0",
                        color: "#7367f0",
                        "&:hover": {
                          borderColor: "rgba(115, 103, 240, 0.03)",
                        },
                        "&.Mui-disabled": {
                          borderColor: "rgba(115, 103, 240, 0.3)",
                          color: "rgba(115, 103, 240, 0.3)",
                        },
                      }}
                    >
                      {loadingInsightId === agent._id ? (
                        <CircularProgress size={20} sx={{ color: "#7367f0" }} />
                      ) : (
                        "View Details"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ color: "#fff", textAlign: "center" }}
                >
                  No insights found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: "100%",
            bgcolor:
              severity === "error"
                ? "rgba(211, 47, 47, 0.9)"
                : "rgba(46, 125, 50, 0.9)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "#fff",
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
