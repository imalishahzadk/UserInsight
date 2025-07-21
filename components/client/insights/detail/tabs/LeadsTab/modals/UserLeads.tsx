"use client";

import {
  Box,
  Typography,
  Modal,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface UserLeadsProps {
  open: boolean;
  onClose: () => void;
  lead: any[];
  locations: any[];
  sessionId: string;
}

export default function UserLeads({
  open,
  onClose,
  lead,
  locations,
  sessionId,
}: UserLeadsProps) {
  //   const formatLocation = (location: any) => {
  //     if (!location?.location) return "N/A";
  //     const { city, state, country, latitude, longitude } = location.location;
  //     return `${city}, ${state}, ${country} (${latitude.toFixed(
  //       6
  //     )}, ${longitude.toFixed(6)})`;
  //   };

  const getLocationBySessionId = (sessionId: string) => {
    return locations?.find((loc) => loc.sessionId === sessionId);
  };

  // Filter leads based on sessionId
  const filteredLeads =
    lead?.filter((item) => item.sessionId === sessionId) || [];

  if (!filteredLeads.length) {
    return (
      <Modal open={open} onClose={onClose} aria-labelledby="lead-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "#0A0F1E",
            borderRadius: 3,
            p: 4,
            border: "1px solid #7367f033",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            No Data Available
          </Typography>
          <Typography sx={{ color: "#6B7280" }}>
            No leads found for this session.
          </Typography>
        </Box>
      </Modal>
    );
  }

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
          <Typography variant="h6">Lead Details</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Leads Table */}
        <Box sx={{ p: 3, color: "#fff" }}>
          <TableContainer component={Paper} sx={{ bgcolor: "transparent" }}>
            <Table
              sx={{
                "& .MuiTableCell-root": {
                  color: "#fff",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>
                    Phone Number
                  </TableCell>
                  <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>
                    Session ID
                  </TableCell>
                  <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>
                    Created At
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeads.map((item) => {
                  const locationData = getLocationBySessionId(item.sessionId);
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phoneNumber}</TableCell>
                      <TableCell>{item.sessionId}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                      {/* <Tooltip
                        title={formatLocation(locationData)}
                        arrow
                        placement="top"
                      >
                        <TableCell
                          sx={{
                            maxWidth: 250,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatLocation(locationData)}
                        </TableCell>
                      </Tooltip> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Modal>
  );
}
