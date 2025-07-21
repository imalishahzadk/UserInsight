"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  TextFields as TextFieldsIcon,
  InsertDriveFile as InsertDriveFileIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Language as LanguageIcon,
  TableChart as TableChartIcon,
  Inventory as InventoryIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { colors, dialogPaperProps, secondaryButtonStyles } from "../styles";
import inventoryService from "@/services/api/user/inventory-service";

// Content types
interface IQNA {
  question: string;
  answer: string;
}

// Get content type display name and icon
const getContentTypeInfo = (type: string) => {
  switch (type) {
    case "text":
      return {
        name: "Text",
        icon: <TextFieldsIcon sx={{ fontSize: 18 }} />,
        color: colors.primary,
      };
    case "file":
      return {
        name: "Document",
        icon: <InsertDriveFileIcon sx={{ fontSize: 18 }} />,
        color: "#7C3AED",
      };
    case "qna":
      return {
        name: "Q&A",
        icon: <QuestionAnswerIcon sx={{ fontSize: 18 }} />,
        color: "#10B981",
      };
    case "website":
      return {
        name: "Website",
        icon: <LanguageIcon sx={{ fontSize: 18 }} />,
        color: "#F97316",
      };
    case "table":
      return {
        name: "Table",
        icon: <TableChartIcon sx={{ fontSize: 18 }} />,
        color: "#EF4444",
      };
    case "inventory":
      return {
        name: "Inventory",
        icon: <InventoryIcon sx={{ fontSize: 18 }} />,
        color: "#EAB308",
      };
    default:
      return {
        name: type.charAt(0).toUpperCase() + type.slice(1),
        icon: null,
        color: colors.textSecondary,
      };
  }
};

// Inventory Content Component
interface InventoryContentProps {
  inventoryId: string;
}

export const InventoryContent = ({ inventoryId }: InventoryContentProps) => {
  const [inventoryDetails, setInventoryDetails] = useState<{
    _id: string;
    inventoryUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inventoryId) {
      setLoading(true);
      inventoryService.getInventoryFeedById(inventoryId).then((data) => {
        if (data) {
          setInventoryDetails(data);
        }
        setLoading(false);
      });
    }
  }, [inventoryId]);

  if (loading) {
    return (
      <Typography sx={{ color: colors.textSecondary, py: 2 }}>
        Loading inventory details...
      </Typography>
    );
  }

  if (!inventoryDetails) {
    return (
      <Typography sx={{ color: colors.textSecondary }}>
        Inventory information not available.
      </Typography>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "rgba(234, 179, 8, 0.05)",
        border: "1px solid rgba(234, 179, 8, 0.2)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <InventoryIcon sx={{ color: "#EAB308" }} />
        <Typography sx={{ fontWeight: 500, color: colors.text }}>
          Inventory Feed
        </Typography>
      </Box>

      <Typography sx={{ mb: 2, color: colors.text }}>
        This agent is connected to the following inventory feed:
      </Typography>

      <Link
        href={inventoryDetails.inventoryUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#EAB308",
          wordBreak: "break-all",
        }}
      >
        {inventoryDetails.inventoryUrl}
        <OpenInNewIcon sx={{ fontSize: 16 }} />
      </Link>
    </Paper>
  );
};

// Q&A Content Component
interface QNAContentProps {
  content: IQNA;
}

export const QNAContent = ({ content }: QNAContentProps) => {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "rgba(16, 185, 129, 0.05)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          borderRadius: "12px",
        }}
      >
        <Typography sx={{ fontWeight: 600, color: "#10B981", mb: 1 }}>
          Question
        </Typography>
        <Typography sx={{ color: colors.text }}>{content.question}</Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: colors.cardBackground,
          border: `1px solid ${colors.border}`,
          borderRadius: "12px",
        }}
      >
        <Typography sx={{ fontWeight: 600, color: colors.primary, mb: 1 }}>
          Answer
        </Typography>
        <Typography sx={{ color: colors.text, whiteSpace: "pre-wrap" }}>
          {content.answer}
        </Typography>
      </Paper>
    </Box>
  );
};

// Website Content Component
const WebsiteContent = ({ url }: { url: string }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "rgba(249, 115, 22, 0.05)",
        border: "1px solid rgba(249, 115, 22, 0.2)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <LanguageIcon sx={{ color: "#F97316" }} />
        <Typography sx={{ fontWeight: 500, color: colors.text }}>
          Website URL
        </Typography>
      </Box>

      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#F97316",
          wordBreak: "break-all",
        }}
      >
        {url}
        <OpenInNewIcon sx={{ fontSize: 16 }} />
      </Link>
    </Paper>
  );
};

// Text Content Component
const TextContent = ({ text }: { text: string }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "rgba(0, 229, 255, 0.05)",
        border: "1px solid rgba(0, 229, 255, 0.2)",
        borderRadius: "12px",
      }}
    >
      <Typography
        sx={{
          color: colors.text,
          whiteSpace: "pre-wrap",
          lineHeight: 1.6,
        }}
      >
        {text}
      </Typography>
    </Paper>
  );
};

// File Content Component
const FileContent = ({ filePath }: { filePath: string }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "rgba(124, 58, 237, 0.05)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <InsertDriveFileIcon sx={{ color: "#7C3AED" }} />
        <Typography sx={{ fontWeight: 500, color: colors.text }}>
          File Content
        </Typography>
      </Box>

      <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
        <Typography
          sx={{
            color: colors.text,
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {filePath}
        </Typography>
      </Box>
    </Paper>
  );
};

// Render content based on type
export const renderContent = (
  content: string | IQNA,
  contentType: "text" | "file" | "qna" | "website" | "table" | "inventory"
) => {
  if (contentType === "inventory" && typeof content === "string") {
    return <InventoryContent inventoryId={content} />;
  } else if (contentType === "qna" && typeof content !== "string") {
    return <QNAContent content={content} />;
  } else if (contentType === "website" && typeof content === "string") {
    return <WebsiteContent url={content} />;
  } else if (contentType === "text" && typeof content === "string") {
    return <TextContent text={content} />;
  } else if (contentType === "file" && typeof content === "string") {
    return <FileContent filePath={content} />;
  } else if (typeof content === "string") {
    return (
      <Typography sx={{ color: colors.text, whiteSpace: "pre-wrap" }}>
        {content}
      </Typography>
    );
  }

  return (
    <Typography sx={{ color: colors.textSecondary }}>
      Content cannot be displayed
    </Typography>
  );
};

// Content Dialog
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
  const contentTypeInfo: { name: string; icon: any; color: string } =
    getContentTypeInfo(contentType);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        ...dialogPaperProps,
        sx: {
          ...dialogPaperProps.sx,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            icon={contentTypeInfo.icon}
            label={contentTypeInfo.name}
            sx={{
              backgroundColor: `${contentTypeInfo.color}15`, // 15% opacity
              color: contentTypeInfo.color,
              fontWeight: 600,
              "& .MuiChip-icon": {
                color: contentTypeInfo.color,
              },
            }}
          />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: colors.text,
            }}
          >
            Content Viewer
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: colors.text }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />

      <DialogContent sx={{ p: 3 }}>
        {renderContent(content, contentType)}
      </DialogContent>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            ...secondaryButtonStyles,
            borderColor: colors.border,
            borderRadius: "8px",
            "&:hover": {
              borderColor: colors.borderHover,
              bgcolor: "rgba(0, 229, 255, 0.05)",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentDialog;
