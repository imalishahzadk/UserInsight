"use client";
import {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
} from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoubleColumnLayout from "@/components/shared/DoubleColumnLayout";
import authService from "@/services/api/client/auth-service";
import { useRouter } from "next/navigation";
import useNotification from "@/hooks/shared/use-notification";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const notification = useNotification();

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect back to forgot password
      router.push("/auth/forgot-password");
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const res = await authService.resendOtp({ email });
      if (res.success) {
        setTimer(180);
        setCanResend(false);
        notification.success("OTP resent successfully");
      } else {
        notification.error(res.message);
      }
    } catch (err) {
      console.error(err);
      notification.error("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.match(/\d/g)?.slice(0, 4) || [];

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 4) newOtp[index] = digit;
    });
    setOtp(newOtp);

    const lastFilledIndex = newOtp.findLastIndex((val) => val !== "");
    const focusIndex =
      lastFilledIndex < 3 ? lastFilledIndex + 1 : lastFilledIndex;
    inputs.current[focusIndex]?.focus();
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const otpString = otp.join("");
      const res = await authService.verifyOtp({
        email: email,
        otp: otpString,
      });

      if (res.success) {
        // Store both email and OTP for the change password page
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("resetOtp", otpString);
        router.push("/auth/change-password");
        notification.success(res.message);
      } else {
        // Handle error case - you might want to show an error message to the user
        console.error(res.message);
        notification.error(res.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
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
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 600,
            fontSize: { xs: 28, lg: 32 },
            color: "#fff",
          }}
        >
          OTP Verification
        </Typography>
        <Typography
          sx={{
            mb: 4,
            color: "#fff",
            lineHeight: 1.6,
            fontSize: { xs: 14, lg: 15 },
          }}
        >
          We just sent you an OTP to {email}. Please enter the code to continue.
        </Typography>

        <Box component="form" sx={{ mb: 4 }}>
          {/* OTP Input Boxes */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              mb: 3,
              width: "100%",
            }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e as any, index)}
                onPaste={handlePaste}
                style={{
                  width: "calc(25% - 9px)",
                  height: "48px",
                  fontSize: "20px",
                  textAlign: "center",
                  borderRadius: "12px",
                  border: "1px solid rgba(115,103,240,0.2)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#ffffff",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!otp.every((digit) => digit !== "") || isLoading}
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
                  color: "#fff",
                }}
              />
            ) : (
              "Verify"
            )}
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "0.875rem",
              }}
            >
              {canResend
                ? "Didn't receive the code?"
                : `Resend code in ${formatTime(timer)}`}
            </Typography>
            {canResend && (
              <Button
                onClick={handleResendOtp}
                disabled={isLoading}
                sx={{
                  color: "#7367f0",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "rgba(115, 103, 240, 0.1)",
                  },
                }}
              >
                Resend
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </DoubleColumnLayout>
  );
}
