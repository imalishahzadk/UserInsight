"use client";
import React from "react";
import { Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TuneIcon from "@mui/icons-material/Tune";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import MessageIcon from "@mui/icons-material/Message";
import PeopleIcon from "@mui/icons-material/People";
import { useQuery } from "@tanstack/react-query";
import clientService from "@/services/api/user/client-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { format, parseISO } from "date-fns";

interface AgentStats {
  users: string;
  messages: string;
  accuracy: string;
}

interface Agent {
  id: number;
  name: string;
  description: string;
  avatarUrl?: string;
  stats: AgentStats;
  createdDate: string;
  status: string;
}

interface MostUsedAgentsProps {
  clientId: string;
}

const defaultAgentImage = "/images/profile-placeholder.png";

const StatBox = ({ icon: Icon, label, value }: any) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Icon sx={{ color: "#00e5ff", fontSize: 20 }} />
    <Box>
      <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ color: "#fff", fontWeight: 600 }}>{value}</Typography>
    </Box>
  </Box>
);

export default function MostUsedAgents({ clientId }: MostUsedAgentsProps) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["clients-agents", clientId],
    queryFn: () => clientService.getClientAgents(clientId),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return (
      <p className="font-semibold text-xl text-white">No Agents to show.</p>
    );
  }

  if (data?.length <= 0) {
    return (
      <p className="font-semibold text-xl text-white">No Agents to show.</p>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          bgcolor: "rgba(30, 30, 50, 0.4)",
          borderRadius: "16px",
          border: "1px solid rgba(115, 103, 240, 0.2)",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 15px 40px, rgba(115, 103, 240, 0.2) 0px 0px 20px",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: 20, fontWeight: 600, color: "#fff", mb: 1 }}
          >
            Agents
          </Typography>
          <Typography sx={{ color: "#fff", opacity: 0.7 }}>
            Manage and monitor client's AI agents
          </Typography>
        </Box>
      </Box>

      {/* Agent Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {data.map((agent) => (
          <Box
            key={agent._id}
            sx={{
              bgcolor: "#0a0f1e",
              borderRadius: "16px",
              p: 3,
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
              },
            }}
          >
            {/* Agent Info */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar src={agent.imageUrl} />
                <Box>
                  <Typography sx={{ color: "#fff", fontWeight: 600, mb: 0.5 }}>
                    {agent.name}
                  </Typography>
                  <Typography
                    sx={{ color: "#fff", opacity: 0.7, fontSize: 14 }}
                  >
                    {agent.description}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: "#00e5ff",
                    "&:hover": {
                      bgcolor: "rgba(0, 229, 255, 0.1)",
                    },
                  }}
                >
                  <OpenInNewIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "#00e5ff",
                    "&:hover": {
                      bgcolor: "rgba(0, 229, 255, 0.1)",
                    },
                  }}
                >
                  <TuneIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </Box>

            {/* Stats */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                py: 3,
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <StatBox icon={PeopleIcon} label="Users" value={0} />
              <StatBox
                icon={HourglassEmptyIcon}
                label="Conversations"
                value={agent.conversationCount}
              />
              <StatBox
                icon={MessageIcon}
                label="Messages"
                value={agent.messagesCount}
              />
            </Box>

            {/* Created Date and Status */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Box>
                <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 14 }}>
                  Created {format(parseISO(agent.createdAt), "dd/MM/yyyy")}
                </Typography>
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#00e5ff",
                    bgcolor: "rgba(0, 229, 255, 0.1)",
                    px: 2,
                    py: 0.5,
                    borderRadius: "8px",
                    fontSize: 14,
                    mt: 1,
                  }}
                >
                  {!!agent.isActive ? "Active" : "Disabled"}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
