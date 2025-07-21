"use client";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

/**
 * Helper function to format assistant messages.
 * - Converts `## Heading` into `<strong>Heading</strong>`.
 * - Replaces `\n\n` with proper line breaks.
 */
const formatAssistantMessage = (message: string) => {
  if (!message) return "";

  return message
    .replace(/##\s*(.+)/g, "<strong>$1</strong>") // Convert ## Headings to bold
    .replace(/\n{2,}/g, "<br /><br />") // Replace multiple newlines with break
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Convert **bold** to <b>
    .replace(/\*(.*?)\*/g, "<i>$1</i>"); // Convert *italic* to <i>
};

export default function ChatAssistant() {
  const [projectId, setProjectId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!projectId || !message) return alert("Enter Project ID and Message!");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/bots/chat`,
        {
          projectId,
          message,
        }
      );

      let assistantResponse = response.data.message;

      // ✅ Handle structured response arrays
      if (Array.isArray(assistantResponse)) {
        const firstMessage = assistantResponse[0];
        if (firstMessage?.type === "text" && firstMessage?.text?.value) {
          assistantResponse = firstMessage.text.value;
        } else {
          assistantResponse = JSON.stringify(assistantResponse);
        }
      }

      setMessages([
        ...messages,
        { role: "user", content: message },
        {
          role: "assistant",
          content: formatAssistantMessage(assistantResponse),
        },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "700px", mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        🤖 Chat with Assistant
      </Typography>

      {/* Input Fields */}
      <TextField
        fullWidth
        label="Project ID"
        variant="outlined"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        sx={{ mb: 2, bgcolor: "#f8f9fa" }}
      />
      <TextField
        fullWidth
        label="Type your message..."
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        rows={3}
        sx={{ mb: 2, bgcolor: "#f8f9fa" }}
      />

      {/* Send Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress sx={{ color: "#7367f0" }} size={24} />
        ) : (
          "Send"
        )}
      </Button>

      {/* Messages Display */}
      <Box sx={{ mt: 3, textAlign: "left" }}>
        {messages.map((msg, index) => (
          <Card
            key={index}
            sx={{
              my: 1,
              bgcolor: msg.role === "user" ? "#e3f2fd" : "#e8f5e9",
              borderRadius: "10px",
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {msg.role === "user" ? "You:" : "Assistant:"}
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{ __html: msg.content }}
                sx={{ whiteSpace: "pre-line" }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
