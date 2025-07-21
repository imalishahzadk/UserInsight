"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface ProfileData {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  image?: string;
}

interface Props {
  initialData: ProfileData;
}

const commonInputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: "#F9FAFB",
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px 20px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
};

export default function ProfileForm({ initialData }: Props) {
  const [formData, setFormData] = useState<ProfileData>(initialData);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: "20px",
            p: 3,
            boxShadow: "0px 4px 35px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* Profile Image */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
            <Avatar
              src={formData.image || "/placeholder.jpg"}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Your photo
              </Typography>
              <Typography sx={{ color: "#666", mb: 2 }}>
                This will be displayed on your profile
              </Typography>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{
                  borderRadius: "20px",
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  "&:hover": {
                    borderColor: "#D1D5DB",
                  },
                }}
              >
                Upload new photo
              </Button>
            </Box>
          </Box>

          {/* Form Fields */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mb: 1 }}>Full name</Typography>
              <TextField
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                sx={commonInputStyle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mb: 1 }}>Email</Typography>
              <TextField
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                sx={commonInputStyle}
              />
            </Grid>
          </Grid>

          {/* Password Section */}
          <Box sx={{ mt: 4 }}>
            <Button
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              sx={{
                color: "#4285f4",
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              Change password
            </Button>

            {isPasswordVisible && (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={4}>
                  <Typography sx={{ mb: 1 }}>Current password</Typography>
                  <TextField
                    fullWidth
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                    sx={commonInputStyle}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography sx={{ mb: 1 }}>New password</Typography>
                  <TextField
                    fullWidth
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    sx={commonInputStyle}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography sx={{ mb: 1 }}>Confirm password</Typography>
                  <TextField
                    fullWidth
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    sx={commonInputStyle}
                  />
                </Grid>
              </Grid>
            )}
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#4285f4",
                borderRadius: "20px",
                px: 4,
                "&:hover": { bgcolor: "#3367d6" },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
