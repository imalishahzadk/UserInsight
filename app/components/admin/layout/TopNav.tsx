"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ADMIN_LOGIN_ROUTE } from "@/core/routes";

interface TopNavProps {
  onToggleSidebar: () => void;
}

export default function TopNav({ onToggleSidebar }: TopNavProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        height: "64px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        background: "#0A0F1E",
        backdropFilter: "blur(20px)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        <IconButton onClick={onToggleSidebar} sx={{ color: "#00E5FF" }}>
          <MenuIcon />
        </IconButton>

        {!isMobile && (
          <TextField
            placeholder="Search"
            size="small"
            sx={{
              maxWidth: 300,
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: "12px",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "#00E5FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00E5FF",
                },
                "& input": {
                  color: "#fff",
                  "&::placeholder": {
                    color: "rgba(255,255,255,0.5)",
                    opacity: 1,
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00E5FF" }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 3 } }}
      >
        <IconButton sx={{ color: "#00E5FF" }}>
          <NotificationsIcon />
        </IconButton>

        <Box
          onClick={handleProfileClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            "&:hover": {
              "& .profile-image": {
                borderColor: "#00E5FF",
              },
            },
          }}
        >
          <Box
            className="profile-image"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              border: "2px solid rgba(255,255,255,0.2)",
              transition: "border-color 0.3s ease",
            }}
          >
            <Image
              src="/images/profile-placeholder.png"
              alt="Profile"
              fill
              sizes="40px"
              style={{ objectFit: "cover" }}
            />
          </Box>
          {!isMobile && (
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Hi Muhammad <span>👋</span>
              </Typography>
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Good morning
              </Typography>
            </Box>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              background: "#0A0F1E",
              backdropFilter: "blur(20px)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              "& .MuiMenuItem-root": {
                py: 1,
                px: 2,
                fontSize: 14,
                color: "#fff",
                "&:hover": {
                  background: "rgba(0,229,255,0.1)",
                },
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 14, color: "#fff" }}>
              Muhammad Shah
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              admin@example.com
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
          <MenuItem
            onClick={() => {
              router.push("/admin/profile");
              handleClose();
            }}
          >
            My Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>Account Settings</MenuItem>
          <MenuItem onClick={handleClose}>Billing</MenuItem>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
          <MenuItem
            component={Link}
            href={ADMIN_LOGIN_ROUTE}
            onClick={handleClose}
            sx={{
              color: "#FF4444",
              "&:hover": {
                background: "rgba(255,68,68,0.1)",
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
