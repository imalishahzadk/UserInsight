"use client";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  InputAdornment,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DataTable from "@/components/shared/table/DataTable";
import {
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import type { Column } from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import leadsService from "@/services/api/client/leads-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import UserDetailsModal from "@/components/client/insights/detail/tabs/LeadsTab/modals/UserDetailsModal";
import UserLeads from "@/components/client/insights/detail/tabs/LeadsTab/modals/UserLeads";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LeadModal from "@/components/client/insights/detail/tabs/LeadsTab/modals/LeadModal";
// Component for stat cards at the top
const StatCard = ({
  title,
  value,
  percentage,
  subtitle,
  valueColor = "#7367f0",
}: any) => (
  <Box
    sx={{
      bgcolor: "#7367f033", // White background
      borderRadius: "16px",
      p: 3,
      border: "1px solid #7367f033", // Black border with light opacity
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        borderColor: "rgba(0, 0, 0, 0.4)", // Darker border on hover
        transform: "translateY(-5px)",
        boxShadow: "0 0 20px rgba(115, 103, 240, 0.2)",
      },
    }}
  >
    <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#fff", mb: 2 }}>
      {" "}
      {/* Black text */}
      {title}
    </Typography>
    <Typography
      sx={{ fontSize: 48, fontWeight: 700, color: valueColor, mb: 1 }}
    >
      {value}
    </Typography>
  </Box>
);

const LeadsStats = ({ total }: { total: number }) => (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    <Grid item xs={12} md={4}>
      <StatCard title="Total leads" value={total} valueColor="#7367f0" />
    </Grid>
  </Grid>
);

export default function LeadsPage() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["all-leads", "client"],
    queryFn: () => leadsService.getAllLeads(),
    refetchOnWindowFocus: false,
  });

  const [selectedInsightId, setSelectedInsightId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const filteredLeads = useMemo(() => {
    if (!data?.leads) return [];
    return selectedInsightId === "all"
      ? data.leads
      : data.leads.filter((lead: any) => lead.insightId === selectedInsightId);
  }, [data, selectedInsightId]);

  const leadsData = filteredLeads;
  const insights = data?.insights;
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    if (!leadsData) return [];

    for (const lead of leadsData) {
      const date = format(parseISO(lead.createdAt), "yyyy-MM-dd");
      counts[date] = (counts[date] || 0) + 1;
    }
    return Object.entries(counts).map(([date, count]) => ({
      date,
      count,
    }));
  }, [leadsData]);

  if (isFetching) return <PageSpinner />;
  if (!data || error) return <></>;

  const handleView = (lead: any) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const filteredUsers = leadsData?.filter((user: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phoneNumber?.toLowerCase().includes(searchLower) ||
      user.sessionId?.toLowerCase().includes(searchLower)
    );
  });
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#0A0F1E", minHeight: "100vh" }}>
      {" "}
      {/* White background */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
          {" "}
          {/* Black text */}
          Leads
        </Typography>
        <Select
          value={selectedInsightId}
          onChange={(e) => setSelectedInsightId(e.target.value)}
          sx={{
            bgcolor: "#7367f033",
            color: "#fff",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7367f033",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7367f0",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7367f0",
              borderWidth: "2px",
            },
          }}
          displayEmpty
        >
          <MenuItem value="all">All Insights</MenuItem>
          {insights?.map((insight: any) => (
            <MenuItem key={insight?._id} value={insight?._id}>
              {insight?.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <LeadsStats total={leadsData.length} />
      {/* Chart */}
      <Box
        sx={{
          bgcolor: "#7367f033", // White background for chart container
          borderRadius: "16px",
          p: 3,
          mb: 4,
          border: "1px solid #7367f033", // Black border for chart container
        }}
      >
        <Typography sx={{ mb: 2, color: "#fff", fontWeight: 600 }}>
          {" "}
          {/* Black text */}
          Leads Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#7367f033" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#7367f0"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      {/* Table */}
      <Box
        sx={{
          maxHeight: "95vh",
          bgcolor: "#7367f033",
          p: 3,
          borderRadius: "16px",
          overflowY: "auto",
          border: "1px solid #7367f033",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        }}
      >
        {/* Leads Table */}

        {/* Search and Filter Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
            <TextField
              placeholder="Search User"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    <SearchIcon sx={{ color: "#fff" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "#0a0f1e",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(191, 0, 255, 0.1)",
            "& .MuiTableCell-root": {
              color: "#fff",
              opacity: 0.7,
              borderBottom: "1px solid rgba(242, 0, 251, 0.1)",
            },
            "& .MuiTableCell-head": {
              backgroundColor: "#070b15",
              fontWeight: 600,
              opacity: 1,
            },
            "& .MuiTableRow-root:hover": {
              backgroundColor: "rgba(242, 0, 255, 0.05)",
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers?.length > 0 ? (
                filteredUsers?.map((row: any, index: number) => (
                  <TableRow key={row.sessionId}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {row?.createdAt
                        ? format(
                            parseISO(row?.createdAt),
                            "dd/MM/yyyy hh:mm aa"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "right",
                          gap: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => handleView(row)}
                          sx={{
                            textTransform: "none",
                            borderColor: "#7367f0",
                            color: "#7367f0",
                            "&:hover": {
                              borderColor: "rgba(115, 103, 240, 0.03)",
                            },
                          }}
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton>
                        {/* <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(row)}
                          sx={{
                            textTransform: "none",
                            borderColor: "#7367f0",
                            color: "#7367f0",
                            "&:hover": {
                              borderColor: "rgba(115, 103, 240, 0.03)",
                            },
                          }}
                        >
                          User Details
                        </Button> */}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No leads found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {selectedLead && (
        <LeadModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          lead={selectedLead}
        />
      )}
    </Box>
  );
}
