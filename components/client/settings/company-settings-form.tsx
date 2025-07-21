"use client";

import { useRef } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import useCompanySettingsForm from "@/hooks/client/settings/use-company-settings-form";
import { renderConditionalImage } from "@/utils";
import Spinner from "@/components/shared/ui/Spinner";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    height: "48px",
    fontSize: 14,
    borderRadius: "12px",
    bgcolor: "#fff",
    color: "#333",
    border: "1px solid #e0e0e0",
    "&:hover": {
      borderColor: "#bdbdbd",
    },
    "&.Mui-focused": {
      borderColor: "#1976d2",
    },
  },
};

export default function CompanySettingsForm() {
  const {
    formGroup,
    handleChange,
    handleDragOver,
    handleDrop,
    handleFileUpload,
    handleSubmit,
    logo,
    handleCancel,
    isSubmitting,
  } = useCompanySettingsForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 4 },
          my: 4,
          borderRadius: "16px",
          bgcolor: "#7367f033",
          border: "1px solid #7367f033",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo Upload */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            className="text-white"
            gutterBottom
          >
            Company Logo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "12px",
                  border: "1px dashed #7367f033",
                  overflow: "hidden",
                  bgcolor: "#7367f033",
                }}
              >
                {logo ? (
                  <img
                    src={renderConditionalImage(logo)}
                    alt="Logo"
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9e9e9e",
                      fontSize: 12,
                    }}
                  >
                    No logo
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: "2px dashed #7367f033",
                  borderRadius: "12px",
                  p: 2,
                  textAlign: "center",
                  bgcolor: "#7367f033",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                <Typography variant="body2" className="text-white">
                  Drag and drop logo here or click to browse
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Input Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Name"
              placeholder="Enter company name"
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
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#fff",
                  },
                },
              }}
              value={formGroup.name}
              name="name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address"
              placeholder="Enter address"
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
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#fff",
                  },
                },
              }}
              value={formGroup.address}
              name="address"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="State"
              placeholder="Enter state"
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
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#fff",
                  },
                },
              }}
              value={formGroup.state}
              name="state"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Zip Code"
              placeholder="Enter zip code"
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
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#fff",
                  },
                },
              }}
              value={formGroup.zipCode}
              name="zipCode"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderColor: "#7367f0",
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
            type="submit"
            disabled={isSubmitting}
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
            {isSubmitting ? <Spinner size={18} /> : "Save"}
          </Button>
        </Box>
      </Paper>
    </form>
  );
}
