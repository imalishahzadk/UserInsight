"use client";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/shared/table/DataTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const leadsData = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    avatar: "/images/profile-placeholder.png",
    name: "Adam Smith",
    email: "adam12@gmail.com",
    address: "Springfield, IL 62704",
    date: "05 Jan, 2025",
    phone: "+1 (555) 867-5309",
  }));

const columns: Column[] = [
  {
    id: "id",
    label: "#",
    minWidth: 50,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    format: (value, row) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar src={row.avatar} sx={{ width: 24, height: 24 }} />
        {value}
      </Box>
    ),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
  },
  {
    id: "phone",
    label: "Phone number",
    minWidth: 150,
  },
];

const actions = [
  {
    label: "more",
    icon: MoreVertIcon,
    type: "button" as const,
    buttonStyle: {
      minWidth: "auto",
      padding: "4px",
      color: "#6B7280",
    },
    onClick: (row: any) => {
      // Handle the click event here
    },
  },
];

export default function RecentLeads() {
  const router = useRouter();

  const handleViewAllLeads = () => {
    router.push("/admin/agents/1/leads"); // Navigate to Leads tab
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography variant="h6">Recent leads</Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#4285f4",
            borderRadius: "100px",
            textTransform: "none",
            px: 3,
            "&:hover": { bgcolor: "#3b77db" },
          }}
          onClick={handleViewAllLeads}
        >
          View All Leads
        </Button>
      </Box>

      <DataTable columns={columns} rows={leadsData} actions={actions} />
    </Box>
  );
}
