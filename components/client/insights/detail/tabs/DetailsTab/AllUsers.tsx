"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/client/agent-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { format, parseISO } from "date-fns";
import UserLeads from "../LeadsTab/modals/UserLeads";
import UserDetailsModal from "../LeadsTab/modals/UserDetailsModal";

const AllUsers = ({ agentId }: { agentId: string }) => {
  const insightId = agentId;
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const { data, isFetching, error } = useQuery({
    queryKey: ["lead-analytics", insightId],
    queryFn: () => agentService.getUserLeads(insightId),
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <PageSpinner />;
  if (!data?.data || error) return <></>;

  const usersData = data.data.sessions;
  const leadsData = data.data.leads;
  const locationsData = data.data.events;

  // Filter users based on search query
  const filteredUsers = usersData.filter((user: any) =>
    user.sessionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = async (lead: any) => {
    setLoadingLeads(true);
    setSelectedLead(lead);
    setModalOpen(true);
    setLoadingLeads(false);
  };

  const handleViewDetails = async (lead: any) => {
    setLoadingDetails(true);
    setDetailsModalOpen(true);
    setSelectedLead(lead);
    setLoadingDetails(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
          Users
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ color: "#6B7280" }}>Total Users</Typography>
          <Typography sx={{ fontWeight: 500 }}>{data.data.length}</Typography>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
          <TextField
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiInputBase-root": {
                height: "48px",

                borderRadius: "12px",
                border: "1px solid #7367f033",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  borderColor: "#7367f033",
                },
                "&:focus-within": {
                  borderColor: "#7367f033",
                  boxShadow:
                    "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
                },
              },
              "& fieldset": { border: "none" },
              "& input": {
                color: "#fff",
                "&::placeholder": {
                  color: "rgba(196, 196, 196, 0.664)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="05 Jan, 2025"
            sx={{
              minWidth: { xs: "100%", sm: 200 },
              "& .MuiInputBase-root": {
                height: "48px",
                bgcolor: "#1e1e3266",
                borderRadius: "12px",
                border: "1px solid #7367f033",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  borderColor: "#7367f033",
                },
                "&:focus-within": {
                  borderColor: "#7367f033",
                  boxShadow: "0 0 20px rgba(115, 103, 240, 0.2)",
                },
              },
              "& fieldset": { border: "none" },
              "& input": {
                color: "#ffffff",
                textAlign: "center",
                cursor: "pointer",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon sx={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#0a0f1e",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(0, 229, 255, 0.1)",
          "& .MuiTableCell-root": {
            color: "#fff",
            opacity: 0.7,
            borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
          },
          "& .MuiTableCell-head": {
            backgroundColor: "#070b15",
            fontWeight: 600,
            opacity: 1,
          },
          "& .MuiTableRow-root:hover": {
            backgroundColor: "rgba(0, 229, 255, 0.05)",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Session ID</TableCell>
              <TableCell>Started At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((row: any, index: number) => (
              <TableRow key={row.sessionId}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                      {index + 1}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.sessionId}</TableCell>
                <TableCell>
                  {row.startedAt
                    ? format(parseISO(row.startedAt), "dd/MM/yyyy hh:mm aa")
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "right",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleView(row)}
                      disabled={loadingLeads}
                      sx={{
                        textTransform: "none",
                        borderColor: "#7367f0",
                        color: "#7367f0",
                        minWidth: "100px",
                        "&:hover": {
                          borderColor: "rgba(115, 103, 240, 0.03)",
                        },
                      }}
                    >
                      {loadingLeads ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "View Leads"
                      )}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(row)}
                      disabled={loadingDetails}
                      sx={{
                        textTransform: "none",
                        borderColor: "#7367f0",
                        color: "#7367f0",
                        minWidth: "100px",
                        "&:hover": {
                          borderColor: "rgba(115, 103, 240, 0.03)",
                        },
                      }}
                    >
                      {loadingDetails ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "User Details"
                      )}
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      {selectedLead && (
        <UserLeads
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          lead={leadsData}
          locations={locationsData}
          sessionId={selectedLead.sessionId}
        />
      )}
      {selectedLead && (
        <UserDetailsModal
          open={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          lead={selectedLead}
        />
      )}
    </Box>
  );
};

export default AllUsers;
