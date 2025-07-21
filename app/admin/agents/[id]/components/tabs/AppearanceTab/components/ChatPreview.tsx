"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import FullChatView from "./FullChatView";
import MiniChatView from "./MiniChatView";
import ButtonView from "./ButtonView";

interface ChatPreviewProps {
  settings: {
    theme: string;
    title: string;
    description: string;
    userLabel: string;
    fontSize: string;
    primaryColor: string;
    width: string;
    height: string;
    imageUrl: string;
  };
  image?: string | null;
  conversationId: string;
  projectId: string;
  suggestions: string[];
}

export default function ChatPreview({
  settings,
  image,
  conversationId,
  projectId,
  suggestions
}: ChatPreviewProps) {
  const [chatState, setChatState] = useState<"full" | "mini" | "button">("full");

  return (
    <Box
      sx={{
        bgcolor: settings.theme === "dark" ? "#0a0f1e" : "#F9FAFB",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0, 229, 255, 0.2)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: settings.theme === "dark" ? "#fff" : "#111827",
            fontWeight: 600,
          }}
        >
          Preview
        </Typography>
        <Typography
          sx={{
            color: settings.theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            fontSize: "14px",
            mt: 1,
          }}
        >
          This is how your chat widget will appear to users.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {chatState === "full" && (
          <FullChatView
            settings={{
              ...settings,
              subtitle: settings.description,
              suggestions
            }}
            image={image}
            onStateChange={setChatState}
            conversationId={conversationId}
            projectId={projectId}
            suggestions={suggestions}
          />
        )}

        {chatState === "mini" && (
          <MiniChatView
            settings={{
              ...settings,
              subtitle: settings.description,
              agentName: settings.title
            }}
            onStateChange={setChatState}
            conversationId={conversationId}
            projectId={projectId}
          />
        )}

        {chatState === "button" && (
          <ButtonView
            settings={settings}
            image={image}
            onStateChange={setChatState}
            conversationId={conversationId}
            projectId={projectId}
          />
        )}
      </Box>
    </Box>
  );
}
