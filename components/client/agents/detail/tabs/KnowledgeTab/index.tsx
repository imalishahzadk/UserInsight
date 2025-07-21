"use client";

import { useEffect, useState } from "react";
import AddKnowledge from "./add-knowledge";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Dialog,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  TableChartOutlined as TableChartOutlinedIcon,
  FileUploadOutlined as FileUploadOutlinedIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import agentService from "@/services/api/client/agent-service";
import inventoryService from "@/services/api/client/inventory-service";

import { useQuery } from "@tanstack/react-query";
import PageSpinner from "@/components/shared/PageSpinner";
import useNotification from "@/hooks/shared/use-notification";
import AddInventory from "./add-inventory";

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
  }, []);

  return (
    <a
      href={inventoryDetails?.inventoryUrl}
      target="_blank"
      className="break-words text-blue-600 underline"
    >
      {inventoryDetails?.inventoryUrl ?? ""}
    </a>
  );
};

interface IQNA {
  question: string;
  answer: string;
}

const QNAContent = ({ content }: { content: IQNA }) => {
  return (
    <div>
      <p className="font-bold">{content.question}</p>
      <p className="">{content.answer}</p>
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
    return <Typography>{content}</Typography>;
  }
};

// ------------------- Content Dialog -------------------
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
      PaperProps={{ sx: { borderRadius: "20px", p: 2 } }}
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
          }}
        >
          Agent Content
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderContent(content, contentType)}</DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#6B7280",
            textTransform: "none",
            "&:hover": { bgcolor: "#F3F4F6" },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface IKnowledgeContent {
  content: string;
  contentType: "text" | "file" | "qna" | "website" | "table" | "inventory";
}

const getAgentKnowledge = async (agentId: string) => {
  const res = await agentService.getAgentsKnowledge(agentId);

  if (res.success) {
    return res.data;
  } else {
    return [];
  }
};

const KnowledgeTab = ({
  agentId,
  agentName,
}: {
  agentId: string;
  agentName: string;
}) => {
  const {
    data: knowledgeBase,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["knowledge", agentId],
    queryFn: () => getAgentKnowledge(agentId),
    refetchOnWindowFocus: false,
  });

  const [content, setContent] = useState<IKnowledgeContent>({
    content: "",
    contentType: "text",
  });
  const [showContentDialog, setShowContentDialog] = useState(false);

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

  if (isFetching) {
    return <PageSpinner />;
  }

  if (error) {
    return <>Something Went wrong!</>;
  }

  return (
    <>
      <AddKnowledge agentId={agentId} agentName={agentName} refetch={refetch} />

      {showContentDialog && (
        <ContentDialog
          open={showContentDialog}
          content={content.content}
          contentType={content.contentType}
          onClose={() => setShowContentDialog(false)}
        />
      )}

      <Box>
        {knowledgeBase.map((knowledge: any, index: number) => (
          <Box
            key={knowledge._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Chip
                label={knowledge.contentType}
                sx={{
                  backgroundColor: "#E5E7EB",
                  color: "#374151",
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button
                className="bg-[#ECFDF5] text-[#10B981] px-4 cursor-pointer py-1 rounded-2xl"
                onClick={() =>
                  handleViewContent(knowledge.content, knowledge.contentType)
                }
              >
                View
              </button>
            </Box>
          </Box>
        ))}
      </Box>

      <AddInventory agentId={agentId} refetchKnowledge={refetch} />
    </>
  );
};

export default KnowledgeTab;
