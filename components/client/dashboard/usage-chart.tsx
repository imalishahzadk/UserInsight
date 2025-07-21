"use client";

import PageSpinner from "@/components/shared/PageSpinner";
import analyticsService from "@/services/api/client/analytics-service";
import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

const metrics = [
  { key: "activeBots", label: "Active bots", color: "#00e5ff" },
  { key: "totalUsers", label: "Total users", color: "#3b82f6" },
];

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#141c31",
          p: 1.5,
          borderRadius: 1,
          boxShadow: "0 2px 10px rgba(0,229,255,0.1)",
          border: "1px solid rgba(0,229,255,0.2)",
        }}
      >
        <Typography
          sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: "#fff" }}
        >
          {label}
        </Typography>
        {payload.map((item: any) => (
          <Box
            key={item.dataKey}
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: item.color,
              }}
            />
            <Typography sx={{ fontSize: 13, color: "#fff" }}>
              {item.name}: {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const AgentUsage = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["users-and-bot-chart-stats", "client"],
    queryFn: () => analyticsService.getUsersAndBotCharStats(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#0a0f1e",
        borderRadius: 2,
        border: "1px solid rgba(0, 229, 255, 0.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "rgba(0, 229, 255, 0.4)",
          transform: "translateY(-5px)",
          boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
        },
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 2, color: "#fff" }}>
        Agents usage, in simple way
      </Typography>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        {metrics.map((metric) => (
          <Box
            key={metric.key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: metric.color,
              }}
            />
            <Typography
              sx={{ fontSize: 14, color: "rgba(255, 255, 255, 0.7)" }}
            >
              {metric.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255, 255, 255, 0.1)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#fff", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#fff", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />

            {metrics.map((metric) => (
              <Bar
                key={metric.key}
                dataKey={metric.key}
                fill={metric.color}
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

const StatisticsPieChart = () => {
  const {
    data: stats,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["active-bots-n-users-counts"],
    queryFn: () => analyticsService.getUsersAndBotCounts(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  const data = [
    { name: "Active bots", value: stats?.activeBots ?? 0, color: "#00e5ff" },
    { name: "Total users", value: stats?.totalUsers ?? 0, color: "#3b82f6" },
  ];
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#0a0f1e",
        borderRadius: 2,
        height: "100%",
        border: "1px solid rgba(0, 229, 255, 0.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "rgba(0, 229, 255, 0.4)",
          transform: "translateY(-5px)",
          boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>
          Statistics
        </Typography>
      </Box>

      <Box
        sx={{
          height: 250,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Center Text */}
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 600,
              color: "#00e5ff",
              lineHeight: 1,
            }}
          >
            {stats?.activeBots ?? 0}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Active bots
          </Typography>
        </Box>

        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mt: 2,
        }}
      >
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: item.color,
              }}
            />
            <Typography
              sx={{
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {item.name} {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const UsageChart = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ fontSize: "1.25rem", fontWeight: 500, color: "#fff", mb: 1 }}
        >
          Usage Statistics
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
        >
          Track your conversation and bot performance
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              bgcolor: "#0a0f1e",
              borderRadius: "16px",
              p: 3,
              border: "1px solid rgba(0, 229, 255, 0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
                transform: "translateY(-5px)",
                boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
              },
            }}
          >
            <AgentUsage />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: "#0a0f1e",
              borderRadius: "16px",
              p: 3,
              border: "1px solid rgba(0, 229, 255, 0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
                transform: "translateY(-5px)",
                boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
              },
              height: "100%",
            }}
          >
            <StatisticsPieChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsageChart;
