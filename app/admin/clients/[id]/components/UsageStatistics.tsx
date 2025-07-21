"use client";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import clientService from "@/services/api/user/client-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { useQuery } from "@tanstack/react-query";

export default function UsageStatistics({ clientId }: { clientId: string }) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["clients-agent-conversation-stats", clientId],
    queryFn: () => clientService.getClientBotConversationUsage(clientId),
    refetchOnWindowFocus: false,
  });

  const [activeIndex, setActiveIndex] = useState<any>();

  const handleMouseEnter = (_data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const CustomBar = (props: any) => {
    const { x, y, width, height, index } = props;
    const isActive = index === activeIndex;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={isActive ? "#ce9ffc" : "rgba(144, 0, 255, 0.2)"}
          rx={4}
          ry={4}
        />
        {isActive && (
          <text
            x={x + width / 2}
            y={y - 15}
            textAnchor="middle"
            fill="#ce9ffc"
            fontSize="13"
            fontWeight="500"
          >
            {props.value.toLocaleString()}
          </text>
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
        bgcolor: "rgba(30, 30, 50, 0.4)",
        borderRadius: "16px",
        border: "1px solid rgba(115, 103, 240, 0.2)",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 15px 40px, rgba(115, 103, 240, 0.2) 0px 0px 20px",
        p: 3,
        height: "100%",
      }}
    >
      <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: "1rem", mb: 1 }}>
        Conversations
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {data.totalUsage}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0, 229, 255, 0.1)",
            borderRadius: "50%",
            width: 24,
            height: 24,
          }}
        >
          <KeyboardArrowDownIcon
            sx={{
              color: "#ce9ffc",
              fontSize: 20,
            }}
          />
        </Box>
      </Box>

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
              stroke="rgba(255, 255, 255, 0.1)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#fff", opacity: 0.7, fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[200, 500, 800]}
              tick={{ fill: "#fff", opacity: 0.7, fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Bar
              dataKey="value"
              shape={<CustomBar />}
              onMouseEnter={(data, index) => handleMouseEnter(data, index)}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
