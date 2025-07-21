"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import DataTable, { Column } from "@/components/shared/table/DataTable";
import ChatModal from "./modals/ChatModal";
import axios from "axios";
import agentService from "@/services/api/user/agent-service";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface IMessage {
  conversationId: string;
  role: "user" | "system";
  content: string;
}

interface ConversationData {
  _id: string;
  createdAt: string;
  agentId: string;
  title: string;
  threadId: string;
  messages: IMessage[];
}

const columns: Column[] = [
  {
    id: "createdAt",
    label: "Date",
    minWidth: 180,
    format: (value: string, row: any) => (
      <p className="!text-white">
        {format(parseISO(value), "dd/MM/yyyy hh:mm aa")}
      </p>
    ),
  },
  {
    id: "title",
    label: "Title",
    minWidth: 120,
  },
  {
    id: "messages",
    label: "Total messages",
    minWidth: 120,
    format: (value: string, row: any) => (
      <p className="!text-white">{value?.length ?? 0}</p>
    ),
  },
  {
    id: "_id",
    label: "",
    minWidth: 120,
    format: (value: string, row: any) => (
      <Link
        href={`/admin/agents/${row.agentId}/conversations/${value}`}
        className="!text-white"
      >
        View Conversations
      </Link>
    ),
  },
];

export default function ConversationTab({ agentId }: { agentId: string }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    last30Days: 0,
    growthRate: "0",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error" | "info";
  }>({ message: "", severity: "info" });
  const [selectedChat, setSelectedChat] = useState<ConversationData | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const fetchConversations = async () => {
    setLoading(true);

    const response = await agentService.getConversations(agentId);
    setLoading(false);

    if (response.success) {
      setConversations(response.data);
    }
    // setStats({
    //   total: response.data.statistics.totalConversations,
    //   last30Days: response.data.statistics.last30DaysCount,
    //   growthRate: response.data.statistics.growthRate,
    // });

    // setSnackbar({
    //   message: "Conversations loaded successfully",
    //   severity: "success",
    // });
  };
  const handleQuickView = (chat: ConversationData) => {
    setSelectedChat(chat);
    setModalOpen(true);
  };

  const handleView = (chatId: number) => {
    router.push(`/admin/conversations/${chatId}`);
  };

  // const handleActionClick = (action: string, row: ConversationData) => {
  //   if (action === "Quick View") {
  //     handleQuickView(row);
  //   } else if (action === "View") {
  //     handleView(row.id);
  //   }
  // };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#070b15",
        }}
      >
        <CircularProgress thickness={5} size={50} sx={{ color: "#7367f0" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#070b15", minHeight: "100vh" }}>
      {/* Stats Cards */}
      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        {/* Total Conversations */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#0a0f1e",
            p: 3,
            borderRadius: "16px",
            border: "1px solid rgba(0, 229, 255, 0.1)",
          }}
        >
          <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 14 }}>
            Total Conversations
          </Typography>
          <Typography
            sx={{
              color: "#00e5ff",
              fontSize: 32,
              fontWeight: 600,
              my: 1,
            }}
          >
            {stats.total}
          </Typography>
          <Typography
            sx={{
              color: "#22C55E",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            +{stats.growthRate}%
            <TrendingUpIcon sx={{ fontSize: 16 }} />
          </Typography>
        </Box>

        {/* Last 30 Days */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#0a0f1e",
            p: 3,
            borderRadius: "16px",
            border: "1px solid rgba(0, 229, 255, 0.1)",
          }}
        >
          <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 14 }}>
            Last 30 Days
          </Typography>
          <Typography
            sx={{
              color: "#00e5ff",
              fontSize: 32,
              fontWeight: 600,
              my: 1,
            }}
          >
            {stats.last30Days}
          </Typography>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
          <TextField
            placeholder="Search conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#0a0f1e",
                color: "#fff",
                height: "45px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
                "& fieldset": {
                  border: "none",
                },
              },
              "& input::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00e5ff" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="05 Jan, 2025"
            sx={{
              width: "200px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "#0a0f1e",
                color: "#fff",
                height: "45px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
                "& fieldset": {
                  border: "none",
                },
              },
              "& input::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon sx={{ color: "#00e5ff" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#00e5ff",
            color: "#0a0f1e",
            borderRadius: "8px",
            textTransform: "none",
            height: "45px",
            px: 3,
            fontWeight: 600,
            "&:hover": {
              bgcolor: "rgba(0, 229, 255, 0.8)",
            },
          }}
        >
          Export Chat
        </Button>
      </Box>

      {/* Table */}
      <Box
        sx={{
          bgcolor: "#0a0f1e",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(0, 229, 255, 0.1)",
          "& .MuiTableCell-root": {
            color: "#fff",
            opacity: 0.7,
            borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
          },
          "& .MuiTableCell-head": {
            backgroundColor: "#070b15",
            fontWeight: 600,
            opacity: 1,
          },
          "& .MuiTableRow-root:hover": {
            backgroundColor: "rgba(0, 229, 255, 0.05)",
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiTablePagination-actions button": {
            color: "#00e5ff",
            "&:disabled": {
              color: "rgba(0, 229, 255, 0.3)",
            },
          },
          "& .MuiSelect-icon": {
            color: "#00e5ff",
          },
        }}
      >
        <DataTable columns={columns} rows={conversations} />
      </Box>

      {/* Chat Modal */}
      {selectedChat && (
        <ChatModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          chatData={selectedChat}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            background:
              snackbar.severity === "success"
                ? `linear-gradient(45deg, #00e5ff 30%, #00B8D4 90%)`
                : "linear-gradient(45deg, #ff4444 30%, #ff0000 90%)",
            color: "#ffffff",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "8px",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
