"use client";
import { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import ChatPreview from "./components/ChatPreview";
import agentService from "@/services/api/user/agent-service";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    height: "45px",
    borderRadius: "8px",
    color: "#fff",
    backgroundColor: "#0a0f1e",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    "&:hover": {
      borderColor: "rgba(0, 229, 255, 0.4)",
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00e5ff",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
      opacity: 1,
    },
  },
};

interface AppearanceTabProps {
  botAppearance: any;
  suggestions: any;
  agentId: string;
}

export default function AppearanceTab({
  botAppearance,
  suggestions,
  agentId,
}: AppearanceTabProps) {
  const [conversationId, setConversationId] = useState("");
  const [settings, setSettings] = useState(botAppearance);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [botSuggestions, setSuggestions] = useState<string[]>(suggestions);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<any>("");
  const [isAddingNewSuggestion, setIsAddingNewSuggestion] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const [openAddSuggestionDialog, setOpenAddSuggestionDialog] = useState(false);

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewSuggestion = async () => {
    setIsAddingNewSuggestion(true);
    const response = await agentService.addSuggestion(agentId, {
      newSuggestion,
    });
    setIsAddingNewSuggestion(false);

    if (response.success) {
      setIsSnackbarOpen(true);
      setMessage(response.message);
      setSeverity("success");
      setSuggestions([...botSuggestions, newSuggestion]);
    } else {
      setIsSnackbarOpen(true);
      setMessage(response.message);
      setSeverity("error");
    }
    setOpenAddSuggestionDialog(false);
  };

  const saveChanges = async () => {
    setIsSavingChanges(true);
    const response = await agentService.updateSettings(agentId, { settings });
    setIsSavingChanges(false);

    if (response.success) {
      setIsSnackbarOpen(true);
      setMessage(response.message);
      setSeverity("success");
    } else {
      setIsSnackbarOpen(true);
      setMessage(response.message);
      setSeverity("error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 3,
        bgcolor: "#070b15",
        minHeight: "100vh",
      }}
    >
      {/* Left Panel - Settings */}
      <Box
        sx={{
          width: "500px",
          p: 3,
          color: "#fff",
          bgcolor: "#0a0f1e",
          borderRadius: "16px",
          border: "1px solid rgba(0, 229, 255, 0.2)",
        }}
      >
        {/* Theme Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
            Theme
          </Typography>
          <Grid container spacing={2}>
            {["light", "dark"].map((theme) => (
              <Grid item xs={6} key={theme}>
                <Button
                  fullWidth
                  variant={settings.theme === theme ? "contained" : "outlined"}
                  onClick={() => handleSettingChange("theme", theme)}
                  startIcon={
                    theme === "light" ? <LightModeIcon /> : <DarkModeIcon />
                  }
                  sx={{
                    height: "100px",
                    textTransform: "none",
                    borderColor: "rgba(0, 229, 255, 0.2)",
                    backgroundColor:
                      settings.theme === theme ? "#00e5ff" : "transparent",
                    color: settings.theme === theme ? "#0a0f1e" : "#fff",
                    "&:hover": {
                      backgroundColor:
                        settings.theme === theme
                          ? "rgba(0, 229, 255, 0.8)"
                          : "rgba(0, 229, 255, 0.1)",
                      borderColor: "rgba(0, 229, 255, 0.4)",
                    },
                  }}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Basic Settings */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
            Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter name"
            value={settings.title}
            onChange={(e) => handleSettingChange("title", e.target.value)}
            sx={{ mb: 3, ...inputStyles }}
          />

          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
            Subtitle (optional)
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter subtitle"
            value={settings.description}
            onChange={(e) => handleSettingChange("description", e.target.value)}
            sx={{ mb: 3, ...inputStyles }}
          />
        </Box>

        {/* Widget Size Controls */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
            Widget Size
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                }}
              >
                Width (px)
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={settings.width}
                onChange={(e) => handleSettingChange("width", e.target.value)}
                sx={inputStyles}
                inputProps={{ min: 320, max: 600 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                }}
              >
                Height (px)
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={settings.height}
                onChange={(e) => handleSettingChange("height", e.target.value)}
                sx={inputStyles}
                inputProps={{ min: 400, max: 800 }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Upload Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
            Upload agent image
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                }}
              >
                {settings.imageUrl ? (
                  <img
                    src={settings.imageUrl}
                    alt="Agent"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      bgcolor: "#0a0f1e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                      No image
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                sx={{
                  border: "1px dashed rgba(0, 229, 255, 0.2)",
                  borderRadius: "8px",
                  p: 2,
                  textAlign: "center",
                  bgcolor: "#0a0f1e",
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "rgba(0, 229, 255, 0.4)",
                    backgroundColor: "rgba(0, 229, 255, 0.05)",
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "14px",
                    mb: 1,
                  }}
                >
                  Drag your file(s) to start uploading
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "14px",
                    mb: 1,
                  }}
                >
                  OR
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderColor: "rgba(0, 229, 255, 0.2)",
                    color: "#fff",
                    "&:hover": {
                      borderColor: "rgba(0, 229, 255, 0.4)",
                      bgcolor: "rgba(0, 229, 255, 0.05)",
                    },
                  }}
                >
                  Browse files
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Conversation Starters */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
            Conversation Starters
          </Typography>
          {botSuggestions.map((suggestion, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                border: "1px solid rgba(0, 229, 255, 0.2)",
                borderRadius: "8px",
                bgcolor: "#0a0f1e",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0, 229, 255, 0.1)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {suggestion}
              </Typography>
              <IconButton
                sx={{
                  color: "#ef4444",
                  "&:hover": {
                    bgcolor: "rgba(239, 68, 68, 0.1)",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenAddSuggestionDialog(true)}
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.05)",
              },
            }}
          >
            Add Suggestion
          </Button>
        </Box>

        {/* Save Button */}
        <Button
          onClick={saveChanges}
          disabled={isSavingChanges}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#00e5ff",
            color: "#0a0f1e",
            borderRadius: "8px",
            textTransform: "none",
            height: "45px",
            fontWeight: "600",
            "&:hover": {
              bgcolor: "rgba(0, 229, 255, 0.8)",
            },
            "&:disabled": {
              bgcolor: "rgba(0, 229, 255, 0.5)",
              color: "#0a0f1e",
            },
          }}
        >
          {isSavingChanges ? "Saving Changes..." : "Save Changes"}
        </Button>
      </Box>

      {/* Right Panel - Preview */}
      <Box sx={{ flex: 1 }}>
        <ChatPreview
          conversationId={conversationId}
          suggestions={botSuggestions}
          projectId={agentId}
          settings={settings}
          image={image}
        />
      </Box>

      {/* Add Suggestion Dialog */}
      <Dialog
        open={openAddSuggestionDialog}
        onClose={() => setOpenAddSuggestionDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            bgcolor: "#0a0f1e",
            color: "#fff",
            border: "1px solid rgba(0, 229, 255, 0.2)",
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
          <Typography variant="h6">Add Suggestion</Typography>
          <IconButton
            onClick={() => setOpenAddSuggestionDialog(false)}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            onChange={(e) => setNewSuggestion(e.target.value)}
            fullWidth
            multiline
            rows={4}
            placeholder="Enter your suggestion here..."
            sx={{
              ...inputStyles,
              "& .MuiOutlinedInput-root": {
                ...inputStyles["& .MuiOutlinedInput-root"],
                height: "auto",
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenAddSuggestionDialog(false)}
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={addNewSuggestion}
            disabled={isAddingNewSuggestion}
            variant="contained"
            sx={{
              bgcolor: "#00e5ff",
              color: "#0a0f1e",
              borderRadius: "8px",
              textTransform: "none",
              px: 4,
              fontWeight: "600",
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.8)",
              },
              "&:disabled": {
                bgcolor: "rgba(0, 229, 255, 0.5)",
                color: "#0a0f1e",
              },
            }}
          >
            {isAddingNewSuggestion ? "Adding..." : "Add Now"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={severity}
          sx={{
            width: "100%",
            borderRadius: "8px",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
