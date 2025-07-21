"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import DataTable, { Column } from "@/components/shared/table/DataTable";
import LeadModal from "./modals/LeadModal";
import { useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/user/agent-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { format, parseISO } from "date-fns";

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    format: (value: string, row: any) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={row.avatar}
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#070b15",
            border: "1px solid rgba(0, 229, 255, 0.1)",
          }}
        />
        <Typography sx={{ color: "#fff", fontWeight: 500 }}>{value}</Typography>
      </Box>
    ),
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "createdAt",
    label: "Date",
    format: (value: string, row: any) => (
      <p className="!text-white">
        {format(parseISO(value), "dd/MM/yyyy hh:mm aa")}
      </p>
    ),
  },
  {
    id: "phoneNumber",
    label: "Phone number",
  },
  {
    id: "interestQuery",
    label: "Interest Query",
  },
];

const LeadsTab = ({ agentId }: { agentId: string }) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["leads", agentId],
    queryFn: () => agentService.getAgentLeads(agentId),
    refetchOnWindowFocus: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data?.data || error) {
    return <></>;
  }

  const handleView = (lead: any) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleMenuOption = (action: string) => {
    if (action === "edit") {
      // Handle edit
    } else if (action === "delete") {
      // Handle delete
    } else if (action === "view") {
      handleView(selectedRow);
    }
    handleMenuClose();
  };

  const actions = [
    {
      label: "View",
      type: "button",
      buttonStyle: {
        variant: "contained",
        children: "View",
        sx: {
          bgcolor: "#1A83FF",
          borderRadius: "100px",
          textTransform: "none",
          minWidth: "80px",
          height: "36px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#1666CC",
            boxShadow: "none",
          },
        },
      },
    },
    {
      label: "Menu",
      type: "button",
      buttonStyle: {
        variant: "text",
        children: <MoreVertIcon />,
        sx: {
          minWidth: "auto",
          px: 1,
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
  ];

  const handleActionClick = (action: string, row: any) => {
    if (action === "View") {
      handleView(row);
    } else if (action === "Menu") {
      handleMenuClick(event as any, row);
    }
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
          Leads
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ color: "#6B7280" }}>Total leads</Typography>
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
            placeholder="Search lead"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#0a0f1e",
                color: "#fff",
                height: "45px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
                "& fieldset": {
                  border: "none",
                },
              },
              "& input::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00e5ff" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="05 Jan, 2025"
            sx={{
              width: "200px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#0a0f1e",
                height: "45px",
                color: "#fff",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
                "& fieldset": {
                  border: "none",
                },
              },
              "& input::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon sx={{ color: "#00e5ff" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <Box
        sx={{
          bgcolor: "#0a0f1e",
          borderRadius: "16px",
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
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiTablePagination-actions button": {
            color: "#00e5ff",
            "&:disabled": {
              color: "rgba(0, 229, 255, 0.3)",
            },
          },
          "& .MuiSelect-icon": {
            color: "#00e5ff",
          },
        }}
      >
        <DataTable columns={columns} rows={data.data} />
      </Box>

      {/* Modal */}
      {selectedLead && (
        <LeadModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          lead={selectedLead}
        />
      )}
    </Box>
  );
};

export default LeadsTab;
