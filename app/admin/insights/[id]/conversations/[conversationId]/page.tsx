"use client";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Button, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/client/agent-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { formatAssistantMessage } from "@/utils";

interface IMessage {
  _id: string;
  role: "user" | "system";
  content: string;
}

const getConversations = async (conversationId: string) => {
  const res = await agentService.getMessagesByConversationId(conversationId);

  if (res.success && res.data) {
    return res.data;
  } else {
    throw Error(res.message);
  }
};

export default function ConversationDetailPage() {
  const router = useRouter();

  const { conversationId } = useParams<{ conversationId: string }>();

  const { data, isFetching, error } = useQuery({
    queryKey: ["conversations", conversationId],
    queryFn: () => getConversations(conversationId),
    refetchOnWindowFocus: false,
  });

  const handleBack = () => {
    router.back();
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isFetching) {
    return <PageSpinner />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Box
      sx={{
        bgcolor: "#090f1d",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "#090f1d",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              color: "white",
              bgcolor: "#00e5ff",
              borderRadius: "100px",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#00e5ff",
              },
            }}
          >
            Back
          </Button>
        </Box>
      </Box>

      {/* Chat Header */}
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Avatar
            src={data.agent.imageUrl}
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: 2,
            }}
          >
            AI
          </Avatar>
          <Typography variant="h5" fontWeight={500} sx={{ mb: 0.5 }}>
            {data.agent.name}
          </Typography>
        </Box>

        {/* Chat Messages */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {data.messages.map((message: IMessage) =>
            message.role === "system" ? (
              <Box
                key={message._id}
                sx={{ display: "flex", gap: 2, maxWidth: "80%" }}
              >
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  src={data.agent.imageUrl}
                >
                  AI
                </Avatar>
                <Box>
                  <Box
                    sx={{
                      bgcolor: "#202938",
                      p: 2,
                      borderRadius: "12px",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{ color: "white" }}
                      dangerouslySetInnerHTML={{
                        __html: formatAssistantMessage(message.content),
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Button
                      startIcon={<ContentCopyIcon fontSize="small" />}
                      onClick={() => copyText(message.content)}
                      sx={{
                        color: "#6B7280",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "transparent",
                          color: "#1A83FF",
                        },
                      }}
                    >
                      Text copy
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                key={message._id}
                sx={{
                  alignSelf: "flex-end",
                  maxWidth: "80%",
                  display: "flex",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#00e5ff",
                    color: "white",
                    p: 2,
                    borderRadius: "12px",
                  }}
                >
                  <Typography className="!text-white">
                    {message.content}
                  </Typography>
                </Box>
                <Avatar src={undefined} sx={{ width: 40, height: 40 }}></Avatar>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}
