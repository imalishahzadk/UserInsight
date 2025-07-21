'use client';
import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarProps
} from "recharts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from 'react';

interface UsageDataPoint {
  name: string;
  value: number;
}

interface CustomBarProps extends Omit<BarProps, 'value'> {
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

export default function UsageStatistics() {
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
          fill={isActive ? "#4285f4" : "#E5EAFC"}
          rx={4}
          ry={4}
        />
        {isActive && (
          <g>
            <text
              x={x + width / 2}
              y={y - 15}
              textAnchor="middle"
              fill="#4285f4"
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

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "15px",
        p: 3,
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        sx={{ 
          color: "#6B7280", 
          fontSize: "1rem",
          mb: 1
        }}
      >
        Usage Statistics
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          4h 35m
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#ECFDF5',
            borderRadius: '50%',
            width: 24,
            height: 24,
          }}
        >
          <KeyboardArrowDownIcon
            sx={{
              color: "#10B981",
              fontSize: 20,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ height: 300, width: '100%', mt: 2 }}>
        <ResponsiveContainer>
          <BarChart
            data={usageData}
            margin={{ top: 30, right: 20, bottom: 20, left: 20 }}
            barSize={40}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: "#6B7280",
                fontSize: 12
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[1, 4, 8]}
              tick={{
                fill: "#6B7280",
                fontSize: 12
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