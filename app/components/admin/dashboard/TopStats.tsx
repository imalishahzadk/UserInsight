"use client";
import analyticsService from "@/services/api/user/analytics-service";
import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function TopStats() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["dashboard-statistics", "user"],
    queryFn: () => analyticsService.getDashboardCardStatistics(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <></>;
  }

  if (!data) {
    return <></>;
  }

  const stats = [
    {
      title: "Clients",
      value: data.clients.total,
      color: "#00e5ff",
      subtitle: "Total Clients",
      change: `Last 30d: +${data.clients.last30d}`,
    },
    {
      title: "Users",
      value: data.users.total,
      color: "#00e5ff",
      subtitle: "Total Users",
      change: `Last 30d: +${data.users.last30d}`,
    },
    {
      title: "Conversations",
      value: data.conversations.total,
      color: "#00e5ff",
      subtitle: "Total Conversations",
      change: `Last 30d: +${data.conversations.last30d}`,
    },
    {
      title: "Agents",
      value: data.agents.total,
      color: "#00e5ff",
      subtitle: "Total Agents",
      change: `Last 30d: +${data.agents.last30d}`,
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              borderRadius: "12px",
              p: 3,
              height: "100%",
              // border: "1px solid rgba(0, 229, 255, 0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "rgba(1, 10, 11, 0.4)",
                transform: "translateY(-5px)",
                boxShadow: "0 10px 30px rgba(3, 41, 46, 0.1)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#000000",
                mb: 2,
              }}
            >
              {stat.title}
            </Typography>

            <Typography
              sx={{
                fontSize: 48,
                fontWeight: 700,
                color: stat.color,
                mb: 1,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: 14,
                }}
              >
                {stat.subtitle}
              </Typography>

              <Typography
                sx={{
                  color: "#000",
                  fontSize: 14,
                }}
              >
                {stat.change}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
