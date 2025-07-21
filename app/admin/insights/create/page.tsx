"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import agentService from "@/services/api/client/agent-service"; // Change this service for insight
import { C_ALL_INSIGHTS_ROUTE } from "@/core/routes"; // Change this route to insights route
import Link from "next/link";
import { TagsInput } from "react-tag-input-component";

export default function CreateInsightPage() {
  const router = useRouter();

  // State variables for form data
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true); // Default to active
  const [siteUrl, setSiteUrl] = useState("");
  const [config, setConfig] = useState({
    enableScrollTracking: true,
    enableClickTracking: true,
    enableFormTracking: true,
    enableLeadPopup: false,
  });
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>();
  const [isCreatingInsight, setIsCreatingInsight] = useState(false); // Loading state
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<any>("");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return; // Prevent closing when clicking outside
    setIsSnackbarOpen(false);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Create a URL for the image preview
    }
  };

  const handleCreate = async () => {
    // Create FormData to send to the API
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("description", description);
    formData.append("isActive", isActive.toString());
    formData.append("siteUrl", siteUrl);
    formData.append("config", JSON.stringify(config));
    if (image) formData.append("image", image);

    setIsCreatingInsight(true);
    const response = await agentService.createInsightAgent(formData); // Call the new insight service
    setIsCreatingInsight(false);

    if (response.success) {
      setIsSnackbarOpen(true);
      setSeverity("success");
      setMessage(response.message);
      setTimeout(() => {
        router.push(C_ALL_INSIGHTS_ROUTE); // Redirect to insights list page
      }, 1000);
    } else {
      setIsCreatingInsight(false);
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage(response.message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto", color: "white" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 600,

            color: "#000",
          }}
        >
          Create new Insight
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#000000",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
            },
          }}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </Box>
      <Box
        // className="box-style"
        sx={{
          background: "white",
          p: 4,
          borderRadius: "15px",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={3}>
          {/* Name Input */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 1.5, fontWeight: 500, color: "#2d3137" }}>
              Name
            </Typography>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Insight Name"
              InputProps={{
                sx: {
                  height: "60px",
                  color: "#2d3137",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                    borderWidth: "2px",
                  },
                  borderRadius: "12px",
                  "& input": {
                    pl: 2,
                  },
                },
              }}
            />
          </Grid>

          {/* Role Input */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 1.5, fontWeight: 500, color: "#2d3137" }}>
              Role
            </Typography>
            <TextField
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Customer service representative"
              InputProps={{
                sx: {
                  height: "60px",
                  color: "#2d3137",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                    borderWidth: "2px",
                  },
                  borderRadius: "12px",
                  "& input": {
                    pl: 2,
                  },
                },
              }}
            />
          </Grid>

          {/* Description Input */}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1.5, fontWeight: 500, color: "#2d3137" }}>
              Description
            </Typography>
            <TextField
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the Insight's role and responsibilities"
              InputProps={{
                sx: {
                  height: "60px",
                  color: "#2d3137",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                    borderWidth: "2px",
                  },
                  borderRadius: "12px",
                  "& input": {
                    pl: 2,
                  },
                },
              }}
            />
          </Grid>

          {/* Site URL Input */}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1.5, fontWeight: 500, color: "#2d3137" }}>
              Site URL
            </Typography>
            <TextField
              fullWidth
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://your-site.com"
              InputProps={{
                sx: {
                  height: "60px",
                  color: "#2d3137",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                    borderWidth: "2px",
                  },
                  borderRadius: "12px",
                  "& input": {
                    pl: 2,
                  },
                },
              }}
            />
          </Grid>

          {/* Image upload */}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1.5, fontWeight: 500, color: "#2d3137" }}>
              Insight image (optional)
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              {/* Upload Area */}
              <Box
                sx={{
                  width: "150px",
                  height: "150px",
                  border: "2px dashed #2d3137",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#000000",
                    backgroundColor: "rgba(45, 49, 55, 0.03)",
                  },
                  cursor: "pointer",
                  position: "relative",
                }}
                component="label"
              >
                <input
                  type="file"
                  hidden
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <CloudUploadIcon
                  sx={{
                    fontSize: 32,
                    color: "#2d3137",
                    mb: 1,
                  }}
                />
                <Typography
                  sx={{
                    color: "#2d3137",
                    fontSize: "0.8rem",
                    textAlign: "center",
                    px: 1,
                  }}
                >
                  Upload Image
                </Typography>
              </Box>

              {/* Image Preview */}
              {imageUrl && (
                <Box
                  sx={{
                    width: "150px",
                    height: "150px",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid #2d3137",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      setImageUrl(null);
                    }}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      minWidth: "auto",
                      width: "24px",
                      height: "24px",
                      p: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                  >
                    ✕
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Link href={C_ALL_INSIGHTS_ROUTE}>
                <Button
                  variant="outlined"
                  sx={{
                    height: "48px",
                    borderRadius: "12px",
                    textTransform: "none",
                    borderColor: "#000000",
                    color: "#000000",
                    "&:hover": {
                      borderColor: "#313131",
                      bgcolor: "rgba(66, 133, 244, 0.04)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={handleCreate}
                variant="contained"
                sx={{
                  height: "48px",
                  borderRadius: "12px",
                  color: "white",
                  textTransform: "none",
                  backgroundColor: "#000000",
                }}
                disabled={isCreatingInsight}
              >
                {isCreatingInsight ? "Creating..." : "Create Insight"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for success/error */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
