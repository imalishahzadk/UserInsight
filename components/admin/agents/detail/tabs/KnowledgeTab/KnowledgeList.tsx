"use client";
import { useState } from "react";
import { 
  Box, 
  Chip, 
  Typography, 
  Paper,
  Tooltip,
  IconButton,
  Divider
} from "@mui/material";
import {
  TextFields as TextFieldsIcon,
  InsertDriveFile as InsertDriveFileIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Language as LanguageIcon,
  TableChart as TableChartIcon,
  Inventory as InventoryIcon,
  Visibility as VisibilityIcon,
  InfoOutlined as InfoOutlinedIcon
} from "@mui/icons-material";
import ContentDialog from "./dialogs/ContentDialog";
import { colors, knowledgeItemStyles } from "./styles";

interface IQNA {
  question: string;
  answer: string;
}

interface IKnowledgeContent {
  content: string | IQNA;
  contentType: "text" | "file" | "qna" | "website" | "table" | "inventory";
}

interface KnowledgeListProps {
  knowledgeBase: any[];
}

const KnowledgeList = ({ knowledgeBase }: KnowledgeListProps) => {
  const [content, setContent] = useState<IKnowledgeContent>({
    content: "",
    contentType: "text",
  });
  const [showContentDialog, setShowContentDialog] = useState(false);
  
  // For UI interactions
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleViewContent = (
    content: string | IQNA,
    contentType: "text" | "file" | "qna" | "website" | "table" | "inventory"
  ) => {
    setContent({
      content,
      contentType,
    });
    setShowContentDialog(true);
  };

  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <TextFieldsIcon sx={{ fontSize: 18 }} />;
      case "file":
        return <InsertDriveFileIcon sx={{ fontSize: 18 }} />;
      case "qna":
        return <QuestionAnswerIcon sx={{ fontSize: 18 }} />;
      case "website":
        return <LanguageIcon sx={{ fontSize: 18 }} />;
      case "table":
        return <TableChartIcon sx={{ fontSize: 18 }} />;
      case "inventory":
        return <InventoryIcon sx={{ fontSize: 18 }} />;
      default:
        return <InfoOutlinedIcon sx={{ fontSize: 18 }} />;
    }
  };

  // Get content type display name
  const getContentTypeName = (type: string) => {
    switch (type) {
      case "text":
        return "Text";
      case "file":
        return "Document";
      case "qna":
        return "Q&A";
      case "website":
        return "Website";
      case "table":
        return "Table";
      case "inventory":
        return "Inventory";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Get a badge color based on content type
  const getChipColor = (type: string) => {
    switch (type) {
      case "text":
        return { bg: "rgba(0, 229, 255, 0.1)", text: colors.primary };
      case "file":
        return { bg: "rgba(124, 58, 237, 0.1)", text: "#7C3AED" };
      case "qna":
        return { bg: "rgba(16, 185, 129, 0.1)", text: "#10B981" };
      case "website":
        return { bg: "rgba(249, 115, 22, 0.1)", text: "#F97316" };
      case "table":
        return { bg: "rgba(239, 68, 68, 0.1)", text: "#EF4444" };
      case "inventory":
        return { bg: "rgba(234, 179, 8, 0.1)", text: "#EAB308" };
      default:
        return { bg: colors.border, text: colors.textSecondary };
    }
  };

  // Get content preview/summary
  const getContentPreview = (content: any, type: string): string => {
    if (typeof content === 'string') {
      if (type === 'website') {
        return content; // Show the URL for website type
      } else if (content.length > 60) {
        return content.substring(0, 60) + '...';
      }
      return content;
    } else if (type === 'qna' && content.question) {
      return 'Q: ' + content.question.substring(0, 60) + (content.question.length > 60 ? '...' : '');
    }
    return 'No preview available';
  };

  if (!knowledgeBase || knowledgeBase.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
          px: 2,
          color: colors.textSecondary,
          bgcolor: "rgba(0, 229, 255, 0.03)",
          borderRadius: "16px",
          border: `1px dashed ${colors.border}`,
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 48, color: "rgba(0, 229, 255, 0.2)", mb: 2 }} />
        <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 1, color: colors.text }}>
          No Knowledge Data Available
        </Typography>
        <Typography sx={{ fontSize: "14px", textAlign: "center", maxWidth: "80%" }}>
          Add knowledge to your agent using the 'Add Knowledge' button above.
        </Typography>
      </Box>
    );
  }

  // Group knowledge base by type
  const groupedKnowledge = knowledgeBase.reduce((acc, item) => {
    if (!acc[item.contentType]) {
      acc[item.contentType] = [];
    }
    acc[item.contentType].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  // Get total count per type
  const typeCounts = Object.keys(groupedKnowledge).map(type => ({
    type,
    count: groupedKnowledge[type].length
  }));

  return (
    <>
      {/* Type summary chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {typeCounts.map(({type, count}) => {
          const chipColor = getChipColor(type);
          return (
            <Chip
              key={type}
              icon={getContentTypeIcon(type)}
              label={`${getContentTypeName(type)}: ${count}`}
              sx={{
                backgroundColor: chipColor.bg,
                color: chipColor.text,
                fontWeight: 600,
                fontSize: "0.75rem",
                "& .MuiChip-icon": {
                  color: chipColor.text,
                }
              }}
            />
          );
        })}
      </Box>
      
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
          bgcolor: colors.cardBackground,
          mb: 4,
        }}
      >
        {knowledgeBase.map((knowledge: any, index: number) => {
          const chipColor = getChipColor(knowledge.contentType);
          const isHovered = hoveredItem === knowledge._id;
          
          return (
            <Box key={knowledge._id}>
              <Box
                sx={{
                  ...knowledgeItemStyles,
                  p: 3,
                  bgcolor: isHovered ? "rgba(0, 229, 255, 0.05)" : "transparent",
                }}
                onMouseEnter={() => setHoveredItem(knowledge._id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    bgcolor: chipColor.bg,
                    color: chipColor.text,
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    flexShrink: 0
                  }}>
                    {getContentTypeIcon(knowledge.contentType)}
                  </Box>
                  
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: colors.text,
                        mb: 0.5,
                      }}
                    >
                      {getContentTypeName(knowledge.contentType)}
                    </Typography>
                    
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: colors.textSecondary,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {getContentPreview(knowledge.content, knowledge.contentType)}
                    </Typography>
                  </Box>
                </Box>
                
                <Tooltip title="View Content" arrow>
                  <IconButton
                    onClick={() => handleViewContent(knowledge.content, knowledge.contentType)}
                    sx={{ 
                      color: colors.primary,
                      bgcolor: "rgba(0, 229, 255, 0.1)",
                      "&:hover": {
                        bgcolor: "rgba(0, 229, 255, 0.2)",
                      },
                      transition: "all 0.2s"
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              </Box>
              
              {index < knowledgeBase.length - 1 && (
                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />
              )}
            </Box>
          );
        })}
      </Paper>

      {showContentDialog && (
        <ContentDialog
          open={showContentDialog}
          content={content.content}
          contentType={content.contentType}
          onClose={() => setShowContentDialog(false)}
        />
      )}
    </>
  );
};

export default KnowledgeList;
