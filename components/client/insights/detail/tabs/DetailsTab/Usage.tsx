"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";
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
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Define a professional color palette
const COLORS = ["#8F87F1", "#C68EFD", "#E9A5F1", "#FED2E2", "#651FFF"];
const cardStyles = {
  p: 3,
  borderRadius: 2,
  bgcolor: "#7367f033",
  color: "#fff",
  textAlign: "center",
  boxShadow: "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
};

const pieDataFormatter = (data: Record<string, number>) =>
  Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
  }));

const barDataFormatter = (data: Record<string, number>) =>
  Object.entries(data).map(([key, value]) => ({
    name: key,
    views: value,
  }));

const Analytics = ({ agentId }: { agentId: string }) => {
  // console.log("agentId", agentId);
  const { data, isFetching } = useQuery({
    queryKey: ["get-insight-analytics"],
    queryFn: () =>
      analyticsService.getInsightAnalyticsOfAgent(
        undefined,
        undefined,
        agentId
      ),
    refetchOnWindowFocus: false,
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
          { label: "Avg. Session Duration", value: `${avgSessionDuration}s` },
          { label: "Bounce Rate", value: `${bounceRate}%` },
          { label: "Total Leads", value: totalLeads },
        ].map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper sx={cardStyles}>
              <Typography variant="subtitle1" sx={{ color: "#aaa" }}>
                {item.label}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
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
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
            Top Pages
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barDataFormatter(topPages)}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="views" fill="#8F87F1" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Browser Stats */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        {/* OS Stats */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        {/* Country Stats */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
            Country Stats
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieDataFormatter(countryStats)}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieDataFormatter(countryStats).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function UsagePage({ agentId }: { agentId: string }) {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#1e1e3266",
        backdropFilter: "blur(20px)",
        border: "1px solid #7367f033",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        borderRadius: "16px",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: "#fff" }}>
        Insight Analytics
      </Typography>
      <Analytics agentId={agentId} />
    </Box>
  );
}
