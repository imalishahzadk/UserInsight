"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import agentService from "@/services/api/user/agent-service";
import { TagsInput } from "react-tag-input-component";

export default function CreateAgentPage() {
  const router = useRouter();

  // State variables for form data
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [personality, setPersonality] = useState("");
  const [leadEmailAddresses, setLeadEmailAddresses] = useState<string[]>([]);
  const [adfXMLLeadEmail, setAdfXMLLeadEmail] = useState<string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>();
  const [isCreatingAgent, setIsCreatingAgent] = useState(false); // Loading state
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

  const handleCancel = () => {
    router.push("/admin/agents");
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
    formData.append("personality", personality);
    formData.append("adfXMLleadEmailAddress", adfXMLLeadEmail);
    formData.append("leadEmailAddresses", JSON.stringify(leadEmailAddresses));
    formData.append("description", description);
    if (image) formData.append("image", image);

    setIsCreatingAgent(true);
    const response = await agentService.createAgent(formData);
    setIsCreatingAgent(false);

    if (response.success) {
      setIsSnackbarOpen(true);
      setSeverity("success");
      setMessage(response.message);
      setTimeout(() => {
        router.push("/admin/agents");
      }, 1000);
    } else {
      setIsCreatingAgent(false);
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage(response.message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto", color: "white" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: "white",
        }}
      >
        Create new agent
      </Typography>

      <Box
        className="box-style"
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: "15px",
          "& .MuiTextField-root": {
            mb: 3,
          },
        }}
      >
        {/* Name Input */}
        <Typography sx={{ mb: 1.5, fontWeight: 500 }}>Name</Typography>
        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Agent Name"
          InputProps={{
            sx: {
              height: "60px",
              bgcolor: "#2d3137",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F5F6FA",
                borderWidth: "1px",
              },
              borderRadius: "16px",
              "& input": {
                pl: 2,
              },
            },
          }}
        />

        {/* Role of bot Input */}
        <Typography sx={{ mb: 1.5, mt: 2, fontWeight: 500 }}>
          Role of bot
        </Typography>
        <TextField
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Customer service representative"
          InputProps={{
            sx: {
              height: "60px",
              bgcolor: "#2d3137",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F5F6FA",
                borderWidth: "1px",
              },
              borderRadius: "16px",
              "& input": {
                pl: 2,
              },
            },
          }}
        />

        {/* Personality Input */}
        <Typography sx={{ mb: 1.5, mt: 2, fontWeight: 500 }}>
          Personality
        </Typography>
        <TextField
          fullWidth
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          placeholder="Friendly and responsive"
          InputProps={{
            sx: {
              height: "60px",
              bgcolor: "#2d3137",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F5F6FA",
                borderWidth: "1px",
              },
              borderRadius: "16px",
              "& input": {
                pl: 2,
              },
            },
          }}
        />

        {/* Leads email addresses Input */}
        <Typography sx={{ mb: 1.5, mt: 2, fontWeight: 500 }}>
          Lead email addresses
        </Typography>

        <div className="mb-8 lead-multi-email-input">
          <TagsInput
            value={leadEmailAddresses}
            onChange={setLeadEmailAddresses}
            name="leadEmailAddresses"
            placeHolder="Enter lead email addresses"
            classNames={{
              tag: "!bg-[#090f1d] font-medium !pl-3",
            }}
          />
        </div>

        {/*ADFXML Leads email address Input */}
        <Typography sx={{ mb: 1.5, mt: 2, fontWeight: 500 }}>
          ADFXML Lead email address
        </Typography>
        <TextField
          fullWidth
          value={adfXMLLeadEmail}
          onChange={(e) => setAdfXMLLeadEmail(e.target.value)}
          placeholder="Enter here..."
          InputProps={{
            sx: {
              height: "60px",
              bgcolor: "#2d3137",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F5F6FA",
                borderWidth: "1px",
              },
              borderRadius: "16px",
              "& input": {
                pl: 2,
              },
            },
          }}
        />

        {/* Description Input */}
        <Typography sx={{ mb: 1.5, mt: 2, fontWeight: 500 }}>
          Description
        </Typography>
        <TextField
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the agent's role and responsibilities"
          InputProps={{
            sx: {
              height: "60px",
              bgcolor: "#2d3137",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F5F6FA",
                borderWidth: "1px",
              },
              borderRadius: "16px",
              "& input": {
                pl: 2,
              },
            },
          }}
        />

        {/* Bot image upload */}
        <Typography sx={{ mb: 1.5, mt: 2, fontWeight: 500 }}>
          Bot image (optional)
        </Typography>
        <Box
          sx={{
            border: "1px dashed #F5F6FA",
            borderRadius: "15px",
            p: 3,
            textAlign: "center",
            mb: 3,
            bgcolor: "#2d3137",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <CloudUploadIcon sx={{ fontSize: 48, color: "#00e5ff" }} />
            <Typography sx={{ fontWeight: 500, mb: 1 }}>
              Upload agent image
            </Typography>
          </Box>

          {imageUrl && (
            <Box
              sx={{
                maxWidth: "150px",
                margin: "auto",
                mb: 2,
              }}
            >
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Box>
          )}

          <Button
            variant="outlined"
            component="label"
            sx={{
              height: "48px",
              borderRadius: "100px",
              textTransform: "none",
              borderColor: "#00e5ff",
              color: "#00e5ff",
              "&:hover": {
                borderColor: "#00e5ff",
                bgcolor: "rgba(66, 133, 244, 0.04)",
              },
            }}
          >
            Browse files
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              height: "48px",
              width: "120px",
              borderRadius: "100px",
              textTransform: "none",
              borderColor: "#F5F6FA",
              color: "#6B7280",
              "&:hover": {
                borderColor: "#E5E7EB",
                bgcolor: "#F9FAFB",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isCreatingAgent}
            onClick={handleCreate}
            sx={{
              height: "48px",
              width: "150px",
              borderRadius: "100px",
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#00e5ff",
              "&:hover": {
                bgcolor: "#00e5ff",
              },
            }}
          >
            {isCreatingAgent ? "Creating Agent..." : "Create Now"}
          </Button>
        </Box>
      </Box>
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
            fontFamily: "Velyra",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
