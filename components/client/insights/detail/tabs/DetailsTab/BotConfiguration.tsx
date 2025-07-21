"use client";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Grid,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import useNotification from "@/hooks/shared/use-notification";

export default function BotConfiguration({
  agentId,
  name,
}: {
  agentId: string;
  name: string;
}) {
  const [copiedType, setCopiedType] = useState<"id" | "widget" | null>(null);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);
  const notification = useNotification();

  const handleCopy = async (text: string, type: "id" | "widget") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      notification.success(type === "id" ? "copied!" : "copied!");

      if (copyTimeout) clearTimeout(copyTimeout);
      const timeout = setTimeout(() => {
        setCopiedType(null);
      }, 2000);
      setCopyTimeout(timeout);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      notification.error("Failed to copy text");
    }
  };

  // const handleCloseSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

  const widgetCode = `<script src="${process.env.NEXT_PUBLIC_APP_ORIGIN}/analytics-widget.js?trackingId=${agentId}"></script>`;

  return (
    <Box
      sx={{
        bgcolor: "#1e1e3266",
        backdropFilter: "blur(20px)",
        border: "1px solid #7367f033",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        borderRadius: "16px",
        p: 3,
      }}
    >
      <Grid container spacing={4}>
        {/* Left Side - Bot Configuration */}
        <Grid item xs={12} md={12}>
          <Typography
            sx={{ fontSize: 20, fontWeight: 600, mb: 3, color: "#ffffff" }}
          >
            Bot Configuration
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                color: "#ffffff",
                opacity: 0.7,
                fontSize: "0.875rem",
                mb: 0.5,
              }}
            >
              Bot Name
            </Typography>
            <Typography sx={{ fontWeight: 500, color: "#ffffff" }}>
              {name}
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Integration Details */}
        <Grid item xs={12} md={12}>
          {/* API Key */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                color: "#ffffff",
                opacity: 0.7,
                fontSize: "0.875rem",
                mb: 1,
              }}
            >
              Chatbot ID
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#ffffff",
                  // bgcolor: "#070b15",
                  width: "70%",
                  p: 2,
                  borderRadius: "8px",
                  border: "1px solid #7367f033",
                }}
              >
                <Typography sx={{ opacity: 0.7 }}>{agentId}</Typography>
              </Box>
              <IconButton
                onClick={() => handleCopy(agentId, "id")}
                sx={{ borderRadius: "4px", color: "#7367f0" }}
              >
                {copiedType === "id" ? (
                  <DoneIcon sx={{ fontSize: "20px" }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </Box>
          </Box>

          {/* Widget Code */}
          <Box>
            <Typography
              sx={{
                color: "#ffffff",
                opacity: 0.7,
                fontSize: "0.875rem",
                mb: 1,
              }}
            >
              Widget Code
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "70%",
                  // bgcolor: "#070b15",
                  p: 2,

                  borderRadius: "8px",
                  border: "1px solid #7367f033",
                }}
              >
                <Typography
                  sx={{
                    color: "#ffffff",
                    opacity: 0.7,
                    fontSize: "0.875rem",
                    maxWidth: "calc(100% - 120px)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {widgetCode}{" "}
                </Typography>
              </Box>
              <IconButton
                sx={{ borderRadius: "4px", color: "#7367f0" }}
                onClick={() => handleCopy(widgetCode, "widget")}
              >
                {copiedType === "widget" ? (
                  <DoneIcon sx={{ fontSize: "20px" }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
