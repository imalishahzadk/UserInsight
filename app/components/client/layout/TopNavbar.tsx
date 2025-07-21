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
        borderBottom: "1px solid #eee",
        bgcolor: "white",
      }}
    >
      {/* Left Section with Toggle and Search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flex: 1,
        }}
      >
        <IconButton onClick={onToggleSidebar} sx={{ color: "#666" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 3 },
        }}
      >
        {!isMobile && (
          <TextField
            placeholder="Search"
            size="small"
            sx={{
              maxWidth: 300,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#f8f9fa",
                borderRadius: "100px",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4285f4",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#666" }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        {/* Notifications */}
        {/* <IconButton sx={{ color: "#666" }}>
          <NotificationsIcon />
        </IconButton> */}

        {/* Profile */}
        <Box
          onClick={handleProfileClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
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
          {/* {!isMobile && (
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Hi Client <span style={{ color: "#FFD700" }}>👋</span>
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#666" }}>
                Good morning
              </Typography>
            </Box>
          )} */}
        </Box>

        {/* Profile Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              "& .MuiMenuItem-root": {
                py: 1,
                px: 2,
                fontSize: 14,
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
              Client Name
            </Typography>
            <Typography sx={{ color: "#666", fontSize: 12 }}>
              client@example.com
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => {
              router.push("/client/profile");
              handleClose();
            }}
          >
            My Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            href={ADMIN_LOGIN_ROUTE}
            onClick={handleClose}
            sx={{ color: "#d32f2f" }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
