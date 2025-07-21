"use client";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Container,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { ADMIN_LOGIN_ROUTE, CLIENT_LOGIN_ROUTE } from "@/core/routes";
import DoubleColumnLayout from "@/components/shared/DoubleColumnLayout";
import authService from "@/services/api/client/auth-service";
import useNotification from "@/hooks/shared/use-notification";

export default function ChangePasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const notification = useNotification();

  useEffect(() => {
    // Access localStorage only on client side
    const storedEmail = localStorage.getItem("resetEmail");
    const storedOtp = localStorage.getItem("resetOtp");
    setEmail(storedEmail || "");
    setOtp(storedOtp || "");
  }, []);

  const passwordRequirements = [
    {
      id: "length",
      text: "At least 8 characters long",
      test: (pass: string) => pass.length >= 8,
    },
    {
      id: "number",
      text: "Contains a number",
      test: (pass: string) => /\d/.test(pass),
    },
    {
      id: "special",
      text: "Contains a special character",
      test: (pass: string) => /[!@#$%^&*]/.test(pass),
    },
    {
      id: "capital",
      text: "Contains an uppercase letter",
      test: (pass: string) => /[A-Z]/.test(pass),
    },
    {
      id: "match",
      text: "Passwords match",
      test: (pass: string) => pass === confirmPassword && pass !== "",
    },
  ];

  useEffect(() => {
    const allValid = passwordRequirements.every((req) => req.test(newPassword));
    setIsValid(allValid);
  }, [newPassword, confirmPassword]);

  const handleSubmit = async () => {
    try {
      const res = await authService.resetPassword({
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      if (res.success) {
        // Clear the stored email and OTP
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetOtp");
        // Route to login page
        notification.success(res.message);
        window.location.href = CLIENT_LOGIN_ROUTE;
      } else {
        notification.error(res.message);
      }
    } catch (err) {
      console.log(err);
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
          position: "relative",
          overflow: "hidden",
          borderRadius: "24px",
          border: "1px solid rgba(115,103,240,0.2)",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115,103,240,0.2)",
          bgcolor: "rgba(30,30,50,0.4)",
          backdropFilter: "blur(12px)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(to right, #7367f0, #ce9ffc)",
          },
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
          Change password
        </Typography>
        <Typography
          sx={{
            mb: 4,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            fontSize: { xs: 14, lg: 15 },
            textAlign: "center",
          }}
        >
          Your new password must be different from previous used password.
        </Typography>

        <Box component="form" sx={{ mb: 4 }}>
          <Typography sx={{ mb: 1, fontWeight: 500, color: "white" }}>
            New Password
          </Typography>
          <TextField
            fullWidth
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter Password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowNewPassword(!showNewPassword);
                    }}
                    sx={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    {showNewPassword ? (
                      <VisibilityOffIcon
                        sx={{ color: "rgba(255,255,255,0.5)" }}
                      />
                    ) : (
                      <VisibilityIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                    )}
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          <Typography sx={{ mb: 1, fontWeight: 500, color: "white" }}>
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    sx={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon
                        sx={{ color: "rgba(255,255,255,0.5)" }}
                      />
                    ) : (
                      <VisibilityIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                    )}
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Password Requirements */}
          <Box sx={{ mb: 3 }}>
            {passwordRequirements.map((req) => (
              <Box
                key={req.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                {req.test(newPassword) ? (
                  <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 20 }} />
                ) : (
                  <CancelIcon
                    sx={{ color: "rgba(255,255,255,0.3)", fontSize: 20 }}
                  />
                )}
                <Typography
                  sx={{
                    fontSize: 14,
                    color: req.test(newPassword)
                      ? "#4CAF50"
                      : "rgba(255,255,255,0.7)",
                  }}
                >
                  {req.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!isValid}
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
            Reset Password
          </Button>
        </Box>
      </Box>
    </DoubleColumnLayout>
  );
}
