"use client";
import { useState } from "react";
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
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  FileUploadOutlined as FileUploadOutlinedIcon,
  Close as CloseIcon,
  TableChartOutlined as TableChartOutlinedIcon,
} from "@mui/icons-material";
import agentService from "@/services/api/user/agent-service";

// ------------------- File Dialog -------------------

interface FileDialogProps {
  open: boolean;
  isLoading: boolean;
  file: File | null;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
  onClose: () => void;
  icon: any;
  title: string;
  description: string;
  buttonLabel: string;
}

const FileDialog = ({
  open,
  isLoading,
  file,
  onFileChange,
  onSubmit,
  onClose,
  icon,
  title,
  description,
  buttonLabel,
}: FileDialogProps) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

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
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#00e5ff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            mt: 2,
            border: "2px dashed rgba(0, 229, 255, 0.2)",
            borderRadius: "10px",
            p: 4,
            textAlign: "center",
          }}
        >
          {icon}
          <Typography sx={{ color: "#fff", mb: 1 }}>
            {description || "Drag and drop your files here"}
          </Typography>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 2 }}>
            or
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              color: "#00e5ff",
              borderColor: "rgba(0, 229, 255, 0.4)",
              "&:hover": {
                borderColor: "#00e5ff",
                bgcolor: "rgba(0, 229, 255, 0.1)",
              },
            }}
            component="label"
          >
            Browse files
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          {file && (
            <Typography sx={{ mt: 2, color: "#fff", fontWeight: "bold" }}>
              Selected File: {file.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {file && (
          <Button
            disabled={isLoading}
            variant="contained"
            onClick={onSubmit}
            sx={{
              borderRadius: "8px",
              bgcolor: "#00e5ff",
              color: "#0a0f1e",
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.8)",
              },
              fontWeight: 600,
            }}
          >
            {isLoading ? "Uploading..." : buttonLabel || "Upload"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

interface TextDialogProps {
  open: boolean;
  isLoading: boolean;
  title: string;
  inputLabel: string;
  value: string;
  multiline?: boolean;
  rows?: number;
  buttonLabel: string;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

// ------------------- Text Input Dialog -------------------
const TextInputDialog = ({
  open,
  isLoading,
  title,
  inputLabel,
  value,
  onTextChange,
  onSubmit,
  onClose,
  multiline = true,
  rows = 4,
  buttonLabel,
}: TextDialogProps) => {
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
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#00e5ff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={value}
          onChange={(e) => onTextChange(e.target.value)}
          fullWidth
          multiline={multiline}
          rows={rows}
          label={inputLabel}
          placeholder={`Enter ${inputLabel.toLowerCase()}...`}
          sx={{
            mt: 2,
            "& .MuiInputBase-root": {
              bgcolor: "#070b15",
              borderRadius: "8px",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
              },
            },
            "& fieldset": { border: "none" },
            "& input, & textarea": {
              color: "#fff",
            },
            "& label": {
              color: "rgba(255, 255, 255, 0.5)",
            },
            "& label.Mui-focused": {
              color: "#00e5ff",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="contained"
          sx={{
            bgcolor: "#00e5ff",
            color: "#0a0f1e",
            borderRadius: "8px",
            textTransform: "none",
            px: 4,
            fontWeight: 600,
            "&:hover": {
              bgcolor: "rgba(0, 229, 255, 0.8)",
            },
          }}
        >
          {isLoading ? `Adding ${title}...` : buttonLabel || `Add ${title}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface QADialogProps {
  open: boolean;
  isLoading: boolean;
  question: string;
  answer: string;
  onQuestionChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

// ------------------- Q&A Dialog -------------------
const QADialog = ({
  open,
  isLoading,
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
  onSubmit,
  onClose,
}: QADialogProps) => {
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
          Add Q&A
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#00e5ff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          fullWidth
          label="Question"
          placeholder="Enter your question"
          sx={{
            mt: 2,
            mb: 3,
            "& .MuiInputBase-root": {
              bgcolor: "#070b15",
              borderRadius: "8px",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
              },
            },
            "& fieldset": { border: "none" },
            "& input, & textarea": {
              color: "#fff",
            },
            "& label": {
              color: "rgba(255, 255, 255, 0.5)",
            },
            "& label.Mui-focused": {
              color: "#00e5ff",
            },
          }}
        />
        <TextField
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          fullWidth
          multiline
          rows={4}
          label="Answer"
          placeholder="Enter your answer"
          sx={{
            "& .MuiInputBase-root": {
              bgcolor: "#070b15",
              borderRadius: "8px",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
              },
            },
            "& fieldset": { border: "none" },
            "& input, & textarea": {
              color: "#fff",
            },
            "& label": {
              color: "rgba(255, 255, 255, 0.5)",
            },
            "& label.Mui-focused": {
              color: "#00e5ff",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="contained"
          sx={{
            bgcolor: "#00e5ff",
            color: "#0a0f1e",
            borderRadius: "8px",
            textTransform: "none",
            px: 4,
            fontWeight: 600,
            "&:hover": {
              bgcolor: "rgba(0, 229, 255, 0.8)",
            },
          }}
        >
          {isLoading ? "Adding Q&A..." : "Add Q&A"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* ===============================
   Main AddKnowledge Component
   =============================== */

interface KnowledgeTabProps {
  agentName: string;
  agentId: string;
}

interface IKnowledgeOption {
  label: string;
  value: "file" | "text" | "qna" | "website" | "importTable";
}

export default function AddKnowledge({
  agentName,
  agentId,
}: KnowledgeTabProps) {
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
  const [isAddingKnowledgeBase, setIsAddingKnowledgeBase] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const addKnowledgeOptions: IKnowledgeOption[] = [
    { label: "Add file", value: "file" },
    { label: "Add text", value: "text" },
    { label: "Add Q&A", value: "qna" },
    { label: "Add website", value: "website" },
    { label: "Import table", value: "importTable" },
  ];

  const handleAddKnowledgeClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAddKnowledgeAnchor(event.currentTarget);
  };

  const handleAddKnowledgeClose = () => {
    setAddKnowledgeAnchor(null);
  };

  const handleMenuItemClick = (
    option: "file" | "text" | "qna" | "website" | "importTable"
  ) => {
    handleAddKnowledgeClose();
    setOpenDialog(option);
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
    let contentType = openDialog === "importTable" ? "table" : openDialog;

    if (!contentType) return;

    if (openDialog === "file" || openDialog === "importTable") {
      formData = new FormData();
      formData.append("agentId", agentId);
      formData.append("contentType", contentType);

      if (openDialog === "file" && file) {
        formData.append("file", file);
      } else if (openDialog === "importTable" && table) {
        formData.append("file", table);
      }
    } else {
      let content;

      switch (openDialog) {
        case "text":
          content = text;
          break;
        case "qna":
          content = { question, answer };
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
    } else {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage(response.message);
    }
  };

  return (
    <Box>
      {/* Main Section */}
      <Box
        sx={{
          borderRadius: "16px",
          p: 3,
          mb: 3,
          bgcolor: "#0a0f1e",
          border: "1px solid rgba(0, 229, 255, 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Enter abc for <span style={{ color: "#00e5ff" }}>{agentName}</span>
          </Typography>
          <Button
            onClick={handleAddKnowledgeClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              bgcolor: "rgba(0, 229, 255, 0.1)",
              color: "#00e5ff",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              height: "40px",
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.2)",
              },
            }}
          >
            Add knowledge
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={addKnowledgeAnchor}
        open={Boolean(addKnowledgeAnchor)}
        onClose={handleAddKnowledgeClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            minWidth: "180px",
            mt: 1,
            bgcolor: "#0a0f1e",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {addKnowledgeOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(option.value)}
            sx={{
              py: 1.5,
              color: "#fff",
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.1)",
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      {/* File Dialog */}
      {openDialog === "file" && (
        <FileDialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          file={file}
          onFileChange={setFile}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
          icon={
            <FileUploadOutlinedIcon
              sx={{ fontSize: 48, color: "#00e5ff", mb: 2 }}
            />
          }
          title="Add File"
          description="Drag and drop your files here"
          buttonLabel="Upload File"
        />
      )}

      {/* Text Dialog */}
      {openDialog === "text" && (
        <TextInputDialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          title="Add Text"
          inputLabel="Text"
          value={text}
          onTextChange={setText}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
          buttonLabel="Add Text"
        />
      )}

      {/* Q&A Dialog */}
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

      {/* Website Dialog */}
      {openDialog === "website" && (
        <TextInputDialog
          rows={4}
          open={true}
          isLoading={isAddingKnowledgeBase}
          title="Add Website"
          inputLabel="Website URL"
          value={websiteUrl}
          onTextChange={setWebsiteUrl}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
          multiline={false}
          buttonLabel="Add Website"
        />
      )}

      {/* Import Table Dialog */}
      {openDialog === "importTable" && (
        <FileDialog
          open={true}
          isLoading={isAddingKnowledgeBase}
          file={table}
          onFileChange={(file: File) => setTable(file)}
          onSubmit={addKnowledgeBase}
          onClose={() => setOpenDialog(null)}
          icon={
            <TableChartOutlinedIcon
              sx={{ fontSize: 48, color: "#00e5ff", mb: 2 }}
            />
          }
          title="Import Table"
          description="Drag and drop your table file here"
          buttonLabel="Import Table"
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
          sx={{
            width: "100%",
            bgcolor:
              severity === "success" ? "rgba(0, 229, 255, 0.1)" : undefined,
            "& .MuiAlert-icon": {
              color: severity === "success" ? "#00e5ff" : undefined,
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
