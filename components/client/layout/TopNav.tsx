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
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ADMIN_LOGIN_ROUTE,
  CLIENT_LOGIN_ROUTE,
  CLIENT_PROFILE_ROUTE,
  CLIENT_SETTINGS_ROUTE,
} from "@/core/routes";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { extractFirstName } from "@/utils";
import { authActions } from "@/store/auth";

interface TopNavProps {
  onToggleSidebar: () => void;
}

export default function TopNav({ onToggleSidebar }: TopNavProps) {
  const { user } = useSelector((state: IRootState) => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const dispatch = useDispatch();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.replace(CLIENT_LOGIN_ROUTE);
    dispatch(authActions.logout());
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        height: "64px",
        borderBottom: "1px solid rgba(115, 103, 240, 0.2)",
        background: "#0A0F1E",
        backdropFilter: "blur(20px)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        <IconButton onClick={onToggleSidebar} sx={{ color: "#7367f0" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 3 } }}
      >
        <IconButton sx={{ color: "#7367f0" }}>
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
                borderColor: "#7367f0",
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
            <Avatar src={user.photoUrl} sizes="40px" />
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
                Hi {extractFirstName(user.name)} <span>👋</span>
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
              {user.name}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              {user.email}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
          <MenuItem
            onClick={() => {
              router.push(CLIENT_PROFILE_ROUTE);
              handleClose();
            }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(CLIENT_SETTINGS_ROUTE);
              handleClose();
            }}
          >
            Account Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(CLIENT_SETTINGS_ROUTE);
              handleClose();
            }}
          >
            Billing
          </MenuItem>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
          <MenuItem
            onClick={handleLogout}
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
