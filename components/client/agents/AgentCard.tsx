"use client";
import { useState } from "react";
import { Box, Typography, Switch, IconButton } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useRouter } from "next/navigation";

interface AgentCardProps {
  title: string;
  imageUrl?: string;
  initialActive?: boolean;
  role: string;
  id: string;
}

export default function AgentCard({
  title,
  role,
  imageUrl,
  initialActive = true,
  id,
}: AgentCardProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = () => {
    setIsLoading(true);
    router.push(`/client/agents/${id}`);
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add settings action here
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsActive(e.target.checked);
  };

  return (
    <Box
      className="box-style"
      onClick={handleCardClick}
      sx={{
        // bgcolor: "white",
        borderRadius: "20px",
        p: "20px",
        width: "100%",
        boxShadow: "0px 4px 35px 0px #0D0A2C0F",
        cursor: "pointer",
        transition: "all 0.2s ease",
        opacity: isLoading ? 0.7 : 1,
        pointerEvents: isLoading ? "none" : "auto",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0px 8px 40px 0px #0D0A2C1A",
        },
      }}
    >
      {/* Top Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          // color: "white",
        }}
      >
        <IconButton
          size="small"
          sx={{ padding: 0, color: "rgba(255, 255, 255, 0.8)" }}
        >
          <PersonOutlineIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            sx={{ padding: 0, color: "rgba(255, 255, 255, 0.8)" }}
            onClick={handleSettingsClick}
          >
            <AccessTimeIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{ padding: 0, color: "rgba(255, 255, 255, 0.8)" }}
          >
            <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Profile Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={imageUrl || "/images/dummy-img.webp"}
          alt={title}
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        align="center"
        sx={{
          fontWeight: 500,
          fontSize: "1.1rem",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Typography
        align="center"
        sx={{
          color: "#9CA3AF",
          fontSize: "0.9rem",
          mb: 2.5,
        }}
      >
        {role}
      </Typography>

      {/* Status Switch */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: isActive ? "#4285f4" : "#9CA3AF",
          }}
        >
          {isActive ? "On" : "Off"}
        </Typography>
        <Switch
          checked={isActive}
          onChange={handleSwitchChange}
          onClick={(e) => e.stopPropagation()}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#00e5ff",
              "&:hover": {
                backgroundColor: "rgba(66, 133, 244, 0.08)",
              },
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#00e5ff",
            },
          }}
        />
      </Box>
    </Box>
  );
}
