"use client";

import { useRef } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import useCompanySettingsForm from "@/hooks/admin/settings/use-company-settings-form";
import { renderConditionalImage } from "@/utils";
import Spinner from "@/components/shared/ui/Spinner";

const inputStyles = {
  flex: 1,

  "& .MuiInputBase-root": {
    height: "48px",

    borderRadius: "12px",
    border: "1px solid #7367f033",
    backdropFilter: "blur(10px)",
    "&:hover": {
      borderColor: "#7367f033",
    },
    "&:focus-within": {
      borderColor: "#7367f033",
      boxShadow:
        "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
    },
  },
  "& fieldset": { border: "none" },
  "& input": {
    color: "#fff",
    "&::placeholder": {
      color: "rgba(245, 245, 245, 0.664)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(245, 245, 245, 0.664)",
    "&.Mui-focused": {
      color: "#7367f0",
    },
  },
};

export default function CompanyTab() {
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
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "12px",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        {/* Logo Section */}
        <Typography variant="h6" fontWeight={600} mb={3} color="#fff">
          Company Logo
        </Typography>
        <Grid container spacing={3} alignItems="center" mb={4}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #7367f033",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1e1e3266",
              }}
            >
              {logo ? (
                <img
                  src={renderConditionalImage(logo)}
                  alt="Company Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography color="#fff" variant="body2">
                  No Logo
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                p: 2,
                border: "1px dashed #7367f033",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#1e1e3266",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#1e1e326e",
                  borderColor: "#7267f072",
                },
              }}
            >
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
              />
              <Typography variant="body2" color="#fff" mb={1}>
                Drag & drop your logo here, or click to browse
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderColor: "#7367f0",
                  color: "#7367f0",
                  "&:hover": {
                    borderColor: "rgba(115, 103, 240, 0.03)",
                  },
                }}
              >
                Browse Files
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Form Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company Name"
              placeholder="Enter company name"
              name="name"
              value={formGroup.name}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              placeholder="Enter company address"
              name="address"
              value={formGroup.address}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="State"
              placeholder="Enter state"
              name="state"
              value={formGroup.state}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Zip Code"
              placeholder="Enter zip code"
              name="zipCode"
              value={formGroup.zipCode}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
            />
          </Grid>
        </Grid>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              borderColor: "#7367f0",
              color: "#7367f0",
              "&:hover": {
                borderColor: "rgba(115, 103, 240, 0.03)",
              },
            }}
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{
              textTransform: "none",
              backgroundColor: "#7367f0",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#7367f0",
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
