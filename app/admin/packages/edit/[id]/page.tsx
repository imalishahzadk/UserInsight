"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import packageService from "@/services/api/admin/package-services";

export default function EditPackagePage() {
  const router = useRouter();
  const { id } = useParams();
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageLimit, setPackageLimit] = useState("");
  const [offerInputs, setOfferInputs] = useState<string[]>([""]);

  const [isCreatingPackage, setIsCreatingPackage] = useState(false); // Loading state
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

  const handleAddMore = () => {
    setOfferInputs([...offerInputs, ""]);
  };

  const handleOfferChange = (index: number, value: string) => {
    const newOffers = [...offerInputs];
    newOffers[index] = value;
    setOfferInputs(newOffers);
  };

  const handleDeleteOffer = (index: number) => {
    const newOffers = offerInputs.filter((_, i) => i !== index);
    setOfferInputs(newOffers);
  };

  const handleSubmit = async () => {
    setIsCreatingPackage(true);
    const datas = {
      name: packageName,
      price: packagePrice,
      duration: packageLimit + "Months",
      offers: offerInputs,
    };
    try {
      const response = await packageService.updatePackage(id as string, datas);
      if (response.success) {
        setIsCreatingPackage(false);
        setIsSnackbarOpen(true);
        setSeverity("success");
        setMessage(response.message);
        setTimeout(() => {
          router.push("/admin/packages"); // Navigate back to the agents list page
        }, 2000);
      } else {
        setIsCreatingPackage(false);
        setIsSnackbarOpen(true);
        setSeverity("error");
        setMessage(response.message);
      }
    } catch (error: any) {
      setIsCreatingPackage(false);
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage(error.response ? error.response.data.message : error.message); // Display error message
      console.error("Error creating user:", error);
    }
  };

  return (
    <Box
      className="inner-box-style"
      sx={{ p: 3, bgcolor: "#1e1e3266", minHeight: "100vh" }}
    >
      <Paper
        className="box-style"
        elevation={0}
        sx={{
          maxWidth: "800px",
          p: 4,
          borderRadius: "15px",
          mx: "auto",
          color: "#fff",
          backgroundColor: "#1e1e3266 !important",
          border: "1px solid #7367f033",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        }}
      >
        <Box
          sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 4, color: "white" }}
        >
          Create package
        </Box>

        {/* Package Details */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            mb: 4,
          }}
        >
          <Box>
            <Box
              sx={{ mb: 1.5, fontWeight: 500, borderRadius: 3, color: "white" }}
            >
              Package name
            </Box>
            <TextField
              fullWidth
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Write here..."
              InputProps={{
                sx: {
                  height: "60px",
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7367f033",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ce9ffc",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cd9ffcb9",
                    borderWidth: "2px",
                  },
                  borderRadius: "12px",
                  "& input": {
                    pl: 2,
                  },
                  "& input::placeholder": {
                    color: "#fff",
                    opacity: 0.7,
                  },
                },
              }}
            />
          </Box>
          <Box>
            <Box sx={{ mb: 1.5, fontWeight: 500, color: "white" }}>
              Package price
            </Box>
            <TextField
              fullWidth
              value={packagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
              placeholder="$00.00"
              InputProps={{
                sx: {
                  height: "60px",
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7367f033",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ce9ffc",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cd9ffcb9",
                    borderWidth: "2px",
                  },
                  borderRadius: "12px",
                  "& input": {
                    pl: 2,
                  },
                  "& input::placeholder": {
                    color: "#fff",
                    opacity: 0.7,
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Package Limit */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 1.5, fontWeight: 500, color: "white" }}>
            Package limit
          </Box>
          <Select
            fullWidth
            value={packageLimit}
            onChange={(e) => setPackageLimit(e.target.value)}
            displayEmpty
            renderValue={(selected) => (selected === "" ? "Month" : selected)}
            sx={{
              height: "60px",
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7367f033",
                borderWidth: "1px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ce9ffc",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#cd9ffcb9",
                borderWidth: "2px",
              },
              borderRadius: "12px",
              "& input": {
                pl: 2,
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#fff",
                opacity: 0.7,
              },
            }}
          >
            <MenuItem value="1">1 Month</MenuItem>
            <MenuItem value="3">3 Months</MenuItem>
            <MenuItem value="6">6 Months</MenuItem>
            <MenuItem value="12">1 Year</MenuItem>
          </Select>
        </Box>

        {/* Package Offers */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 1.5, fontWeight: 500, color: "white" }}>
            Package offers
          </Box>
          {offerInputs.map((offer, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Add"
                value={offer}
                onChange={(e) => handleOfferChange(index, e.target.value)}
                InputProps={{
                  sx: {
                    height: "60px",
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#7367f033",
                      borderWidth: "1px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ce9ffc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cd9ffcb9",
                      borderWidth: "2px",
                    },
                    borderRadius: "12px",
                    "& input": {
                      pl: 2,
                    },
                    "& input::placeholder": {
                      color: "#fff",
                      opacity: 0.7,
                    },
                  },
                }}
              />
              {offerInputs.length > 1 && (
                <IconButton
                  onClick={() => handleDeleteOffer(index)}
                  sx={{
                    color: "white",
                    "&:hover": { bgcolor: "transparent" },
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddMore}
            sx={{
              height: "32px",
              minHeight: "32px",
              color: "#7367f0",
              textTransform: "none",
              borderRadius: "20px",
              bgcolor: "#7267f031", // Lighter blue background
              px: 2,
              "&:hover": {
                bgcolor: "#7267f014",
              },
            }}
          >
            Add more
          </Button>
        </Box>

        {/* Actions */}
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 6 }}
        >
          <Button
            onClick={() => router.back()}
            sx={{
              border: "1px solid #7367f0",
              color: "#7367f0",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "rgba(115, 103, 240, 0.03)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isCreatingPackage}
            sx={{
              background: "#7367f0",
              color: "#fff",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                background: "rgba(115, 103, 240, 0.03)",
              },
            }}
          >
            {isCreatingPackage ? (
              <CircularProgress size={24} sx={{ color: "#7367f0" }} />
            ) : (
              "Publish"
            )}
          </Button>
        </Box>
      </Paper>
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
