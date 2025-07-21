"use client";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TablePagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/api/client/analytics-service";
import PageSpinner from "@/components/shared/PageSpinner";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo, useState } from "react";
import leadsService from "@/services/api/client/leads-service";

// Define a professional color palette
const COLORS = ["#8F87F1", "#C68EFD", "#E9A5F1", "#FED2E2", "#651FFF"];
const cardStyles = {
  p: 3,
  borderRadius: 2,
  bgcolor: "#7367f033", // White background for the cards
  color: "#fff", // Black text
  textAlign: "center",
  border: "1px solid #7367f033",
  boxShadow: "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
};

const pieDataFormatter = (data: Record<string, number>) =>
  Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
  }));

const barDataFormatter = (
  data: Record<string, number>,
  durations?: Record<string, number>
) =>
  Object.entries(data).map(([key, value]) => ({
    name: key,
    views: value,
    duration: durations?.[key] || 0,
  }));

const Analytics = ({ insightId }: { insightId: string }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isFetching } = useQuery({
    queryKey: ["insight-analytics", insightId],
    queryFn: () =>
      analyticsService.getInsightAnalytics(undefined, undefined, insightId),
    refetchOnWindowFocus: false,
    enabled: !!insightId,
  });

  if (isFetching) return <PageSpinner />;
  if (!data?.data) return <></>;

  const {
    totalSessions,
    uniqueVisitors,
    totalPageViews,
    avgSessionDuration,
    bounceRate,
    totalLeads,
    topPages,
    browserStats,
    pageDurations,
    osStats,
    countryStats,
  } = data.data;
  return (
    <Box>
      {/* KPI Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          { label: "Total Sessions", value: totalSessions },
          { label: "Unique Visitors", value: uniqueVisitors },
          { label: "Total Page Views", value: totalPageViews },
          {
            label: "Avg. Session Duration",
            value: `${avgSessionDuration}Mins`,
          },
          { label: "Bounce Rate", value: `${bounceRate}%` },
          { label: "Total Leads", value: totalLeads },
        ].map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper sx={cardStyles}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "#fff" }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="h5"
                sx={{ mt: 1, fontWeight: "bold", color: "#fff" }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4}>
        {/* Top Pages */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#fff", fontWeight: "bold" }}
          >
            Top Pages
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: "transparent",
              borderColor: "#7367f033",
              "& .MuiTableCell-root": {
                color: "#fff",
                borderColor: "#7367f033",
              },
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(93, 0, 255, 0.2)",
                    }}
                  >
                    Page URL
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(93, 0, 255, 0.2)",
                    }}
                  >
                    Views
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(93, 0, 255, 0.2)",
                    }}
                  >
                    Avg. Duration (Mins)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {barDataFormatter(topPages, pageDurations)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          bgcolor: "rgba(144, 0, 255, 0.1)",
                          cursor: "pointer",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(93, 0, 255, 0.1)",
                        }}
                      >
                        <Tooltip title={row.name} placement="top">
                          <Typography>{row.name}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(93, 0, 255, 0.1)",
                        }}
                      >
                        {row.views}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(93, 0, 255, 0.1)",
                        }}
                      >
                        {row.duration}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={barDataFormatter(topPages, pageDurations).length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              sx={{
                color: "#fff",
                "& .MuiTablePagination-select": {
                  color: "#fff",
                },
                "& .MuiTablePagination-selectIcon": {
                  color: "#fff",
                },
                "& .MuiIconButton-root": {
                  color: "#fff",
                },
              }}
            />
          </TableContainer>
        </Grid>

        {/* Browser Stats */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#fff", fontWeight: "bold" }}
          >
            Browser Stats
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieDataFormatter(browserStats)}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieDataFormatter(browserStats).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        {/* Country Stats */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#fff", fontWeight: "bold" }}
          >
            Location Stats
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: "transparent",
              borderColor: "#7367f033",
              "& .MuiTableCell-root": {
                color: "#fff",
                borderColor: "#7367f033",
              },
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(93, 0, 255, 0.2)",
                    }}
                  >
                    City
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(93, 0, 255, 0.2)",
                    }}
                  >
                    State
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(93, 0, 255, 0.2)",
                    }}
                  >
                    Country
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(93, 0, 255, 0.2)",
                    }}
                  >
                    Visits
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countryStats?.map(
                  (
                    row: {
                      city: string;
                      state: string;
                      country: string;
                      count: number;
                    },
                    index: number
                  ) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          bgcolor: "rgba(144, 0, 255, 0.1)",
                          cursor: "pointer",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(93, 0, 255, 0.1)",
                        }}
                      >
                        {row.city}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(93, 0, 255, 0.1)",
                        }}
                      >
                        {row.state}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(93, 0, 255, 0.1)",
                        }}
                      >
                        {row.country}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(93, 0, 255, 0.1)",
                        }}
                      >
                        {row.count}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* OS Stats */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#fff", fontWeight: "bold" }}
          >
            OS Stats
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieDataFormatter(osStats)}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieDataFormatter(osStats).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function UsagePage() {
  const [selectedInsightId, setSelectedInsightId] = useState<string>("all");
  const { data, isFetching, error } = useQuery({
    queryKey: ["all-leads", "client"],
    queryFn: () => leadsService.getAllLeads(),
    refetchOnWindowFocus: false,
  });

  const insights = data?.insights;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#0A0F1E",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: "#fff" }}>
          Insight Analytics
        </Typography>
        <Select
          value={selectedInsightId}
          onChange={(e) => setSelectedInsightId(e.target.value)}
          sx={{
            bgcolor: "#7367f033", // White background for select
            color: "#fff", // Black text color for select
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7367f033",
              // Black border for select
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
      <Analytics insightId={selectedInsightId} />
    </Box>
  );
}
