"use client";

import { useEffect, useState } from "react";
import AddKnowledge from "./add-knowledge";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import agentService from "@/services/api/user/agent-service";
import inventoryService from "@/services/api/user/inventory-service";

interface IInventoryFeed {
  _id: string;
  inventoryUrl: string;
}

const InventoryContent = ({ inventoryId }: { inventoryId: string }) => {
  const [inventoryDetails, setInventoryDetails] =
    useState<IInventoryFeed | null>(null);

  useEffect(() => {
    if (inventoryId) {
      inventoryService.getInventoryFeedById(inventoryId).then((data) => {
        if (data) {
          setInventoryDetails(data);
        }
      });
    }
  }, [inventoryId]);

  return (
    <Typography color="#fff">{inventoryDetails?.inventoryUrl ?? ""}</Typography>
  );
};

interface IQNA {
  question: string;
  answer: string;
}

const QNAContent = ({ content }: { content: IQNA }) => {
  return (
    <div>
      <Typography sx={{ fontWeight: "bold", color: "#fff", mb: 1 }}>
        {content.question}
      </Typography>
      <Typography sx={{ color: "#fff" }}>{content.answer}</Typography>
    </div>
  );
};

const renderContent = (
  content: string | IQNA,
  contentType: "text" | "file" | "qna" | "website" | "table" | "inventory"
) => {
  if (contentType === "inventory" && typeof content === "string") {
    return <InventoryContent inventoryId={content} />;
  } else if (contentType === "qna" && typeof content !== "string") {
    return <QNAContent content={content} />;
  } else if (typeof content === "string") {
    return <Typography color="#fff">{content}</Typography>;
  }
};

// Content Dialog Component
interface ContentDialogProps {
  open: boolean;
  content: string | IQNA;
  contentType: "text" | "file" | "qna" | "website" | "table" | "inventory";
  onClose: () => void;
}
const ContentDialog = ({
  open,
  content,
  contentType,
  onClose,
}: ContentDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 2,
          bgcolor: "#0a0f1e",
          border: "1px solid rgba(0, 229, 255, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Agent Content
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#00e5ff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderContent(content, contentType)}</DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#00e5ff",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": {
              bgcolor: "rgba(0, 229, 255, 0.1)",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface KnowledgeTabProps {
  knowledgeBase: any;
  agentName: string;
  agentId: string;
}

interface IKnowledgeContent {
  content: string;
  contentType: "text" | "file" | "qna" | "website" | "table" | "inventory";
}

const KnowledgeTab = ({
  knowledgeBase,
  agentName,
  agentId,
}: KnowledgeTabProps) => {
  const [content, setContent] = useState<IKnowledgeContent>({
    content: "",
    contentType: "text",
  });
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleViewContent = (
    content: string,
    contentType: "text" | "file" | "qna" | "website" | "table" | "inventory"
  ) => {
    setContent({
      content,
      contentType,
    });
    setShowContentDialog(true);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          bgcolor: "#070b15",
        }}
      >
        <CircularProgress thickness={5} size={50} sx={{ color: "#7367f0" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#070b15", minHeight: "100vh", p: 2 }}>
      <AddKnowledge agentId={agentId} agentName={agentName} />

      {showContentDialog && (
        <ContentDialog
          open={showContentDialog}
          content={content.content}
          contentType={content.contentType}
          onClose={() => setShowContentDialog(false)}
        />
      )}

      <Box
        sx={{
          bgcolor: "#0a0f1e",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(0, 229, 255, 0.2)",
        }}
      >
        <Typography
          sx={{
            p: 3,
            fontSize: "18px",
            fontWeight: 600,
            color: "#fff",
            borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
          }}
        >
          Knowledge Base
        </Typography>

        {knowledgeBase && knowledgeBase.length > 0 ? (
          knowledgeBase.map((knowledge: any) => (
            <Box
              key={knowledge._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
                "&:hover": {
                  bgcolor: "rgba(0, 229, 255, 0.05)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                  label={knowledge.contentType}
                  sx={{
                    backgroundColor: "rgba(0, 229, 255, 0.1)",
                    color: "#00e5ff",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                />

                <Typography
                  sx={{
                    color: "#fff",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "300px",
                  }}
                >
                  {knowledge.contentType === "qna"
                    ? typeof knowledge.content === "object"
                      ? knowledge.content.question
                      : "Q&A Content"
                    : typeof knowledge.content === "string" &&
                      knowledge.content.length > 60
                    ? `${knowledge.content.substring(0, 60)}...`
                    : knowledge.content}
                </Typography>
              </Box>

              <Button
                onClick={() =>
                  handleViewContent(knowledge.content, knowledge.contentType)
                }
                sx={{
                  bgcolor: "rgba(0, 229, 255, 0.1)",
                  color: "#00e5ff",
                  borderRadius: "8px",
                  px: 3,
                  py: 0.5,
                  "&:hover": {
                    bgcolor: "rgba(0, 229, 255, 0.2)",
                  },
                }}
              >
                View
              </Button>
            </Box>
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="rgba(255, 255, 255, 0.7)">
              No knowledge base entries found. Add some knowledge to get
              started.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default KnowledgeTab;
