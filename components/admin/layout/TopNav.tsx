import { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_LOGIN_ROUTE, ADMIN_PROFILE_ROUTE } from "@/core/routes";
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
    router.replace(ADMIN_LOGIN_ROUTE);
    dispatch(authActions.logout());
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        height: "64px",
        borderBottom: "1px solid rgba(115, 103, 240, 0.2)",
        background: "#0A0F1E",
        backdropFilter: "blur(20px)",
        borderRadius: "0px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={onToggleSidebar} sx={{ color: "#7367f0" }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#ffffff" }}>
          Admin Panel
        </Typography>
      </Box>

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
        <Avatar src={user.photoUrl} sx={{ width: 36, height: 36 }} />
        {!isMobile && (
          <Typography variant="subtitle2" sx={{ color: "#ffffff" }}>
            {extractFirstName(user.name)}
          </Typography>
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
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#ffffff" }}>
            {user.email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem
          onClick={() => {
            router.push(ADMIN_PROFILE_ROUTE);
            handleClose();
          }}
        >
          My Profile
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "#d32f2f !important",
            "&:hover": {
              backgroundColor: "#fdecea",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Paper>
  );
}
