"use client";

import { Box, Typography, Grid } from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/api/client/analytics-service";
import PageSpinner from "@/components/shared/PageSpinner";

const generateSparklineData = (baseValue: number) => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: baseValue + Math.random() * 100 - 50,
  }));
};

interface UsageCardProps {
  title: string;
  value: string | number;
  chartColor: string;
  data: any[];
}

const UsageCard = ({ title, value, chartColor, data }: UsageCardProps) => (
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
    <Typography
      sx={{ fontSize: "1rem", fontWeight: 500, color: "#fff", mb: 2 }}
    >
      {title}
    </Typography>

    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#00e5ff" }}>
        {value}
      </Typography>
    </Box>

    <Box sx={{ height: 60 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Box>
);

export default function CreditsUsage() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["credit-usage", "client"],
    queryFn: () => analyticsService.getUsageStats(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return <></>;
  }

  const cards = [
    {
      title: "Active users",
      value: data.activeUsers,
      chartColor: "#00e5ff",
      data: generateSparklineData(825),
    },
    {
      title: "Conversations",
      value: data.conversations,
      colorTheme: "#3b82f6",
      chartColor: "#3b82f6",
      data: generateSparklineData(1240),
    },
    {
      title: "Tokens used",
      value: data.tokensUsed,
      colorTheme: "#6366f1",
      chartColor: "#6366f1",
      data: generateSparklineData(2435),
    },
    {
      title: "Leads",
      value: data.leads,
      colorTheme: "#8b5cf6",
      chartColor: "#8b5cf6",
      data: generateSparklineData(935),
    },
  ];

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <UsageCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
