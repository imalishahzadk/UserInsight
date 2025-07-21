"use client";
import { Box, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SvgIconComponent } from "@mui/icons-material";
import Image from "next/image";
import { ADMIN_LOGIN_ROUTE } from "@/core/routes";

interface MenuItem {
  title: string;
  icon: SvgIconComponent;
  path: string;
  matches: string[];
}

const menuItems: MenuItem[] = [
  {
    title: "Home",
    icon: HomeOutlinedIcon,
    path: "/client/dashboard",
    matches: ["/client/dashboard", "/client/dashboard/", "/client"],
  },
  {
    title: "Agents",
    icon: SmartToyOutlinedIcon,
    path: "/client/agents",
    matches: ["/client/agents", "/client/agents/create", "/client/agents/[id]"],
  },
  {
    title: "Usage",
    icon: DonutLargeOutlinedIcon,
    path: "/client/usage",
    matches: ["/client/usage"],
  },
  {
    title: "Leads",
    icon: GroupOutlinedIcon,
    path: "/client/leads",
    matches: ["/client/leads"],
  },
  {
    title: "Users",
    icon: PersonOutlineOutlinedIcon,
    path: "/client/users",
    matches: ["/client/users", "/client/users/add"],
  },
  {
    title: "Settings",
    icon: SettingsOutlinedIcon,
    path: "/client/settings",
    matches: ["/client/settings"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActiveRoute = (item: MenuItem) => {
    return item.matches.some((match) => pathname.startsWith(match));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#000000",
        color: "white",
        width: "250px",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src={"/logo.jpeg"} width={200} height={100} alt="logo" />
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          px: 2,
          py: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item);

          return (
            <Link
              key={item.path}
              href={item.path}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 2,
                  px: 2,
                  borderRadius: "8px",
                  color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  bgcolor: isActive ? "#4285f4" : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: isActive ? "#4285f4" : "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: 20,
                    color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>

      {/* Logout */}
      <Box
        sx={{
          mt: "auto",
          p: 2,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box
          component={Link}
          href={ADMIN_LOGIN_ROUTE}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            py: 2,
            px: 2,
            borderRadius: "8px",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <LogoutIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontSize: "0.95rem" }}>Log out</Typography>
        </Box>
      </Box>
    </Box>
  );
}
