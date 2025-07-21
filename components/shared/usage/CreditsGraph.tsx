import React from "react";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CreditsGraphProps {
  data: any[];
  onTypeChange?: (type: string) => void;
  onPeriodChange?: (period: "this-month" | "last-month") => void;
}

const CreditsGraph: React.FC<CreditsGraphProps> = ({
  data,
  onTypeChange,
  onPeriodChange,
}) => {
  const [type, setType] = React.useState("knowledge");
  const [period, setPeriod] = React.useState<"this-month" | "last-month">(
    "this-month"
  );

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    if (newType !== null) {
      setType(newType);
      onTypeChange?.(newType);
    }
  };

  const handlePeriodChange = (event: any) => {
    setPeriod(event.target.value);
    onPeriodChange?.(event.target.value);
  };

  return (
    <Paper
      className="box-style"
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        color: "white",
        height: "400px",
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
        <Box>
          <Box sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}>Statistics</Box>
          <Box sx={{ fontSize: "1.25rem", fontWeight: 500 }}>Credits usage</Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <ToggleButton
            sx={{ bgcolor: "#10172c", color: "white" }}
            value="chat"
          >
            Chat
          </ToggleButton>

          <Select
            value={period}
            onChange={handlePeriodChange}
            size="small"
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              bgcolor: "#10172c",
              color: "white",
              borderRadius: "30px",
              "& .MuiSelect-select": {
                py: 1,
                px: 2,
              },
            }}
          >
            <MenuItem value="this-month">This month</MenuItem>
            <MenuItem value="last-month">Last month</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box sx={{ height: "calc(100% - 80px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "white" }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "white" }} />
            <Tooltip />
            <Bar dataKey="value" fill="#00e5ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default CreditsGraph;
