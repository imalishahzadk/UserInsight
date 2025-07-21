"use client";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Container,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import { ADMIN_LOGIN_ROUTE } from "@/core/routes";
import DoubleColumnLayout from "@/components/shared/DoubleColumnLayout";
import { useState } from "react";
import authService from "@/services/api/client/auth-service";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await authService.sendOtp({ email });
      if (res.success) {
        localStorage.setItem("resetEmail", email);
        window.location.href = "/auth/otp-verification";
      } else {
        setError(res.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DoubleColumnLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "440px", lg: "480px" },
          mx: "auto",
          px: { xs: 3, sm: 4, lg: 6 },
          py: { xs: 4, sm: 6 },
          height: "60vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 600,
            fontSize: { xs: 28, lg: 32 },
            color: "white",
            textAlign: "center",
          }}
        >
          Forgot your password?
        </Typography>
        <Typography
          sx={{
            mb: 4,
            color: "white",
            lineHeight: 1.6,
            fontSize: { xs: 14, lg: 15 },
            textAlign: "center",
          }}
        >
          Don't worry, it happens to the best of us! We'll help you reset your
          password.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Typography sx={{ mb: 1, fontWeight: 500, color: "white" }}>
            Email
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your Email"
            variant="outlined"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: "12px",
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(115,103,240,0.2)",
                color: "white",
                "&:hover": {
                  borderColor: "rgba(115,103,240,0.4)",
                },
                "&.Mui-focused": {
                  borderColor: "#7367f0",
                  boxShadow: "0 0 0 2px rgba(115,103,240,0.2)",
                },
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
                "&::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                },
              },
              "& .MuiFormHelperText-root": {
                color: "#ff4d4f",
                marginLeft: 0,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{
              height: 48,
              borderRadius: "12px",
              background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 8s ease infinite",
              fontSize: "1rem",
              boxShadow: "0 4px 15px rgba(115, 103, 240, 0.4)",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(115, 103, 240, 0.6)",
                background: "linear-gradient(45deg, #6354e0 30%, #bd8cf7 90%)",
              },
              "&.Mui-disabled": {
                background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                opacity: 0.7,
              },
            }}
          >
            {isLoading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
            ) : (
              "Continue"
            )}
          </Button>
        </Box>
      </Box>
    </DoubleColumnLayout>
  );
}
