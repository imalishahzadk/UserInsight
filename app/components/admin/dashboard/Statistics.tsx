"use client";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/api/user/analytics-service";
import PageSpinner from "@/components/shared/PageSpinner";
import React, { useState } from "react";

const pieData = [
  { name: "Enterprise Credits", value: 45000, color: "#00e5ff" },
  { name: "Business Credits", value: 35000, color: "#3b82f6" },
  { name: "Basic Credits", value: 25000, color: "#6366f1" },
  { name: "Trial Credits", value: 15000, color: "#8b5cf6" },
];

const BotAndCreditUsageTrends = () => {
  const [filter, setFilter] = useState<
    "this-month" | "last-month" | "this-year"
  >("this-month");

  const { data, isFetching, error } = useQuery({
    queryKey: ["bot-and-credit-usage-trends", "user", filter],
    queryFn: () => analyticsService.getBotAndCreditUsageTrends(filter),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.6)",
          mb: 0.5,
        }}
      >
        Platform Analytics
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "1.25rem", fontWeight: 500, color: "#fff" }}
        >
          Bot & Credit Usage Trends
        </Typography>

        <Select
          size="small"
          value={filter}
          onChange={(e: SelectChangeEvent) =>
            setFilter(
              e.target.value as "this-month" | "last-month" | "this-year"
            )
          }
          sx={{
            minWidth: 120,
            bgcolor: "#070b15",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            "& .MuiSelect-icon": { color: "#00e5ff" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
        >
          <MenuItem value="this-month">This month</MenuItem>
          <MenuItem value="last-month">Last month</MenuItem>
          <MenuItem value="this-year">This year</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        {[
          { color: "#00e5ff", label: "Active Bots" },
          { color: "#6366f1", label: "Credit Usage" },
          { color: "#8b5cf6", label: "New Signups" },
          { color: "#ec4899", label: "Bot Creation" },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
              sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ height: 350, mt: 4 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.6)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.6)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0f1e",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="activeBots"
              stroke="#00e5ff"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="creditUsage"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="newSignups"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="botCreation"
              stroke="#ec4899"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default function Statistics() {
  return (
    <>
      <Box
        sx={{
          flex: { xs: "1", lg: "2" },
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
        <BotAndCreditUsageTrends />

        <Box
          sx={{
            flex: { xs: "1", lg: "2" },
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              sx={{ fontSize: "1.25rem", fontWeight: 500, color: "#fff" }}
            >
              Credit Distribution
            </Typography>
            <MoreHorizIcon sx={{ color: "#00e5ff", cursor: "pointer" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative", height: 250, width: "100%" }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "1.5rem", fontWeight: 600, color: "#00e5ff" }}
                >
                  120K
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
                >
                  Total Credits
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              {pieData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: item.color,
                      }}
                    />
                    <Typography sx={{ fontSize: "0.875rem", color: "#fff" }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "0.875rem", color: "#fff" }}>
                    {item.value.toLocaleString()} credits
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
