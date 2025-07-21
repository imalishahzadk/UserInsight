"use client";
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  Button,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { notFound, useParams, useSearchParams } from "next/navigation";
import widgetService from "@/services/api/widget-service";
import { formatAssistantMessage, hexToRGBA } from "@/utils";
import { DateTimeField } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/shared/ui/Spinner";
import DatePicker from "react-datepicker";
import { ISlot } from "@/services/api/client/meeting-service";
import useNotification from "@/hooks/shared/use-notification";
import TypingAnimation from "@/components/shared/chat/TypingAnimation";
import MsgInput from "@/components/shared/chat/MsgInput";

interface Message {
  role: "user" | "system";
  content: string;
}

interface TokensUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface ILeadFormGroup {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  interestQuery: string;
}

interface IMeetFormData {
  name: string;
  email: string;
  dateTime: Date | null;
}

interface ISettings {
  theme: "dark" | "light";
  name: string;
  subTitle: string;
  description: string;
  fontSize: string;
  primaryColor: string;
  width: string;
  imageUrl: string;
  height: string;
  suggestions: string[];
}

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

const MeetingSlots = ({
  agentId,
  selectedSlot,
  setSelectedSlot,
}: {
  agentId: string;
  selectedSlot: string | null;
  setSelectedSlot: (state: string) => void;
}) => {
  const [slots, setSlots] = useState<ISlot[]>([]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["available-slots"],
    queryFn: () => widgetService.getAvailableSlots(agentId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setSlots(data);
    }
  }, [data]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      {slots.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No available slots</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full">
          {slots.map((slot) => (
            <div
              key={slot._id}
              onClick={() => setSelectedSlot(slot._id)}
              className={`${
                selectedSlot === slot._id
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } p-4 border rounded text-left cursor-pointer w-full`}
            >
              <div className="font-medium">
                {new Date(slot.start).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="text-sm">
                {new Date(slot.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -
                {new Date(slot.end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const MeetingDialog = ({
  isMeetDialogOpen,
  setIsMeetDialogOpen,
  agentId,
}: {
  agentId: string;
  isMeetDialogOpen: boolean;
  setIsMeetDialogOpen: (state: boolean) => void;
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);

  const notification = useNotification();

  const [meetingFormData, setMeetingFormData] = useState({
    name: "",
    email: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingFormData({ ...meetingFormData, [e.target.name]: e.target.value });
  };

  const handleSchedule = () => {
    if (!selectedSlot) {
      notification.error("Please select the slot");
      return;
    }
    setIsInfoDialogOpen(true);
  };

  const handleConfirmMeeting = async () => {
    if (!selectedSlot) {
      notification.error("Please select the slot");
      return;
    }

    if (!meetingFormData.name || !meetingFormData.email) {
      notification.error("Please complete your details.");
      return;
    }

    const res = await widgetService.scheduleMeeting(
      selectedSlot,
      meetingFormData.name,
      meetingFormData.email
    );

    if (res.success) {
      notification.success(res.message);

      setIsInfoDialogOpen(false);
      setIsMeetDialogOpen(false);

      setMeetingFormData({
        name: "",
        email: "",
      });
      setSelectedSlot(null);
    } else {
      notification.error(res.message);
      setIsInfoDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={isMeetDialogOpen}
        onClose={() => setIsMeetDialogOpen(false)}
      >
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogContent>
          <MeetingSlots
            agentId={agentId}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => setIsMeetDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            onClick={handleSchedule}
            color="primary"
            disabled={!selectedSlot}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isInfoDialogOpen}
        onClose={() => setIsInfoDialogOpen(false)}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={meetingFormData.name}
            onChange={handleChangeInput}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={meetingFormData.email}
            onChange={handleChangeInput}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            onClick={handleConfirmMeeting}
            color="primary"
            disabled={!selectedSlot}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function ChatbotWindow() {
  const searchParams = useSearchParams();

  const chatbotId = searchParams.get("chatbotId");
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  // const userId = searchParams.get("chatbotUserId");

  if (!chatbotId) {
    return notFound();
  }

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [botOwner, setBotOwner] = useState<{
    _id: string;
    role: "user" | "client";
  }>({
    _id: "",
    role: "client",
  }); // owner of chatbot

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isMeetDialogOpen, setIsMeetDialogOpen] = useState(false);

  const [leadFormData, setLeadFormData] = useState<ILeadFormGroup>({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    interestQuery: "",
  });

  const getAppearanceSettings = async () => {
    setIsLoadingMessages(true);
    const response = await widgetService.getBotById(chatbotId);
    setIsLoadingMessages(false);
    if (response.success && response.data) {
      const chatBotSettings = { ...response.data };
      setSettings(chatBotSettings);
      setBotOwner(chatBotSettings?.botOwner);
      setSuggestions(response.data?.suggestions ?? []);
    } else {
      setMessage(response.message);
      setSeverity("error");
      setIsSnackbarOpen(true);
    }
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

  const handleNewConversation = async (
    inputText: string,
    threadId: string,
    systemResponse: string,
    tokensUsage: TokensUsage
  ) => {
    if (!inputText) return;

    const newTitle =
      inputText.length > 20 ? `${inputText.slice(0, 20)}...` : inputText;

    widgetService
      .createConversation(chatbotId, threadId, newTitle)
      .then((res) => {
        if (res.success) {
          const conversationId = res.data.conversationId;

          if (conversationId) {
            widgetService.createMessage(
              conversationId,
              "user",
              inputText,
              tokensUsage.promptTokens,
              botOwner
            );
            widgetService.createMessage(
              conversationId,
              "system",
              systemResponse,
              tokensUsage.completionTokens,
              botOwner
            );

            setCurrentConversationId(conversationId);
          }
        }
      });
  };

  const handleMessages = async (
    currentConversationId: string,
    userInput: string,
    systemResponse: string,
    tokensUsage: TokensUsage
  ) => {
    if (userInput && systemResponse) {
      widgetService.createMessage(
        currentConversationId,
        "user",
        userInput,
        tokensUsage.promptTokens,
        botOwner
      );
      widgetService.createMessage(
        currentConversationId,
        "system",
        systemResponse,
        tokensUsage.completionTokens,
        botOwner
      );
    }
  };

  const sendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: inputText }]);

    setInputText("");
    setIsSendingMessage(true);

    const response = await widgetService.chat({
      agentId: chatbotId,
      message: inputText,
      currentThreadId,
    });

    setIsSendingMessage(false);
    if (response.success) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: formatAssistantMessage(response.data.content),
        },
      ]);

      const threadId = response.data?.threadId;

      if (currentConversationId) {
        handleMessages(
          currentConversationId,
          inputText,
          response.data.content,
          response.data.tokensUsage
        );
      }

      if (threadId) {
        if (!currentThreadId && !currentConversationId && threadId) {
          handleNewConversation(
            inputText,
            threadId,
            response.data.content,
            response.data.tokensUsage
          );
        }

        setCurrentThreadId(response.data.threadId);
      }
    } else {
      setMessage(response.message);
      setSeverity("error");
      setIsSnackbarOpen(true);
    }
  };

  const handleCollectLead = async () => {
    const payload = { ...leadFormData, agentId: chatbotId };

    const response = await widgetService.collectLead(payload);

    if (response.success) {
      setMessage("You'll be connected soon.");
      setSeverity("success");
      setIsSnackbarOpen(true);
      setIsContactDialogOpen(false);
    } else {
      setMessage("Failed to submit your details. Please try again.");
      setSeverity("error");
      setIsSnackbarOpen(true);
    }
  };

  useEffect(() => {
    getAppearanceSettings();
  }, [chatbotId]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isSendingMessage) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const handleChangeLeadFInput = (e: any) => {
    setLeadFormData({ ...leadFormData, [e.target.name]: e.target.value });
  };

  if (!settings) {
    return <></>;
  }

  const headerBgGradient = getGradient(settings.primaryColor);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
        height: `100dvh`,
        bgcolor: settings.theme === "dark" ? "#1F2937" : "#FFFFFF",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "'transparent",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
          borderRadius: "10px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: settings.primaryColor,
        }}
      >
        <Avatar
          src={settings.imageUrl || undefined}
          sx={{ width: 32, height: 32 }}
        />
        <Box>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            {settings.name}
          </Typography>
          {/* <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "13px",
            }}
          >
            {settings.subTitle}
          </Typography> */}
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FFFFFF",
            color: settings.primaryColor,
            textTransform: "capitalize",
            "&:hover": { bgcolor: "#FFFFFF", opacity: 0.9 },
          }}
          onClick={() => setIsMeetDialogOpen(true)}
        >
          Schedule a Meeting
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FFFFFF",
            color: settings.primaryColor,
            textTransform: "capitalize",
            "&:hover": { bgcolor: "#FFFFFF", opacity: 0.9 },
          }}
          onClick={() => setIsContactDialogOpen(true)}
        >
          Contact Us
        </Button>
      </Box>

      {/* Chat Body */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          bgcolor: settings.theme === "dark" ? "#111827" : "#F9FAFB",
          p: 3,
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
            borderRadius: "10px",
          },
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
              src={settings.imageUrl || undefined}
              sx={{
                width: 70,
                height: 70,
                margin: "0 auto",
                mb: 1.5,
                bgcolor: settings.primaryColor,
              }}
            />
            <Typography
              sx={{
                color: settings.theme === "dark" ? "#FFFFFF" : "#111827",
                fontSize: "16px",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              {settings.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                p: 3,
                background:
                  settings.theme === "dark"
                    ? `linear-gradient(145deg, rgba(20, 25, 40, 0.95), rgba(30, 35, 50, 0.95))`
                    : `linear-gradient(145deg, rgba(245, 250, 255, 0.95), rgba(235, 240, 255, 0.95))`,
                borderRadius: "16px",
                border: `1px solid ${settings.primaryColor}33`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 8px 32px ${settings.primaryColor}15`,
              }}
            >
              {suggestions.map((suggestion, index) => (
                <Paper
                  key={index}
                  onClick={() => {
                    setInputText(suggestion);
                    sendMessage(suggestion);
                  }}
                  elevation={0}
                  sx={{
                    p: "10px 20px",
                    background:
                      settings.theme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.03)",
                    color: settings.theme === "dark" ? "#fff" : "#111827",
                    borderRadius: "8px",
                    fontSize: `${Number(settings.fontSize) - 2}px`,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: `1px solid ${settings.primaryColor}33`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      background: headerBgGradient,
                      color: "#ffffff",
                      boxShadow: `0 8px 20px ${settings.primaryColor}40`,
                    },
                  }}
                >
                  {suggestion}
                </Paper>
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            ref={chatBodyRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
              overflowY: "auto",
              height: "100%",
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
                borderRadius: "10px",
              },
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message.role === "system" && (
                  <Avatar
                    src={settings.imageUrl || undefined}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: settings.primaryColor,
                    }}
                  />
                )}
                <Box
                  sx={{
                    bgcolor:
                      message.role === "user"
                        ? settings.primaryColor
                        : settings.theme === "dark"
                        ? "#1F2937"
                        : "#FFFFFF",
                    p: 2,
                    borderRadius:
                      message.role === "user"
                        ? "12px 12px 0 12px"
                        : "12px 12px 12px 0",
                    maxWidth: "75%",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {message.role === "user" ? (
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontSize: settings.fontSize + "px",
                      }}
                    >
                      {message.content}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color:
                          settings.theme === "dark" ? "#FFFFFF" : "#111827",
                        fontSize: settings.fontSize + "px",
                        whiteSpace: "pre-line",
                      }}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    ></Typography>
                  )}
                </Box>
                {message.role === "user" && (
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "#E5E7EB" }}>
                    <PersonIcon sx={{ color: "#9CA3AF" }} />
                  </Avatar>
                )}
              </Box>
            ))}

            {isSendingMessage && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Avatar
                  src={settings.imageUrl || undefined}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: settings.primaryColor,
                  }}
                />

                <Box
                  sx={{
                    bgcolor: settings.theme === "dark" ? "#1F2937" : "#FFFFFF",
                    p: 2,
                    borderRadius: "12px 12px 12px 0",
                    maxWidth: "75%",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <TypingAnimation isDark={settings.theme === "dark"} />
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
          bgcolor: settings.theme === "dark" ? "#1F2937" : "#FFFFFF",
          borderTop: 1,
          width: "100%",
          borderColor:
            settings.theme === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: settings.theme === "dark" ? "#111827" : "#F3F4F6",
            borderRadius: "100px",
            p: "8px 16px",
          }}
        >
          <InputBase
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            sx={{
              flex: 1,
              color: settings.theme === "dark" ? "#FFFFFF" : "#111827",
              fontSize: settings.fontSize + "px",
              "& input::placeholder": {
                color: settings.theme === "dark" ? "#9CA3AF" : "#6B7280",
                opacity: 1,
              },
            }}
          />
          <IconButton
            onClick={() => {
              sendMessage(inputText);
            }}
            disabled={isSendingMessage || !inputText.trim()}
            size="small"
            sx={{
              bgcolor: settings.primaryColor,
              "&:disabled": {
                bgcolor:
                  settings.theme === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
              },
              "&:hover": { bgcolor: settings.primaryColor, opacity: 0.9 },
            }}
          >
            <SendIcon sx={{ color: "#FFFFFF", fontSize: "18px" }} />
          </IconButton>
        </Box>
      </Box> */}

      <MsgInput
        fontSize={Number(settings.fontSize)}
        isDark={settings.theme === "dark"}
        isSendingMessage={isSendingMessage}
        primaryColor={settings.primaryColor}
        sendMessage={sendMessage}
      />

      {/* Meeting Dialog */}
      <MeetingDialog
        agentId={chatbotId}
        isMeetDialogOpen={isMeetDialogOpen}
        setIsMeetDialogOpen={setIsMeetDialogOpen}
      />
      {/* <Dialog
        open={isMeetDialogOpen}
        onClose={() => setIsMeetDialogOpen(false)}
      >
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={meetingFormData.name}
            onChange={handleChangeMeetFInput}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={meetingFormData.email}
            onChange={handleChangeMeetFInput}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => setIsMeetDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            onClick={handleScheduleMeet}
            color="primary"
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* Contact Us Dialog */}
      <Dialog
        open={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
      >
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={leadFormData.name}
            onChange={handleChangeLeadFInput}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={leadFormData.email}
            onChange={handleChangeLeadFInput}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            name="address"
            fullWidth
            value={leadFormData.address}
            onChange={handleChangeLeadFInput}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            fullWidth
            value={leadFormData.phoneNumber}
            onChange={handleChangeLeadFInput}
          />
          <TextField
            margin="dense"
            label="Interest Query"
            type="text"
            name="interestQuery"
            fullWidth
            value={leadFormData.interestQuery}
            onChange={handleChangeLeadFInput}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => setIsContactDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            onClick={handleCollectLead}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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
            fontFamily: "Velyra",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
