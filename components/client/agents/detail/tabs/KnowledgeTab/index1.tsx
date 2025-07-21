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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
export default function KnowledgeTab({ knowledgeBase, agentName }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addKnowledgeAnchor, setAddKnowledgeAnchor] =
    useState<null | HTMLElement>(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [openTextDialog, setOpenTextDialog] = useState(false);
  const [openQADialog, setOpenQADialog] = useState(false);
  const [openWebsiteDialog, setOpenWebsiteDialog] = useState(false);
  const [openTableDialog, setOpenTableDialog] = useState(false);
  const [openImportTableDialog, setOpenImportTableDialog] = useState(false);
  const [history, setHistory] = useState(knowledgeBase?.history);
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [file, setFile] = useState<any>();
  const [inputType, setInputType] = useState("Add text");
  const [isAddingKnowledgeBase, setIsAddingKnowledgeBase] = useState(false); // Loading state
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [content, setContent] = useState<any>("");
  const [severity, setSeverity] = useState<any>(); //severity of snackbar
  const handleAddKnowledgeClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAddKnowledgeAnchor(event.currentTarget);
  };

  const handleAddKnowledgeClose = () => {
    setAddKnowledgeAnchor(null);
  };
  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };
  const handleMoreClose = () => {
    setMoreMenuAnchor(null);
  };

  const handleMenuItemClick = (option: string) => {
    handleAddKnowledgeClose();
    setInputType(option);
    switch (option) {
      case "Add file":
        setOpenFileDialog(true);
        break;
      case "Add text":
        setOpenTextDialog(true);
        break;
      case "Add Q&A":
        setOpenQADialog(true);
        break;
      case "Add website":
        setOpenWebsiteDialog(true);
        break;
      case "Add table":
        setOpenTableDialog(true);
        break;
      case "Import table":
        setOpenImportTableDialog(true);
        break;
    }
  };

  const addKnowledgeOptions = [
    "Add file",
    "Add text",
    "Add Q&A",
    "Add website",
    "Add table",
    "Import table",
  ];

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setIsSnackbarOpen(false);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const addKnowledgeBase = async () => {
    setIsAddingKnowledgeBase(true);
    // Create FormData to send to the API
    const formData = new FormData();
    formData.append("sourceType", inputType);
    formData.append("projectId", knowledgeBase.projectId);
    if (inputType == "Add Q&A") {
      formData.append("question", question);
      formData.append("answer", answer);
    } else if (inputType == "Add text") {
      formData.append("textContent", text);
    } else if (inputType == "Add website") {
      formData.append("url", websiteUrl);
    } else if (inputType == "Add file") {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL as string
        }/knowledge-base/add-knowledge-base`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setIsAddingKnowledgeBase(false);
        setIsSnackbarOpen(true);
        setSeverity("success");
        setMessage(response.data.message);
        setHistory(response.data.knowledgeBase.history);
      } else {
        setIsAddingKnowledgeBase(false);
        setIsSnackbarOpen(true);
        setSeverity("error");
        setMessage(response.data.message); // Display error message
      }
    } catch (error: any) {
      setIsAddingKnowledgeBase(false);
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage(error.response ? error.response.data.message : error.message); // Display error message
      console.error("Error creating agent:", error);
    } finally {
      if (inputType == "Add text") {
        setOpenTextDialog(false);
      } else if (inputType == "Add Q&A") {
        setOpenQADialog(false);
      } else if (inputType == "Add website") {
        setOpenWebsiteDialog(false);
      } else if (inputType == "Add file") {
        setOpenFileDialog(false);
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "20px",
          p: 3,
          mb: 3,
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
          <Typography variant="h6" fontWeight="normal" color="#111827" flex={1}>
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
              "&:hover": {
                bgcolor: "#E5E7EB",
              },
            }}
          >
            Add knowledge
          </Button>
        </Box>

        <Box>
          {history?.map(
            (historyData: {
              sourceType: string;
              addedContent: string | any[];
              url: any;
            }) => {
              return (
                <Box
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
                      label={`${historyData.sourceType}: ${
                        historyData.sourceType === "Add file"
                          ? historyData.addedContent.slice(0, 13)
                          : historyData.sourceType === "Add website"
                          ? historyData.url
                          : historyData.addedContent.slice(0, 20)
                      }`}
                      sx={{
                        backgroundColor: "#E5E7EB",
                        color: "#374151",
                        fontSize: "0.875rem",
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "#ECFDF5",
                        color: "#10B981",
                        px: 2,
                        py: 0.5,
                        borderRadius: "16px",
                        fontSize: "0.875rem",
                      }}
                    >
                      Ready
                    </Box>
                    <IconButton size="small">
                      <EditIcon sx={{ color: "#1A83FF", fontSize: 20 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setShowContentDialog(true);
                        setContent(historyData.addedContent as any);
                      }}
                    >
                      <MoreVertIcon sx={{ color: "#6B7280" }} />
                    </IconButton>
                  </Box>
                </Box>
              );
            }
          )}

          {/* <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FolderOutlinedIcon sx={{ color: '#6B7280' }} />
          <Typography sx={{ color: '#6B7280' }}>
            Family inventory - Hoot 15144 Default 1734296285.csv
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreVertIcon sx={{ color: '#6B7280' }} />
        </IconButton>
      </Box> */}
        </Box>
      </Box>

      {/* <Box
        sx={{
          bgcolor: "black",
          borderRadius: "15px",
          p: 3,
          mb: 3,
        }}
      >
        <Typography sx={{ color: "white", mb: 2, fontSize: "1.1rem" }}>
          Inventory feed URL
        </Typography>
        <Typography sx={{ color: "#9CA3AF", mb: 1.5, fontSize: "0.875rem" }}>
          Enter URL
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Inventory feed URL"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#111827",
                borderRadius: "8px",
                color: "white",
                "& fieldset": {
                  borderColor: "#374151",
                },
                "&:hover fieldset": {
                  borderColor: "#4B5563",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1A83FF",
                },
              },
              "& input::placeholder": {
                color: "#6B7280",
                opacity: 1,
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1A83FF",
              borderRadius: "100px",
              textTransform: "none",
              px: 4,
              "&:hover": {
                bgcolor: "#1666CC",
              },
            }}
          >
            Feed
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <Typography>
              Family inventory - Hoot 15144 Default 1734296285.csv
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  bgcolor: "#065F46",
                  color: "#34D399",
                  px: 2,
                  py: 0.5,
                  borderRadius: "16px",
                  fontSize: "0.875rem",
                }}
              >
                Ready
              </Box>
              <Button
                size="small"
                sx={{
                  color: "white",
                  bgcolor: "#374151",
                  textTransform: "none",
                  borderRadius: "100px",
                  "&:hover": {
                    bgcolor: "#4B5563",
                  },
                }}
              >
                View
              </Button>
              <IconButton size="small">
                <EditIcon sx={{ color: "#1A83FF", fontSize: 20 }} />
              </IconButton>
              <IconButton size="small" onClick={handleMoreClick}>
                <MoreVertIcon sx={{ color: "#6B7280" }} />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#6B7280",
            }}
          >
            <Typography>
              Family inventory - Hoot 15144 Default 1734296285.csv
            </Typography>
            <IconButton size="small" onClick={handleMoreClick}>
              <MoreVertIcon sx={{ color: "#6B7280" }} />
            </IconButton>
          </Box>
        </Box>
      </Box> */}

      <Menu
        anchorEl={addKnowledgeAnchor}
        open={Boolean(addKnowledgeAnchor)}
        onClose={handleAddKnowledgeClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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
            key={option}
            onClick={() => handleMenuItemClick(option)}
            sx={{
              py: 1.5,
              color: "#6B7280",
              "&:hover": {
                bgcolor: "#F9FAFB",
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "10px",
            minWidth: "160px",
            boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <MenuItem onClick={handleMoreClose}>Edit</MenuItem>
        <MenuItem onClick={handleMoreClose}>Delete</MenuItem>
      </Menu>

      {/* Add File Dialog */}
      <Dialog
        open={openFileDialog}
        onClose={() => setOpenFileDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
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
          <Typography variant="h6">Add File</Typography>
          <IconButton onClick={() => setOpenFileDialog(false)}>
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
              sx={{
                borderRadius: "100px",
                textTransform: "none",
              }}
              component="label"
            >
              Browse files
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            {file && (
              <Typography
                sx={{
                  mt: 2,
                  color: "#374151",
                  fontWeight: "bold",
                }}
              >
                Selected File: {file.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          {file && (
            <Button
              disabled={isAddingKnowledgeBase}
              variant="contained"
              color="primary"
              onClick={addKnowledgeBase}
              sx={{ borderRadius: "10px" }}
            >
              {isAddingKnowledgeBase ? "Uploading..." : "Upload"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={showContentDialog}
        onClose={() => setShowContentDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
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
          <Typography variant="h6">Agent Content</Typography>
          <IconButton onClick={() => setShowContentDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>{content}</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setShowContentDialog(false)}
            sx={{
              color: "#6B7280",
              textTransform: "none",
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            Cancel
          </Button>
          {/* <Button
      onClick={addKnowledgeBase}
      disabled={isAddingKnowledgeBase}
        variant="contained"
        sx={{
          bgcolor: '#1A83FF',
          borderRadius: '100px',
          textTransform: 'none',
          px: 4,
          '&:hover': { bgcolor: '#1666CC' }
        }}
      >
      {isAddingKnowledgeBase && inputType=="Add text"?"Adding Text...":"Add Text"}
      </Button> */}
        </DialogActions>
      </Dialog>

      {/* Add Text Dialog */}
      <Dialog
        open={openTextDialog}
        onClose={() => setOpenTextDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
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
          <Typography variant="h6">Add Text</Typography>
          <IconButton onClick={() => setOpenTextDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setText(e.target.value);
            }}
            fullWidth
            multiline
            rows={4}
            placeholder="Enter your text here..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setOpenTextDialog(false)}
            sx={{
              color: "#6B7280",
              textTransform: "none",
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={addKnowledgeBase}
            disabled={isAddingKnowledgeBase}
            variant="contained"
            sx={{
              bgcolor: "#1A83FF",
              borderRadius: "100px",
              textTransform: "none",
              px: 4,
              "&:hover": { bgcolor: "#1666CC" },
            }}
          >
            {isAddingKnowledgeBase && inputType == "Add text"
              ? "Adding Text..."
              : "Add Text"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Q&A Dialog */}
      <Dialog
        open={openQADialog}
        onClose={() => setOpenQADialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
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
          <Typography variant="h6">Add Q&A</Typography>
          <IconButton onClick={() => setOpenQADialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            fullWidth
            label="Question"
            placeholder="Enter your question"
            sx={{ mt: 2, mb: 3 }}
          />
          <TextField
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            fullWidth
            multiline
            rows={4}
            label="Answer"
            placeholder="Enter your answer"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setOpenQADialog(false)}
            sx={{
              color: "#6B7280",
              textTransform: "none",
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={addKnowledgeBase}
            disabled={isAddingKnowledgeBase}
            variant="contained"
            sx={{
              bgcolor: "#1A83FF",
              borderRadius: "100px",
              textTransform: "none",
              px: 4,
              "&:hover": { bgcolor: "#1666CC" },
            }}
          >
            {isAddingKnowledgeBase ? "Adding Q&A" : "Add Q&A"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Website Dialog */}
      <Dialog
        open={openWebsiteDialog}
        onClose={() => setOpenWebsiteDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
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
          <Typography variant="h6">Add Website</Typography>
          <IconButton onClick={() => setOpenWebsiteDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setWebsiteUrl(e.target.value);
            }}
            fullWidth
            label="Website URL"
            placeholder="Enter website URL"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setOpenWebsiteDialog(false)}
            sx={{
              color: "#6B7280",
              textTransform: "none",
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isAddingKnowledgeBase}
            onClick={addKnowledgeBase}
            variant="contained"
            sx={{
              bgcolor: "#1A83FF",
              borderRadius: "100px",
              textTransform: "none",
              px: 4,
              "&:hover": { bgcolor: "#1666CC" },
            }}
          >
            {isAddingKnowledgeBase ? "Crawling..." : "Add Website"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Table Dialog */}
      <Dialog
        open={openTableDialog}
        onClose={() => setOpenTableDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
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
          <Typography variant="h6">Add Table</Typography>
          <IconButton onClick={() => setOpenTableDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Button
              startIcon={<AddIcon />}
              sx={{
                color: "#1A83FF",
                textTransform: "none",
                mb: 2,
              }}
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
            onClick={() => setOpenTableDialog(false)}
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

      {/* Import Table Dialog */}
      <Dialog
        open={openImportTableDialog}
        onClose={() => setOpenImportTableDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
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
          <Typography variant="h6">Import Table</Typography>
          <IconButton onClick={() => setOpenImportTableDialog(false)}>
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
              sx={{
                borderRadius: "100px",
                textTransform: "none",
              }}
            >
              Browse files
            </Button>
            <Typography sx={{ color: "#6B7280", mt: 2, fontSize: "0.875rem" }}>
              Supported formats: CSV, Excel
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setOpenImportTableDialog(false)}
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
            Import Table
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: "100%",
            fontFamily: "Velyra", // Optional: Custom font styling
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
