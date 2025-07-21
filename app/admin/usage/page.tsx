"use client";
import { Box, Select, MenuItem } from "@mui/material";
import MetricCard from "@/components/shared/usage/MetricCard";
import CreditsGraph from "@/components/shared/usage/CreditsGraph";
import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/api/user/analytics-service";
import { useState } from "react";
import PageSpinner from "@/components/shared/PageSpinner";
import CreditsUsage from "@/app/components/admin/dashboard/CreditsUsage";

const UsageStats = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["usage", "user"],
    queryFn: () => analyticsService.getUsageStats(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return <></>;
  }

  const metrics = [
    {
      title: "Tokens (total)",
      value: data.tokens.thisMonth,
      colorTheme: "#00e5ff",
    },
    {
      title: "Tokens (last 30 days)",
      value: data.tokens.lastMonth,
      colorTheme: "#3b82f6",
    },
    {
      title: "API cost (total)",
      value: `$${data.cost.thisMonth}`,
      colorTheme: "#6366f1",
    },
    {
      title: "API cost (last 30 days)",
      value: `$${data.cost.lastMonth}`,
      colorTheme: "#8b5cf6",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 3,
        mb: 4,
      }}
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          colorTheme={metric.colorTheme}
          sx={{
            bgcolor: "#0a0f1e",
            borderRadius: "16px",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "rgba(0, 229, 255, 0.4)",
              transform: "translateY(-5px)",
              boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
            },
          }}
          changePercentage={0}
          subtitle={""}
          subtitleValue={""}
        />
      ))}
    </Box>
  );
};

const TokensUsageGraph = () => {
  const [period, setPeriod] = useState<"this-month" | "last-month">(
    "this-month"
  );

  const { data, isFetching, error } = useQuery({
    queryKey: ["tokens-usage-graph", "user", period],
    queryFn: () => analyticsService.getTokensUsageWithFilter(period),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return <></>;
  }

  if (data.length <= 0) {
    return <></>;
  }

  return (
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
      <CreditsGraph
        data={data}
        onPeriodChange={(period: "this-month" | "last-month") =>
          setPeriod(period)
        }
      />
    </Box>
  );
};

export default function UsagePage() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#070b15",
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
        <Box
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Usage
        </Box>

        {/* <Select
          defaultValue="This month"
          size="small"
          sx={{
            minWidth: 120,
            bgcolor: "#0a0f1e",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            "& .MuiSelect-icon": { color: "#00e5ff" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&:hover": {
              borderColor: "rgba(0, 229, 255, 0.4)",
            },
          }}
        >
          <MenuItem value="This month">This month</MenuItem>
          <MenuItem value="Last month">Last month</MenuItem>
          <MenuItem value="Last 3 months">Last 3 months</MenuItem>
        </Select> */}
      </Box>

      {/* <UsageStats /> */}
      <CreditsUsage />
      <TokensUsageGraph />
    </Box>
  );
}
