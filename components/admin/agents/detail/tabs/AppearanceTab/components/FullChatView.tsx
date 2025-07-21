"use client";

import TextField from "@mui/material/TextField";
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  CircularProgress,
  Paper,
} from "@mui/material";
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Mic as MicIcon,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import agentService from "@/services/api/user/agent-service";
import { formatAssistantMessage, renderConditionalImage } from "@/utils";
import { IBotSettingFormData } from "../../../AgentDetailPage";
import MsgInput from "@/components/shared/chat/MsgInput";

interface Message {
  userText?: string;
  botText?: string;
}

interface FullChatViewProps {
  agentId: string;
  botSettings: IBotSettingFormData;
  onStateChange?: (state: "full" | "mini" | "button") => void;
}

export default function FullChatView({
  agentId,
  botSettings,
  onStateChange,
}: FullChatViewProps) {
  const isDark = botSettings.theme === "dark";

  const chatBodyRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);

  const getGradient = (color: string) => {
    const darkerColor =
      color
        .replace("#", "")
        .match(/.{2}/g)
        ?.map(
          (c) =>
            "#" +
            Math.max(0, parseInt(c, 16) - 40)
              .toString(16)
              .padStart(2, "0")
        )
        .join("") || color;

    return `linear-gradient(45deg, ${color} 30%, ${darkerColor} 90%)`;
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBodyRef && chatBodyRef.current) {
        chatBodyRef.current.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const headerBgGradient = getGradient(botSettings.primaryColor);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { userText: text }]);
    setInputText("");
    setIsSendingMessage(true);

    const response = await agentService.chat({
      agentId: agentId,
      message: text,
      currentThreadId,
    });

    setIsSendingMessage(false);

    if (response.success && response.data?.content) {
      setMessages((prev) => [
        ...prev,
        { botText: formatAssistantMessage(response.data.content) },
      ]);
      setSeverity("success");
      if (response.data.threadId) {
        setCurrentThreadId(response.data.threadId);
      }
    } else {
      setMessage(response.message);
      setSeverity("error");
      setIsSnackbarOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  // Add global styling for WhatsApp-style typing animation and placeholder colors
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Placeholder styles */
      .MuiInputBase-input::placeholder,
      .MuiInputBase-input::-webkit-input-placeholder,
      .MuiInputBase-input:-ms-input-placeholder,
      .MuiInputBase-input::-ms-input-placeholder {
        color: rgba(255,255,255,0.8) !important;
        opacity: 1 !important;
        -webkit-text-fill-color: rgba(255,255,255,0.8) !important;
      }
      
      .Mui-disabled .MuiInputBase-input::placeholder,
      .Mui-disabled .MuiInputBase-input::-webkit-input-placeholder,
      .Mui-disabled .MuiInputBase-input:-ms-input-placeholder,
      .Mui-disabled .MuiInputBase-input::-ms-input-placeholder {
        color: rgba(255,255,255,0.8) !important;
        opacity: 1 !important;
        -webkit-text-fill-color: rgba(255,255,255,0.8) !important;
      }

      /* WhatsApp typing animation */
      @keyframes typingAnimation {
        0% { transform: translateY(0px); }
        28% { transform: translateY(-5px); }
        44% { transform: translateY(0px); }
        100% { transform: translateY(0px); }
      }
      
      .typing-dot:nth-child(1) {
        animation: typingAnimation 1.5s infinite ease-in-out;
        animation-delay: 200ms;
      }
      .typing-dot:nth-child(2) {
        animation: typingAnimation 1.5s infinite ease-in-out;
        animation-delay: 300ms;
      }
      .typing-dot:nth-child(3) {
        animation: typingAnimation 1.5s infinite ease-in-out;
        animation-delay: 400ms;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: "0", sm: "20px" },
        right: { xs: "0", sm: "20px" },
        width: {
          xs: "100%",
          sm: `${Math.min(botSettings.width, 420)}px`,
          md: `${Math.min(botSettings.width, 480)}px`,
          lg: `${botSettings.width}px`,
        },
        height: {
          xs: "100vh",
          sm: `${Math.min(botSettings.height, 600)}px`,
          md: `${Math.min(botSettings.height, 700)}px`,
          lg: `${botSettings.height}px`,
        },
        bgcolor: isDark ? "#0a0f1e" : "#ffffff",
        borderRadius: { xs: "0", sm: "16px" },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 15px 40px ${botSettings.primaryColor}33`,
        border: `1px solid ${botSettings.primaryColor}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: headerBgGradient,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${botSettings.primaryColor}33`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            src={renderConditionalImage(botSettings.image)}
            sx={{
              width: 40,
              height: 40,
              border: `2px solid ${botSettings.primaryColor}`,
            }}
          />
          <Box>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: `${botSettings.fontSize}px`,
                fontWeight: 600,
              }}
            >
              {botSettings.name}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: `${botSettings.fontSize - 2}px`,
              }}
            >
              {botSettings.subTitle}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => onStateChange?.("mini")}
            sx={{
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <MinimizeIcon sx={{ color: "#ffffff", fontSize: "20px" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onStateChange?.("button")}
            sx={{
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <CloseIcon sx={{ color: "#ffffff", fontSize: "20px" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Chat Body */}
      <Box
        ref={chatBodyRef}
        sx={{
          flex: 1,
          overflow: "auto",
          bgcolor: isDark ? "#0a0f1e" : "#ffffff",
          p: { xs: 2, sm: 3 },
          backgroundImage: isDark
            ? `radial-gradient(circle at center, ${botSettings.primaryColor}0a 0%, transparent 70%)`
            : `radial-gradient(circle at center, ${botSettings.primaryColor}14 0%, transparent 70%)`,
          backgroundSize: "200% 200%",
          backgroundPosition: "center",
        }}
      >
        {isLoadingMessages ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress sx={{ color: "#7367f0" }} />
          </Box>
        ) : messages.length === 0 ? (
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              src={renderConditionalImage(botSettings.image)}
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                mb: 2,
                border: `3px solid ${botSettings.primaryColor}`,
                boxShadow: `0 8px 20px ${botSettings.primaryColor}33`,
              }}
            />
            <Typography
              sx={{
                color: isDark ? "#ffffff" : "#111827",
                fontSize: `${Number(botSettings.fontSize) + 4}px`,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {botSettings.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                p: 3,
                background: isDark
                  ? `linear-gradient(145deg, rgba(20, 25, 40, 0.95), rgba(30, 35, 50, 0.95))`
                  : `linear-gradient(145deg, rgba(245, 250, 255, 0.95), rgba(235, 240, 255, 0.95))`,
                borderRadius: "16px",
                border: `1px solid ${botSettings.primaryColor}33`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 8px 32px ${botSettings.primaryColor}15`,
              }}
            >
              {botSettings.suggestions.map((suggestion, index) => (
                <Paper
                  key={index}
                  onClick={() => {
                    setInputText(suggestion);
                    sendMessage(suggestion);
                  }}
                  elevation={0}
                  sx={{
                    p: "10px 20px",
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.03)",
                    color: isDark ? "#fff" : "#111827",
                    borderRadius: "8px",
                    fontSize: `${botSettings.fontSize - 2}px`,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: `1px solid ${botSettings.primaryColor}33`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      background: headerBgGradient,
                      color: "#ffffff",
                      boxShadow: `0 8px 20px ${botSettings.primaryColor}40`,
                    },
                  }}
                >
                  {suggestion}
                </Paper>
              ))}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  justifyContent: message.userText ? "flex-end" : "flex-start",
                }}
              >
                {message.botText && (
                  <Avatar
                    src={renderConditionalImage(botSettings.image)}
                    sx={{
                      width: 36,
                      height: 36,
                      border: `2px solid ${botSettings.primaryColor}`,
                    }}
                  />
                )}
                <Box
                  sx={{
                    background: message.userText
                      ? isDark
                        ? headerBgGradient
                        : botSettings.primaryColor
                      : isDark
                      ? `linear-gradient(145deg, rgba(20, 25, 40, 0.95), rgba(30, 35, 50, 0.95))`
                      : `linear-gradient(145deg, rgba(245, 250, 255, 0.95), rgba(235, 240, 255, 0.95))`,
                    p: 2,
                    borderRadius: message.userText
                      ? "8px 8px 0 8px"
                      : "8px 8px 8px 0",
                    maxWidth: "75%",
                    boxShadow: `0 5px 15px ${botSettings.primaryColor}1a`,
                    border: message.userText
                      ? "none"
                      : `1px solid ${botSettings.primaryColor}33`,
                    backdropFilter: "blur(10px)",
                    position: "relative",
                    "&::before": message.userText
                      ? {}
                      : {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: "inherit",
                          background: `linear-gradient(135deg, ${botSettings.primaryColor}05, transparent)`,
                          pointerEvents: "none",
                        },
                  }}
                >
                  {message.userText && (
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontSize: botSettings.fontSize + "px",
                        lineHeight: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {message.userText}
                    </Typography>
                  )}
                  {message.botText && (
                    <Typography
                      sx={{
                        color: isDark ? "#FFFFFF" : "#111827",
                        fontSize: botSettings.fontSize + "px",
                        lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      }}
                      dangerouslySetInnerHTML={{ __html: message.botText }}
                    />
                  )}
                </Box>
                {message.userText && (
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: headerBgGradient,
                    }}
                  >
                    <PersonIcon sx={{ color: "#ffffff" }} />
                  </Avatar>
                )}
              </Box>
            ))}
            {isSendingMessage && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  maxWidth: "70%",
                  alignItems: "flex-start",
                }}
              >
                <Avatar
                  src={renderConditionalImage(botSettings.image)}
                  sx={{
                    width: 36,
                    height: 36,
                    border: `2px solid ${botSettings.primaryColor}`,
                  }}
                />
                <Box
                  sx={{
                    background: isDark
                      ? `linear-gradient(145deg, rgba(20, 25, 40, 0.95), rgba(30, 35, 50, 0.95))`
                      : `linear-gradient(145deg, rgba(245, 250, 255, 0.95), rgba(235, 240, 255, 0.95))`,
                    p: 2,
                    borderRadius: "8px 8px 8px 0",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    minHeight: "40px",
                    minWidth: "60px",
                    boxShadow: `0 5px 15px ${botSettings.primaryColor}1a`,
                    border: `1px solid ${botSettings.primaryColor}33`,
                  }}
                >
                  <Box
                    className="typing-dot"
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: isDark ? "#ffffff" : botSettings.primaryColor,
                      borderRadius: "50%",
                    }}
                  />
                  <Box
                    className="typing-dot"
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: isDark ? "#ffffff" : botSettings.primaryColor,
                      borderRadius: "50%",
                    }}
                  />
                  <Box
                    className="typing-dot"
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: isDark ? "#ffffff" : botSettings.primaryColor,
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Input Area */}
      {/* <Box
        sx={{
          p: 2,
          bgcolor: isDark ? "#0a0f1e" : "#ffffff",
          borderTop: `1px solid ${botSettings.primaryColor}33`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            borderRadius: "8px",
            p: "12px 20px",
            border: `1px solid ${botSettings.primaryColor}33`,
          }}
        >
          <InputBase
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            disabled={isSendingMessage}
            multiline
            maxRows={4}
            sx={{
              flex: 1,
              color: isDark ? "#ffffff !important" : "#111827 !important",
              fontSize: `${botSettings.fontSize}px`,
              "& textarea": {
                color: isDark ? "#ffffff !important" : "#111827 !important",
              },
              "& input": {
                color: isDark ? "#ffffff !important" : "#111827 !important",
              },
              "&.Mui-disabled": {
                color: isDark ? "#ffffff !important" : "#111827 !important",
                WebkitTextFillColor: isDark
                  ? "#ffffff !important"
                  : "#111827 !important",
                "& textarea": {
                  color: isDark ? "#ffffff !important" : "#111827 !important",
                  WebkitTextFillColor: isDark
                    ? "#ffffff !important"
                    : "#111827 !important",
                },
              },
            }}
          />
          <IconButton size="small">
            <MicIcon sx={{ color: "#9CA3AF", fontSize: "20px" }} />
          </IconButton>
          <IconButton
            onClick={() => sendMessage(inputText)}
            disabled={isSendingMessage || !inputText.trim()}
            size="small"
            sx={{
              background: headerBgGradient,
              boxShadow: `0 4px 12px ${botSettings.primaryColor}33`,
              transition: "all 0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
              "&:disabled": {
                background: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                boxShadow: "none",
              },
            }}
          >
            <SendIcon sx={{ color: "#ffffff", fontSize: "18px" }} />
          </IconButton>
        </Box>
      </Box> */}

      <MsgInput
        fontSize={botSettings.fontSize}
        isDark={isDark}
        isSendingMessage={isSendingMessage}
        primaryColor={botSettings.primaryColor}
        sendMessage={sendMessage}
      />

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={severity}
          sx={{
            width: "100%",
            background:
              severity === "success"
                ? headerBgGradient
                : "linear-gradient(45deg, #ff4444 30%, #ff0000 90%)",
            color: "#ffffff",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "8px",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
