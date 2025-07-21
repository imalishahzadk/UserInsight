"use client";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Switch,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/client/agent-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { useState } from "react";
import LeadsTab from "../LeadsTab";
import LeadSettings from "./LeadSettings";
import AllUsers from "./AllUsers";

interface LeadData {
  _id: string;
  count: number;
}

interface ApiResponse {
  topCountries: LeadData[];
  totalVisitors: number;
  uniqueSessions: number;
  uniqueUsers: number;
}

const columns = [
  {
    id: "country",
    label: "Country",
    minWidth: 200,
  },
  {
    id: "count",
    label: "Count",
    minWidth: 150,
  },
];

export default function RecentLeads({ agentId }: { agentId: string }) {
  const [currentTab, setCurrentTab] = useState(1);
  const { data, isFetching, error } = useQuery<ApiResponse, Error>({
    queryKey: ["leads", agentId],
    queryFn: async () => {
      const response = await agentService.getAgentLeads(agentId);
      return response as unknown as ApiResponse;
    },
    refetchOnWindowFocus: false,
  });

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data || error) {
    return <></>;
  }

  return (
    <Box
      sx={{
        bgcolor: "#1e1e3266",
        backdropFilter: "blur(20px)",
        border: "1px solid #7367f033",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pt: 3,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#ffffff" }}>
          Leads
        </Typography>
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          px: 3,
          mt: 2,
          borderBottom: "1px solid #9b9b9b",
          "& .MuiTab-root": { color: "#fff" },
          "& .Mui-selected": { color: "#7367f0 !important" },
          "& .MuiTabs-indicator": { backgroundColor: "#7367f0" },
        }}
      >
        <Tab label="Recent Leads" value={1} />
        <Tab label="All Leads" value={2} />
        <Tab label="Lead Settings" value={3} />
        <Tab label="All Users" value={4} />
      </Tabs>

      {currentTab === 1 && (
        <>
          <Box sx={{ p: 3, borderBottom: "1px solid #9b9b9b" }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box>
                <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                  Total Visitors
                </Typography>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: 600, color: "#ffffff" }}
                >
                  {data.totalVisitors}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                  Unique Sessions
                </Typography>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: 600, color: "#fff" }}
                >
                  {data.uniqueSessions}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                  Unique Users
                </Typography>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: 600, color: "#fff" }}
                >
                  {data.uniqueUsers}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{
                          minWidth: column.minWidth,
                          color: "#fff",
                          borderBottom: "1px solid #7367f033",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.topCountries?.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid #7367f033",
                        }}
                      >
                        {row._id}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid #7367f033",
                        }}
                      >
                        {row.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}

      {currentTab === 2 && <LeadsTab agentId={agentId} />}
      {currentTab === 3 && <LeadSettings agentId={agentId} />}
      {currentTab === 4 && <AllUsers agentId={agentId} />}
    </Box>
  );
}
