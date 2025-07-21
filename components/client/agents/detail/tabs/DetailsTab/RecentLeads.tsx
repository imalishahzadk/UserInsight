"use client";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/shared/table/DataTable";

import { useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/client/agent-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { format, parseISO } from "date-fns";

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 200,
    format: (value: string, row: any) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={row.avatar}
          sx={{
            width: 24,
            height: 24,
            bgcolor: "#070b15",
            border: "1px solid rgba(0, 229, 255, 0.1)",
          }}
        />
        <Typography sx={{ color: "#fff" }}>{value}</Typography>
      </Box>
    ),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 200,
  },
  {
    id: "createdAt",
    label: "Date",
    minWidth: 150,
    format: (value: string, row: any) => (
      <p className="!text-white">
        {format(parseISO(value), "dd/MM/yyyy hh:mm aa")}
      </p>
    ),
  },
  {
    id: "phoneNumber",
    label: "Phone number",
    minWidth: 150,
  },
  {
    id: "interestQuery",
    label: "Interest Query",
  },
];

export default function RecentLeads({ agentId }: { agentId: string }) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["leads", agentId],
    queryFn: () => agentService.getAgentLeads(agentId),
    refetchOnWindowFocus: false,
  });

  const router = useRouter();

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data?.data || error) {
    return <></>;
  }

  const handleViewAllLeads = () => {
    router.push("/admin/agents/1/leads"); // Navigate to Leads tab
  };

  return (
    <Box
      sx={{
        bgcolor: "#0a0f1e",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0, 229, 255, 0.1)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
          Recent leads
        </Typography>
        <Button
          variant="contained"
          onClick={handleViewAllLeads}
          sx={{
            bgcolor: "#00e5ff",
            color: "#0a0f1e",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              bgcolor: "rgba(0, 229, 255, 0.8)",
            },
          }}
        >
          View All Leads
        </Button>
      </Box>

      {/* Table */}
      <Box
        sx={{
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
    </Box>
  );
}
