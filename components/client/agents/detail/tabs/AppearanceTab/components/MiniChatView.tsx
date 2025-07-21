"use client";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { IBotSettingFormData } from "../../../AgentDetailPage";
import { renderConditionalImage } from "@/utils";

interface MiniChatViewProps {
  botSettings: IBotSettingFormData;
  onStateChange?: (state: "full" | "mini" | "button") => void;
}

export default function MiniChatView({
  botSettings,
  onStateChange,
}: MiniChatViewProps) {
  const isDark = botSettings.theme === "dark";

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        bgcolor: isDark ? "#1F2937" : "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: botSettings.primaryColor,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            src={renderConditionalImage(botSettings.image)}
            sx={{ width: 28, height: 28 }}
          />
          <Box>
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {botSettings.name}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "12px",
              }}
            >
              {botSettings.subTitle}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton size="small" onClick={() => onStateChange?.("full")}>
            <OpenInFullIcon sx={{ color: "#FFFFFF", fontSize: "18px" }} />
          </IconButton>
          <IconButton size="small" onClick={() => onStateChange?.("button")}>
            <CloseIcon sx={{ color: "#FFFFFF", fontSize: "18px" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
