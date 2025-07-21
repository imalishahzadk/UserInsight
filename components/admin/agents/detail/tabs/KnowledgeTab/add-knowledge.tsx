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
import agentService from "@/services/api/user/agent-service";

/* ===============================
   Add Knowledge Dialog Components
   =============================== */

// ------------------- File Dialog -------------------
interface FileDialogProps {
  open: boolean;
  isLoading: boolean;
  file: File | null;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
  onClose: () => void;
}
const FileDialog = ({
  open,
  isLoading,
  file,
  onFileChange,
  onSubmit,
  onClose,
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
          Add File
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            mt: 2,
            border: "2px dashed #E5E7EB",
            borderRadius: "10px",
            p: 4,
            textAlign: "center",
          }}
        >
          <FileUploadOutlinedIcon
            sx={{ fontSize: 48, color: "#6B7280", mb: 2 }}
          />
          <Typography sx={{ color: "#374151", mb: 1 }}>
            Drag and drop your files here
          </Typography>
          <Typography sx={{ color: "#6B7280", mb: 2 }}>or</Typography>
          <Button
            variant="outlined"
            sx={{ borderRadius: "100px", textTransform: "none" }}
            component="label"
          >
            Browse files
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          {file && (
            <Typography sx={{ mt: 2, color: "#374151", fontWeight: "bold" }}>
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
            color="primary"
            onClick={onSubmit}
            sx={{ borderRadius: "10px" }}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

// ------------------- Text Dialog -------------------
interface TextDialogProps {
  open: boolean;
  isLoading: boolean;
  text: string;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}
const TextDialog = ({
  open,
  isLoading,
  text,
  onTextChange,
  onSubmit,
  onClose,
}: TextDialogProps) => {
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
          Add Text
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Enter your text here..."
          sx={{ mt: 2 }}
        />
      </DialogContent>
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
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="contained"
          sx={{
            bgcolor: "#1A83FF",
            borderRadius: "100px",
            textTransform: "none",
            px: 4,
            "&:hover": { bgcolor: "#1666CC" },
          }}
        >
          {isLoading ? "Adding Text..." : "Add Text"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ------------------- Q&A Dialog -------------------
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
          Add Q&A
        </Typography>
        <IconButton onClick={onClose}>
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
          sx={{ mt: 2, mb: 3 }}
        />
        <TextField
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          fullWidth
          multiline
          rows={4}
          label="Answer"
          placeholder="Enter your answer"
        />
      </DialogContent>
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
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="contained"
          sx={{
            bgcolor: "#1A83FF",
            borderRadius: "100px",
            textTransform: "none",
            px: 4,
            "&:hover": { bgcolor: "#1666CC" },
          }}
        >
          {isLoading ? "Adding Q&A" : "Add Q&A"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ------------------- Website Dialog -------------------
interface WebsiteDialogProps {
  open: boolean;
  isLoading: boolean;
  websiteUrl: string;
  onUrlChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}
const WebsiteDialog = ({
  open,
  isLoading,
  websiteUrl,
  onUrlChange,
  onSubmit,
  onClose,
}: WebsiteDialogProps) => {
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
          Add Website
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={websiteUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          fullWidth
          label="Website URL"
          placeholder="Enter website URL"
          sx={{ mt: 2 }}
        />
      </DialogContent>
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
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="contained"
          sx={{
            bgcolor: "#1A83FF",
            borderRadius: "100px",
            textTransform: "none",
            px: 4,
            "&:hover": { bgcolor: "#1666CC" },
          }}
        >
          {isLoading ? "Crawling..." : "Add Website"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ------------------- Table Dialog -------------------
// (In this example, the Table dialog is kept simple.)
interface TableDialogProps {
  open: boolean;
  onClose: () => void;
}
const TableDialog = ({ open, onClose }: TableDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
          Add Table
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Button
            startIcon={<AddIcon />}
            sx={{ color: "#1A83FF", textTransform: "none", mb: 2 }}
          >
            Add Column
          </Button>
          <TextField
            fullWidth
            placeholder="Enter table data"
            multiline
            rows={6}
          />
        </Box>
      </DialogContent>
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
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1A83FF",
            borderRadius: "100px",
            textTransform: "none",
            px: 4,
            "&:hover": { bgcolor: "#1666CC" },
          }}
        >
          Add Table
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ------------------- Import Table Dialog -------------------
interface ImportTableDialogProps {
  open: boolean;
  onClose: () => void;
}
const ImportTableDialog = ({
  open,
  isLoading,
  file,
  onFileChange,
  onSubmit,
  onClose,
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
          Import Table
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            mt: 2,
            border: "2px dashed #E5E7EB",
            borderRadius: "10px",
            p: 4,
            textAlign: "center",
          }}
        >
          <TableChartOutlinedIcon
            sx={{ fontSize: 48, color: "#6B7280", mb: 2 }}
          />
          <Typography sx={{ color: "#374151", mb: 1 }}>
            Drag and drop your table file here
          </Typography>
          <Typography sx={{ color: "#6B7280", mb: 2 }}>or</Typography>
          <Button
            variant="outlined"
            sx={{ borderRadius: "100px", textTransform: "none" }}
            component="label"
          >
            Browse files
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          {file && (
            <Typography sx={{ mt: 2, color: "#374151", fontWeight: "bold" }}>
              Selected File: {file.name}
            </Typography>
          )}
          <Typography sx={{ color: "#6B7280", mt: 2, fontSize: "0.875rem" }}>
            Supported formats: CSV, Excel
          </Typography>
        </Box>
      </DialogContent>
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

        {file && (
          <Button
            disabled={isLoading}
            variant="contained"
            sx={{
              bgcolor: "#1A83FF",
              borderRadius: "100px",
              textTransform: "none",
              px: 4,
              "&:hover": { bgcolor: "#1666CC" },
            }}
            onClick={onSubmit}
          >
            {isLoading ? "Uploading..." : "Import Table"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

/* ===============================
   Main KnowledgeTab Component
   =============================== */
interface KnowledgeTabProps {
  agentName: string;
  agentId: string;
  refetch: () => void;
}
export default function AddKnowledge({
  agentName,
  agentId,
  refetch,
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
  const [inputType, setInputType] = useState("Add text");
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
    setInputType(option);
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
      //   case "table":
      //     setOpenDialog("table");
      //     break;
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

    if (inputType === "file" || inputType === "table") {
      formData = new FormData();

      formData.append("agentId", agentId);
      formData.append("contentType", inputType);
      if (inputType === "file") {
        if (file) {
          formData.append("file", file);
        }
      } else if (inputType === "table") {
        if (table) {
          formData.append("file", table);
        }
      }
    } else {
      let content;

      switch (inputType) {
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
        contentType: inputType,
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
      <Box
        sx={{
          borderRadius: "20px",
          p: 3,
          mb: 3,
          color: "white",
          bgcolor: "#171f3b",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
            fontWeight="normal"
            color="#111827"
            flex={1}
          >
            Enter knowledge for{" "}
            <span style={{ fontWeight: "bold" }}>{agentName}</span>
          </Typography>
          <Button
            onClick={handleAddKnowledgeClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              bgcolor: "#EEF2FF",
              color: "#1A83FF",
              borderRadius: "100px",
              textTransform: "none",
              px: 3,
              py: 1.5,
              height: "48px",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#E5E7EB" },
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
            borderRadius: "10px",
            minWidth: "200px",
            mt: 1,
            boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {addKnowledgeOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(option.value)}
            sx={{
              py: 1.5,
              color: "#6B7280",
              "&:hover": { bgcolor: "#F9FAFB" },
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
      {openDialog === "table" && (
        <TableDialog open={true} onClose={() => setOpenDialog(null)} />
      )}
      {openDialog === "importTable" && (
        <ImportTableDialog
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
          sx={{ width: "100%", fontFamily: "Velyra" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
