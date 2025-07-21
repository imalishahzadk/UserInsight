"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    height: "48px",
    fontSize: 14,
    bgcolor: "#0a0f1e",
    color: "#fff",
    borderRadius: "16px",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "rgba(0, 229, 255, 0.4)",
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused": {
      borderColor: "#00e5ff",
    },
  },
};

interface Industry {
  id: number;
  name: string;
}

export default function BotTab() {
  const [industries, setIndustries] = useState<Industry[]>([
    { id: 1, name: "E-commerce" },
    { id: 2, name: "Healthcare" },
    { id: 3, name: "Real Estate" },
  ]);
  const [newIndustry, setNewIndustry] = useState("");

  const handleAddIndustry = () => {
    if (newIndustry.trim()) {
      setIndustries([
        ...industries,
        { id: industries.length + 1, name: newIndustry.trim() },
      ]);
      setNewIndustry("");
    }
  };

  const handleDeleteIndustry = (industryId: number) => {
    setIndustries(industries.filter((industry) => industry.id !== industryId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddIndustry();
    }
  };

  return (
    <Box>
      <Box sx={{ 
        bgcolor: "#0a0f1e",
        borderRadius: "16px",
        p: 3,
        border: "1px solid rgba(0, 229, 255, 0.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "rgba(0, 229, 255, 0.4)",
          transform: "translateY(-5px)",
          boxShadow: "0 10px 30px rgba(0,229,255,0.1)"
        }
      }}>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600, mb: 3, color: "#fff" }}>
          Bot Industries
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontSize: 14, color: "#fff" }}>
            Add Industry
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Enter industry name"
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={inputStyles}
            />
            <Button
              variant="contained"
              onClick={handleAddIndustry}
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#00e5ff",
                textTransform: "none",
                borderRadius: "16px",
                px: 3,
                "&:hover": {
                  bgcolor: "#00e5ff",
                  opacity: 0.9,
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ mb: 2, fontSize: 14, color: "#fff" }}>
            Current Industries
          </Typography>
          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            p: 2,
            bgcolor: "#070b15",
            borderRadius: "16px",
            minHeight: "100px",
            border: "1px solid rgba(0, 229, 255, 0.2)",
          }}>
            {industries.map((industry) => (
              <Chip
                key={industry.id}
                label={industry.name}
                onDelete={() => handleDeleteIndustry(industry.id)}
                sx={{
                  bgcolor: "#0a0f1e",
                  borderRadius: "16px",
                  color: "#fff",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "rgba(0, 229, 255, 0.4)",
                  },
                  "& .MuiChip-deleteIcon": {
                    color: "#fff",
                    "&:hover": {
                      color: "#00e5ff",
                    },
                  },
                }}
              />
            ))}
            {industries.length === 0 && (
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                No industries added yet
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "100px",
              px: 4,
              py: 1.5,
              fontSize: 14,
              borderColor: "rgba(0, 229, 255, 0.2)",
              color: "rgba(255,255,255,0.7)",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
                bgcolor: "transparent",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#00e5ff",
              textTransform: "none",
              borderRadius: "100px",
              px: 4,
              py: 1.5,
              fontSize: 14,
              "&:hover": {
                bgcolor: "#00e5ff",
                opacity: 0.9,
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}