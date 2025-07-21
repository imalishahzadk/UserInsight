"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import FileDialog from "./dialogs/FileDialog";
import TextDialog from "./dialogs/TextDialog";
import QADialog from "./dialogs/QADialog";
import WebsiteDialog from "./dialogs/WebsiteDialog";
import TableDialog from "./dialogs/TableDialog";
import { colors, cardStyles, dropdownMenuStyles } from "./styles";
import agentService from "@/services/api/user/agent-service";

interface AddKnowledgeSectionProps {
  agentName: string;
  agentId: string;
  refetch: () => void;
}

const AddKnowledgeSection = ({
  agentName,
  agentId,
  refetch,
}: AddKnowledgeSectionProps) => {
  const [addKnowledgeAnchor, setAddKnowledgeAnchor] =
    useState<null | HTMLElement>(null);

  const [openDialog, setOpenDialog] = useState<
    "file" | "text" | "qna" | "website" | "table" | "importTable" | null
  >(null);

  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [table, setTable] = useState<File | null>(null);
  // Using openDialog as our content type tracker instead
  const [isAddingKnowledgeBase, setIsAddingKnowledgeBase] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const addKnowledgeOptions = [
    { label: "Add file", value: "file" },
    { label: "Add text", value: "text" },
    { label: "Add Q&A", value: "qna" },
    { label: "Add website", value: "website" },
    { label: "Import table", value: "table" },
  ];

  const handleAddKnowledgeClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAddKnowledgeAnchor(event.currentTarget);
  };

  const handleAddKnowledgeClose = () => {
    setAddKnowledgeAnchor(null);
  };

  const handleMenuItemClick = (option: string) => {
    handleAddKnowledgeClose();
    switch (option) {
      case "file":
        setOpenDialog("file");
        break;
      case "text":
        setOpenDialog("text");
        break;
      case "qna":
        setOpenDialog("qna");
        break;
      case "website":
        setOpenDialog("website");
        break;
      case "table":
        setOpenDialog("importTable");
        break;
      default:
        break;
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setIsSnackbarOpen(false);
  };

  const addKnowledgeBase = async () => {
    let formData;
    // Get the content type based on the dialog type
    const contentType = openDialog === "importTable" ? "table" : openDialog;

    if (contentType === "file" || contentType === "table") {
      formData = new FormData();

      formData.append("agentId", agentId);
      formData.append("contentType", contentType);
      if (contentType === "file") {
        if (file) {
          formData.append("file", file);
        }
      } else if (contentType === "table") {
        if (table) {
          formData.append("file", table);
        }
      }
    } else {
      let content;

      switch (contentType) {
        case "text":
          content = text;
          break;
        case "qna":
          content = {
            question,
            answer,
          };
          break;
        case "website":
          content = websiteUrl;
          break;
        default:
          break;
      }

      formData = {
        agentId,
        contentType,
        content,
      };
    }

    try {
      setIsAddingKnowledgeBase(true);
      const response = await agentService.feedKnowledgeToBot(formData);
      setIsAddingKnowledgeBase(false);

      if (response.success) {
        setIsSnackbarOpen(true);
        setSeverity("success");
        setMessage(response.message);

        // Reset form fields
        setText("");
        setQuestion("");
        setAnswer("");
        setWebsiteUrl("");
        setFile(null);
        setTable(null);

        if (refetch) {
          refetch();
        }
      } else {
        setIsSnackbarOpen(true);
        setSeverity("error");
        setMessage(response.message);
      }
    } catch (error: any) {
      setIsAddingKnowledgeBase(false);
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage(error.response ? error.response.data.message : error.message);
      console.error("Error creating agent:", error);
    } finally {
      setOpenDialog(null);
    }
  };

  return (
    <Box>
      {/* Main Section */}
      <Box sx={cardStyles}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: colors.text,
            }}
          >
            Enter knowledge for{" "}
            <span style={{ color: colors.primary }}>{agentName}</span>
          </Typography>
          <Button
            onClick={handleAddKnowledgeClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              bgcolor: "rgba(0, 229, 255, 0.1)",
              color: colors.primary,
              borderRadius: "100px",
              textTransform: "none",
              px: 3,
              py: 1.5,
              height: "48px",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "rgba(0, 229, 255, 0.2)" },
            }}
          >
            Add knowledge
          </Button>
        </Box>
        <Typography
          sx={{
            color: colors.textSecondary,
            fontSize: "14px",
          }}
        >
          Add various types of knowledge content to enhance your agent's abilities.
        </Typography>
      </Box>

      <Menu
        anchorEl={addKnowledgeAnchor}
        open={Boolean(addKnowledgeAnchor)}
        onClose={handleAddKnowledgeClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={dropdownMenuStyles}
      >
        {addKnowledgeOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(option.value)}
            sx={{
              py: 1.5,
              color: colors.textSecondary,
              "&:hover": { bgcolor: "rgba(0, 229, 255, 0.05)" },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Render the appropriate dialog based on openDialog */}
      {openDialog === "file" && (
        <FileDialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          file={file}
          onFileChange={setFile}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
        />
      )}
      {openDialog === "text" && (
        <TextDialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          text={text}
          onTextChange={setText}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
        />
      )}
      {openDialog === "qna" && (
        <QADialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          question={question}
          answer={answer}
          onQuestionChange={setQuestion}
          onAnswerChange={setAnswer}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
        />
      )}
      {openDialog === "website" && (
        <WebsiteDialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          websiteUrl={websiteUrl}
          onUrlChange={setWebsiteUrl}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
        />
      )}
      {openDialog === "importTable" && (
        <TableDialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          file={table}
          onFileChange={setTable}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
        />
      )}

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddKnowledgeSection;
