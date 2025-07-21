"use client";
import {
  Box,
  Typography,
  Button,
  Switch,
  Avatar,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import analyticsService, {
  MostUsedAgent,
} from "@/services/api/client/analytics-service";
import { format, parseISO } from "date-fns";

const MetricBox = ({
  value,
  label,
}: {
  value: string | number;
  label: string | number;
}) => (
  <Box
    sx={{
      bgcolor: "#070b15",
      p: 2,
      borderRadius: 2,
      textAlign: "center",
      border: "1px solid rgba(0, 229, 255, 0.2)",
    }}
  >
    <PersonIcon sx={{ color: "#00e5ff", mb: 1 }} />
    <Typography
      sx={{ fontWeight: 600, fontSize: "1.25rem", mb: 0.5, color: "#fff" }}
    >
      {value}
    </Typography>
    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
      {label}
    </Typography>
  </Box>
);

interface AgentCardProps {
  id: any;
  title: string;
  description: string;
  accuracy: number;
  messages: number;
  createdAt: string;
  isActive: boolean;
  photoUrl: string;
  users: number;
}

const AgentCard = ({
  _id,
  name,
  conversationCount,
  description,
  imageUrl,
  isActive,
  createdAt,
  messagesCount,
}: MostUsedAgent) => {
  const router = useRouter();
  const [isOn, setIsOn] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleCardClick = () => {
    setLocalLoading(true);
    router.push(`/admin/agents/${_id}`);
  };

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        bgcolor: "#0a0f1e",
        p: 3,
        borderRadius: "16px",
        cursor: "pointer",
        border: "1px solid #7367f033",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "#7267f05d",
          transform: "translateY(-5px)",
          boxShadow: "0 10px 30px rgba(187, 0, 255, 0.1)",
        },
        opacity: localLoading ? 0.7 : 1,
        pointerEvents: localLoading ? "none" : "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar sx={{ width: 48, height: 48 }} src={imageUrl} />
          {/* <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img height={"100%"} width={"100%"} src={imageUrl} alt="Agent" />
          </Box> */}
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography sx={{ fontWeight: 500, color: "#fff" }}>
                {name}
              </Typography>
              <OpenInNewIcon sx={{ fontSize: 18, color: "#ce9ffc" }} />
            </Box>
            <Typography
              sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
        {/* <SettingsIcon sx={{ color: "#00e5ff", cursor: "pointer" }} /> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}
        >
          Created {format(parseISO(createdAt), "dd/MM/yyyy hh:mm aa")}
        </Typography>

        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}
          >
            {isActive ? "On" : "Off"}
          </Typography>
          <Switch
            checked={isOn}
            onChange={(e) => {
              e.stopPropagation();
              setIsOn(e.target.checked);
            }}
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: "rgba(0, 229, 255, 0.2)",
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: isOn ? "#00e5ff" : "#fff",
              },
              "& .Mui-checked + .MuiSwitch-track": {
                backgroundColor: "rgba(0, 229, 255, 0.4) !important",
              },
            }}
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default function MostUsedAgents() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["most-used-agents", "client"],
    queryFn: () => analyticsService.getMostUsedAgents(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <CircularProgress size={24} sx={{ color: "#7367f0" }} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography className="text-white">
          Failed to load agents data
        </Typography>
      </Box>
    );
  }

  if (data.length <= 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography className="text-white">No agents found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "1.25rem", fontWeight: 500, color: "#fff", mb: 1 }}
          >
            Most used Trackers
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {data.map((agent: MostUsedAgent) => (
          <AgentCard {...agent} key={agent._id} />
        ))}
      </Box>
    </Box>
  );
}
