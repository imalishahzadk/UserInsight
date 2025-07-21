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
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import agentService from "@/services/api/user/agent-service";
import useNotification from "@/hooks/shared/use-notification";
import { IBotSettingFormData } from "../../AgentDetailPage";

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

const BotConvoSuggestions = ({
  botSuggestions,
  handleChangeFormData,
}: {
  botSuggestions: string[];
  handleChangeFormData: (key: string, value: string[]) => void;
}) => {
  const [openAddSuggestionDialog, setOpenAddSuggestionDialog] =
    useState<boolean>(false);

  const [isAddingNewSuggestion, setIsAddingNewSuggestion] =
    useState<boolean>(false);

  const [newSuggestion, setNewSuggestion] = useState<string>("");

  const addNewSuggestion = async () => {
    // setIsAddingNewSuggestion(true);
    // const response = await agentService.addSuggestion(agentId, {
    //   newSuggestion,
    // });
    // setIsAddingNewSuggestion(false);

    // if (response.success) {
    //   dispatch(
    //     agentActions.handleChangeAppearence({
    //       key: "suggestions",
    //       value: [...botSuggestions, newSuggestion],
    //     })
    //   );
    //   notification.success(response.message);
    // } else {
    //   notification.error(response.message);
    // }

    handleChangeFormData("suggestions", [...botSuggestions, newSuggestion]);

    setOpenAddSuggestionDialog(false);
  };

  const handleDelete = (index: number) => {
    const filteredSuggestions = botSuggestions.filter(
      (suggestion, i) => i !== index
    );

    handleChangeFormData("suggestions", [...filteredSuggestions]);
  };

  return (
    <>
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
              onClick={() => handleDelete(index)}
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
    </>
  );
};

export default function AppearanceTab({
  agentId,
  formData,
  setFormData,
  refetch,
}: {
  agentId: string;
  formData: IBotSettingFormData;
  setFormData: (state: IBotSettingFormData) => void;
  refetch: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notification = useNotification();

  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const handleChangeFormData = (
    key: string,
    value: string | number | string[]
  ) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleDropBotImage = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleBotImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const saveChanges = async () => {
    setIsSavingChanges(true);
    const response = await agentService.updateSettings(agentId, formData);
    setIsSavingChanges(false);

    if (response.success) {
      notification.success(response.message);
      if (refetch) {
        refetch();
      }
    } else {
      notification.error(response.message);
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
                  variant={formData.theme === theme ? "contained" : "outlined"}
                  onClick={() => handleChangeFormData("theme", theme)}
                  startIcon={
                    theme === "light" ? <LightModeIcon /> : <DarkModeIcon />
                  }
                  sx={{
                    height: "100px",
                    textTransform: "none",
                    borderColor: "rgba(0, 229, 255, 0.2)",
                    backgroundColor:
                      formData.theme === theme ? "#00e5ff" : "transparent",
                    color: formData.theme === theme ? "#0a0f1e" : "#fff",
                    "&:hover": {
                      backgroundColor:
                        formData.theme === theme
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

        {/* Appearance Settings */}
        <Box sx={{ mb: 3, bgcolor: "#0a0f1e", p: 3, borderRadius: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "#fff", fontWeight: 500 }}
              >
                Font size
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.fontSize}
                onChange={(e) =>
                  handleChangeFormData("fontSize", Number(e.target.value))
                }
                sx={inputStyles}
                SelectProps={{
                  native: true,
                }}
              >
                <option value={14}>Small</option>
                <option value={16}>Medium</option>
                <option value={18}>Large</option>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "#fff", fontWeight: 500 }}
              >
                Primary Color
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="color"
                value={formData.primaryColor || "#00e5ff"}
                onChange={(e) =>
                  handleChangeFormData("primaryColor", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    borderRadius: "8px",
                    color: "#fff",
                    backgroundColor: formData.primaryColor || "#00e5ff",
                    border: "1px solid rgba(0, 229, 255, 0.2)",
                    "&:hover": {
                      borderColor: "rgba(0, 229, 255, 0.4)",
                    },
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "& input": {
                      cursor: "pointer",
                      padding: "8px",
                      height: "30px",
                      width: "100%",
                      backgroundColor: "transparent",
                    },
                    "&:focus-within": {
                      borderColor: "#00e5ff",
                    },
                  },
                }}
              />
            </Grid>
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
            defaultValue={formData.name}
            onChange={(e) => handleChangeFormData("name", e.target.value)}
            sx={{ mb: 3, ...inputStyles }}
          />

          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
            Subtitle (optional)
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter subtitle"
            defaultValue={formData.subTitle}
            onChange={(e) => handleChangeFormData("subTitle", e.target.value)}
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
                value={formData.width}
                onChange={(e) =>
                  handleChangeFormData("width", Number(e.target.value))
                }
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
                value={formData.height}
                onChange={(e) =>
                  handleChangeFormData("height", Number(e.target.value))
                }
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
                {formData.image ? (
                  <img
                    src={
                      typeof formData.image === "object"
                        ? URL.createObjectURL(formData.image)
                        : formData.image
                    }
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
                onDrop={handleDropBotImage}
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
                  onChange={handleBotImgUpload}
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
        <BotConvoSuggestions
          botSuggestions={formData.suggestions}
          handleChangeFormData={handleChangeFormData}
        />
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
      {/* <Box sx={{ flex: 1 }}>
        <ChatPreview />
      </Box> */}
    </Box>
  );
}
