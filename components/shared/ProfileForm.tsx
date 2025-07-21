"use client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { renderConditionalImage } from "@/utils";
import useNotification from "@/hooks/shared/use-notification";
import { ApiResponse } from "@/core/types";
import Spinner from "./ui/Spinner";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/auth";

// Common TextField styles
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    bgcolor: "#f8f9fa",
    height: "60px",
    "& input": {
      height: "60px",
      padding: "0 20px",
      boxSizing: "border-box",
    },
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#e0e0e0",
    },
  },
};

interface IFormGroup {
  name: string;
  phoneNumber: string;
  image: File | string | null;
  password: string;
  confirmPassword: string;
}

interface ProfileFormProps {
  onSubmit: (state: IFormGroup) => Promise<ApiResponse<any>>;
  initialData?: {
    name: string;
    phoneNumber: string;
    photoUrl: string;
  };
}

export default function ProfileForm({
  initialData,
  onSubmit,
}: ProfileFormProps) {
  const notification = useNotification();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formGroup, setFormGroup] = useState<IFormGroup>({
    name: "",
    phoneNumber: "",
    image: null,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (initialData) {
      const { name, phoneNumber, photoUrl } = initialData;
      setFormGroup({
        name,
        phoneNumber,
        image: photoUrl,
        password: "",
        confirmPassword: "",
      });
    }
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormGroup({ ...formGroup, [name]: value });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormGroup({ ...formGroup, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formGroup.password !== formGroup.confirmPassword) {
      notification.error("Password doesn't matches.");
      return;
    }

    setIsSubmitting(true);
    const res = await onSubmit(formGroup);
    setIsSubmitting(false);

    if (res.success) {
      notification.success(res.message);

      const newUserDetails = {
        name: res.data.name,
        phoneNumber: res.data.phoneNumber,
        photoUrl: res.data.photoUrl,
      };

      dispatch(authActions.updateUserData({ user: newUserDetails }));
    } else {
      notification.error(res.message);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#0A0F1E",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#fff" }}>
        Profile
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#7367f033",
          borderRadius: "16px",
          padding: "16px",
        }}
      >
        {/* Profile Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            my: 4,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={
                renderConditionalImage(formGroup.image) ?? "/placeholder.jpg"
              }
              sx={{ width: 80, height: 80 }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -4,
                right: -4,
                bgcolor: "#4285f4",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <label htmlFor="imageInput">
                <EditIcon sx={{ color: "white", fontSize: 18 }} />
                <input
                  type="file"
                  hidden
                  alt=""
                  accept="image/*"
                  id="imageInput"
                  onChange={handleChangeImage}
                />
              </label>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500, color: "#fff" }}>
              {formGroup.name}
            </Typography>
          </Box>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#fff",
                }}
              >
                Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your name"
                value={formGroup.name}
                name="name"
                onChange={handleChangeInput}
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
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#fff",
                }}
              >
                Phone Number
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your phone number"
                value={formGroup.phoneNumber}
                name="phoneNumber"
                onChange={handleChangeInput}
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
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#fff",
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                placeholder="(Unchanged)"
                name="password"
                onChange={handleChangeInput}
                value={formGroup.password}
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
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#fff",
                }}
              >
                Confirm password
              </Typography>
              <TextField
                fullWidth
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={handleChangeInput}
                value={formGroup.confirmPassword}
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
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                size="large"
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
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
