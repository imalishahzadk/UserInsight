"use client";
import { Box, Typography, Switch, IconButton, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import analyticsService from "@/services/api/client/analytics-service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { replaceUrlVariables } from "@/utils";
import { C_AGENTS_DETAIL_ROUTE, C_ALL_AGENTS_ROUTE } from "@/core/routes";

export default function AgentsTable() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["most-recent-agents", "client"],
    queryFn: () => analyticsService.getMostRecentAgents(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <></>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A" }}>
            Agents
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#666" }}>
            Manage and monitor your AI agents
          </Typography>
        </Box>
        <Box
          component="button"
          sx={{
            px: 3,
            py: 1,
            bgcolor: "#4285f4",
            color: "white",
            borderRadius: 50,
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
            "&:hover": {
              bgcolor: "#3367d6",
            },
          }}
        >
          View All Agents
        </Box>
      </Box>

      {/* Table */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0px 4px 35px 0px #0D0A2C0F",
        }}
      >
        {/* Table Header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 150px 100px 150px",
            gap: 2,
            p: 2,
            bgcolor: "black",
            color: "white",
          }}
        >
          <Box></Box>
          <Typography sx={{ fontSize: 14 }}>Bots</Typography>
          <Typography sx={{ fontSize: 14 }}>Messages</Typography>
          <Typography sx={{ fontSize: 14 }}>On/Off</Typography>
          <Typography sx={{ fontSize: 14 }}>Action</Typography>
        </Box>

        {/* Table Body */}
        {data.map((agent, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 150px 100px 150px",
              gap: 2,
              p: 2,
              borderBottom: "1px solid #eee",
              alignItems: "center",
              "&:last-child": {
                borderBottom: "none",
              },
            }}
          >
            {/* Checkbox */}
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Avatar src={agent.imageUrl} sizes="24px" />
            </Box>

            {/* Name & Email */}
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {agent.name}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#666" }}>
                {agent.description}
              </Typography>
            </Box>

            {/* Messages */}
            <Typography sx={{ fontSize: 14 }}>{agent.messagesCount}</Typography>

            {/* Status Switch */}
            <Switch
              checked={agent.isActive}
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4285f4",
                  "&:hover": {
                    backgroundColor: "rgba(66, 133, 244, 0.08)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4285f4",
                },
              }}
            />

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                href={replaceUrlVariables(C_AGENTS_DETAIL_ROUTE, {
                  id: agent._id,
                })}
                component={Link}
                sx={{
                  px: 3,
                  py: 1,
                  bgcolor: "#E8F0FE",
                  color: "#4285f4",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: "#D2E3FC",
                  },
                }}
              >
                View
              </Box>
              <IconButton
                LinkComponent={Link}
                href={replaceUrlVariables(C_AGENTS_DETAIL_ROUTE, {
                  id: agent._id,
                })}
                size="small"
              >
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "#D32F2F" }}>
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
