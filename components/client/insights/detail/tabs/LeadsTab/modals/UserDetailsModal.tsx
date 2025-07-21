"use client";

import {
  Box,
  Typography,
  Modal,
  IconButton,
  Avatar,
  Divider,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import PageSpinner from "@/components/shared/PageSpinner";
import agentService from "@/services/api/client/agent-service";

interface UserDetailsProps {
  open: boolean;
  onClose: () => void;
  lead: any;
}

const COLORS = ["#8F87F1", "#C68EFD", "#E9A5F1", "#FED2E2"];

export default function UserDetailsModal({
  open,
  onClose,
  lead,
}: UserDetailsProps) {
  const userId = lead?.userId;

  const { data, isFetching, error } = useQuery({
    queryKey: ["lead-analytics", userId],
    queryFn: () => agentService.getLeadsAnalytics(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId && open,
  });

  if (isFetching) return <PageSpinner />;
  if (!data?.data || error) return <></>;

  const analytics = data.data;
  const eventTypesData = Object.entries(analytics.eventTypesCount || {}).map(
    ([type, count]) => ({ name: type, value: count })
  );

  const deviceData = (analytics.devices || []).map(
    (device: any, i: number) => ({
      name: device
        ? `${device.browser || "Unknown"} (${device.os || "Unknown"})`
        : "Unknown",
      value: 1,
    })
  );

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="lead-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          maxHeight: "95vh",
          bgcolor: "#0A0F1E",
          borderRadius: 3,

          overflowY: "auto",
          border: "1px solid #7367f033",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "#7367f033",
            color: "white",
          }}
        >
          <Typography variant="h6">User Details </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Lead Info */}
        <Box sx={{ p: 3, color: "#fff" }}>
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar sx={{ width: 64, height: 64 }}>
              {lead.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">{lead.name}</Typography>
              <Typography sx={{ color: "#6B7280" }}>{lead.email}</Typography>
            </Box>
          </Box> */}

          <Grid container spacing={2}>
            {/* <Grid item xs={6}>
              <DataRow label="Phone Number" value={lead.phoneNumber} />
            </Grid> */}
            <Grid item xs={6}>
              <DataRow
                label="Date"
                value={
                  lead.startedAt
                    ? new Date(lead.startedAt).toLocaleString()
                    : "N/A"
                }
              />
            </Grid>
            <Grid item xs={6}>
              <DataRow label="Session ID" value={lead.sessionId || "N/A"} />
            </Grid>
            <Grid item xs={6}>
              <DataRow label="User ID" value={lead.userId || "N/A"} />
            </Grid>
            <Grid item xs={6}>
              <DataRow label="Insight ID" value={lead.insightId || "N/A"} />
            </Grid>
            <Grid item xs={6}>
              <DataRow
                label="Address"
                value={
                  analytics.location
                    ?.map(
                      (g: { city: string; state: string; country: string }) =>
                        `${g.city}, ${g.state}, ${g.country} `
                    )
                    .join(", ") || "N/A"
                }
              />
            </Grid>
            <Grid item xs={6}>
              <DataRow
                label="Longitude, Latitude"
                value={
                  analytics.location?.length
                    ? analytics.location
                        .map(
                          (g: { latitude: number; longitude: number }) =>
                            `${g.latitude || "N/A"}, ${g.longitude || "N/A"}`
                        )
                        .join(", ")
                    : "N/A"
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Analytics */}
        <Box sx={{ p: 3, color: "#fff" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Analytics Overview
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <DataRow
                label="Total Sessions"
                value={analytics.totalSessions || "N/A"}
              />
              <DataRow
                label="Total Duration (sec)"
                value={analytics.totalDuration || "N/A"}
              />
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: "#6B7280", fontSize: 14, mb: 1 }}>
                  Pages Visited
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    bgcolor: "transparent",
                    "& .MuiTableCell-root": {
                      color: "#fff",
                      borderColor: "#7367f033",
                    },
                  }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Page URL</TableCell>
                        <TableCell align="right">Duration (seconds)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analytics.pagesVisited?.map(
                        (page: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                maxWidth: "300px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {page.page}
                            </TableCell>
                            <TableCell align="right">{page.duration}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Event Types
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={eventTypesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7367f033" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Device Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {deviceData.map((_: any, index: any) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Geo Information
              </Typography>
              <Typography>
                {analytics.geo?.length
                  ? analytics.geo
                      .map(
                        (g: any) =>
                          `${g.country || "Unknown"} (${g.ip || "Unknown"})`
                      )
                      .join(", ")
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}

function DataRow({ label, value }: { label: string; value: any }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ color: "#6B7280", fontSize: 14 }}>{label}</Typography>
      <Typography>{value || "N/A"}</Typography>
    </Box>
  );
}
