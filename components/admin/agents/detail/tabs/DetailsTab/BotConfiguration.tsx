"use client";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AppConfig } from "@/core/config";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

export default function BotConfiguration({
  agentId,
  name,
  welcomeMessage,
}: {
  agentId: string;
  name: string;
  welcomeMessage: string;
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<"id" | "widget" | null>(null);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCopy = async (text: string, type: "id" | "widget") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setSnackbarOpen(true);

      if (copyTimeout) clearTimeout(copyTimeout);
      const timeout = setTimeout(() => {
        setCopiedType(null);
      }, 2000);
      setCopyTimeout(timeout);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#0a0f1e",
        borderRadius: "16px",
        p: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        border: "1px solid rgba(0, 229, 255, 0.1)",
      }}
    >
      {/* Left Side - Bot Configuration */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 600, mb: 3, color: "#fff" }}
        >
          Bot Configuration
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: "0.875rem", mb: 0.5 }}
          >
            Bot Name
          </Typography>
          <Typography sx={{ fontWeight: 500, color: "#fff" }}>
            {name}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: "0.875rem", mb: 0.5 }}
          >
            Training Status
          </Typography>
          <Typography sx={{ fontWeight: 500, color: "#fff" }}>
            Trained (Last updated: Today)
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: "0.875rem", mb: 0.5 }}
          >
            Welcome Message
          </Typography>
          <Typography sx={{ fontWeight: 500, color: "#fff" }}>
            {welcomeMessage}
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Integration Details */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 600, mb: 3, color: "#fff" }}
        >
          Integration Details
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            opacity: 0.7,
            fontSize: "0.875rem",
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          To integrate this agent into your website or application, use either
          the API key for backend integration or the widget code for frontend
          implementation. Make sure to keep your API key secure and never expose
          it in client-side code.
        </Typography>

        {/* API Key */}
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: "0.875rem", mb: 1 }}
          >
            Chatbot ID
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#070b15",
              p: 2,
              borderRadius: "8px",
              border: "1px solid rgba(0, 229, 255, 0.1)",
            }}
          >
            <Typography sx={{ color: "#fff", opacity: 0.7 }}>
              {agentId}
            </Typography>
            <Button
              variant="contained"
              startIcon={
                copiedType === "id" ? <DoneIcon /> : <ContentCopyIcon />
              }
              size="small"
              onClick={() => handleCopy(agentId, "id")}
              sx={{
                bgcolor:
                  copiedType === "id" ? "rgba(0, 229, 255, 0.2)" : "#00e5ff",
                color: copiedType === "id" ? "#00e5ff" : "#0a0f1e",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor:
                    copiedType === "id"
                      ? "rgba(0, 229, 255, 0.3)"
                      : "rgba(0, 229, 255, 0.8)",
                },
              }}
            >
              {copiedType === "id" ? "Copied!" : "Copy Link"}
            </Button>
          </Box>
        </Box>

        {/* Widget Code */}
        <Box>
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: "0.875rem", mb: 1 }}
          >
            Widget Code
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#070b15",
              p: 2,
              borderRadius: "8px",
              border: "1px solid rgba(0, 229, 255, 0.1)",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                opacity: 0.7,
                fontSize: "0.875rem",
                maxWidth: "calc(100% - 120px)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {`<script src="${AppConfig.AppOrigin}/chatbot-widget.js?chatbotId=${agentId}"></script>`}{" "}
            </Typography>
            <Button
              variant="contained"
              startIcon={
                copiedType === "widget" ? <DoneIcon /> : <ContentCopyIcon />
              }
              size="small"
              onClick={() =>
                handleCopy(
                  `<script src="${AppConfig.AppOrigin}/chatbot-widget.js?chatbotId=${agentId}"></script>`,
                  "widget"
                )
              }
              sx={{
                bgcolor:
                  copiedType === "widget"
                    ? "rgba(0, 229, 255, 0.2)"
                    : "#00e5ff",
                color: copiedType === "widget" ? "#00e5ff" : "#0a0f1e",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor:
                    copiedType === "widget"
                      ? "rgba(0, 229, 255, 0.3)"
                      : "rgba(0, 229, 255, 0.8)",
                },
              }}
            >
              {copiedType === "widget" ? "Copied!" : "Copy Link"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            bgcolor: "rgba(0, 229, 255, 0.2)",
            color: "#00e5ff",
            "& .MuiAlert-icon": {
              color: "#00e5ff",
            },
          }}
        >
          {copiedType === "id" ? "Chatbot ID copied!" : "Widget code copied!"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
