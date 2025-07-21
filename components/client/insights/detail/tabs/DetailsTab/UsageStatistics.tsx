"use client";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarProps,
} from "recharts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/client/agent-service";
import PageSpinner from "@/components/shared/PageSpinner";

interface UsageDataPoint {
  name: string;
  value: number;
}

interface TopCountry {
  _id: string;
  count: number;
}

interface IAgentUsageResponse {
  totalVisitors: number;
  uniqueSessions: number;
  uniqueUsers: number;
  topCountries: TopCountry[];
  chartData: UsageDataPoint[];
}

interface CustomBarProps extends Omit<BarProps, "value"> {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  index: number;
  payload: UsageDataPoint;
}

const usageData: UsageDataPoint[] = [
  { name: "M", value: 8 },
  { name: "T", value: 2 },
  { name: "W", value: 3.5 },
  { name: "T", value: 2.5 },
  { name: "F", value: 6.7 },
  { name: "S", value: 2 },
  { name: "S", value: 4 },
];

export default function UsageStatistics({ agentId }: { agentId: string }) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["agent-stats", agentId],
    queryFn: () => agentService.getAgentUsageStatsById(agentId),
    refetchOnWindowFocus: false,
  });
  console.log("testttt", data);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const CustomBar = (props: CustomBarProps) => {
    const { x, y, width, height, index, value } = props;
    const isActive = index === activeIndex;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={isActive ? "#000000" : "rgba(0, 0, 0, 0.2)"}
          rx={4}
          ry={4}
        />
        {isActive && (
          <g>
            <text
              x={x + width / 2}
              y={y - 15}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="13"
              fontWeight="500"
            >
              {`${Math.floor(value)}hr ${Math.round((value % 1) * 60)}m`}
            </text>
          </g>
        )}
      </g>
    );
  };

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) return <></>;

  return (
    <Box
      sx={{
        bgcolor: "#1e1e3266",
        backdropFilter: "blur(20px)",
        border: "1px solid #7367f033",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        borderRadius: "16px",
        p: 3,
      }}
    >
      <Typography
        sx={{
          color: "#ffffff",
          opacity: 0.7,
          fontSize: "1rem",
          mb: 1,
        }}
      >
        Usage Statistics
      </Typography>

      <Box sx={{ height: 300, width: "100%", mt: 2 }}>
        <ResponsiveContainer>
          <BarChart
            data={data.chartData}
            margin={{ top: 30, right: 20, bottom: 20, left: 20 }}
            barSize={40}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(254, 254, 254, 0.1)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#ffffff",
                opacity: 0.7,
                fontSize: 12,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[1, 4, 8]}
              tick={{
                fill: "#ffffff",
                opacity: 0.7,
                fontSize: 12,
              }}
              tickFormatter={(value) => `${value} hr`}
            />
            <Bar
              dataKey="value"
              shape={(props: BarProps) => CustomBar(props as CustomBarProps)}
              onMouseEnter={(data, index) => handleMouseEnter(data, index)}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
