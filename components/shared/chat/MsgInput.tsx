import "./chat.css";
import { Box, IconButton, InputBase } from "@mui/material";
import React, { useState } from "react";
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Mic as MicIcon,
} from "@mui/icons-material";
import AudioRecorder from "./AudioRecorder";
import toast from "react-hot-toast";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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

const MsgInput = ({
  isDark = false,
  primaryColor = "",
  isSendingMessage = false,
  fontSize = 16,
  sendMessage = (text: string) => {},
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [inputText, setInputText] = useState("");

  const headerBgGradient = getGradient(primaryColor);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const startListening = () => {
    console.log("isMicrophoneAvailable", isMicrophoneAvailable);
    console.log(
      "browserSupportsSpeechRecognition",
      browserSupportsSpeechRecognition
    );

    if (!browserSupportsSpeechRecognition) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }

    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    setInputText((prev) => prev + transcript);
  };

  const cancelRecording = () => {
    SpeechRecognition.abortListening();
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: isDark ? "#0a0f1e" : "#ffffff",
        borderTop: `1px solid ${primaryColor}33`,
      }}
    >
      {!listening ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            borderRadius: "8px",
            p: "12px 20px",
            border: `1px solid ${primaryColor}33`,
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
              fontSize: `${fontSize}px`,
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
          <IconButton
            size="small"
            sx={{
              background: headerBgGradient,
              boxShadow: `0 4px 12px ${primaryColor}33`,
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
            onClick={startListening}
          >
            <MicIcon
              sx={{ color: isDark ? "#ffffff" : "#000000", fontSize: "20px" }}
            />
          </IconButton>
          <IconButton
            onClick={() => sendMessage(inputText)}
            disabled={isSendingMessage || !inputText.trim()}
            size="small"
            sx={{
              background: headerBgGradient,
              boxShadow: `0 4px 12px ${primaryColor}33`,
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
            <SendIcon
              sx={{ color: isDark ? "#ffffff" : "#000000", fontSize: "18px" }}
            />
          </IconButton>
        </Box>
      ) : (
        <AudioRecorder
          cancelRecording={cancelRecording}
          isSending={false}
          stopListening={stopListening}
          primaryColor={primaryColor}
          isDark={isDark}
        />
      )}
    </Box>
  );
};

export default MsgInput;
