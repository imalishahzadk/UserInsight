"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CompanyTab from "./components/tabs/CompanyTab"; // You can rename this to SettingsContent

export default function SettingsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0A0F1E",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 6 },
      }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#fff",
            mb: 1,
          }}
        >
          Settings
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", maxWidth: 600 }}>
          Manage your application settings and company details here.
        </Typography>
      </Box>

      {/* Settings Card */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          bgcolor: "#1e1e3266",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
          border: "1px solid #7367f033",
        }}
      >
        <CompanyTab />
      </Paper>
    </Box>
  );
}
