import { Box, Button, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import InsightsIcon from "@mui/icons-material/Insights";
import FeedIcon from "@mui/icons-material/Feed";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import BarChartIcon from "@mui/icons-material/BarChart";
import {
  A_ADD_USER_ROUTE,
  A_ALL_USERS_ROUTE,
  A_INVENTORY_FEED_LIST_ROUTE,
  A_UPDATE_USER_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_LOGIN_ROUTE,
  ALL_CLIENTS_ROUTE,
} from "@/core/routes";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { IUserPermissions } from "@/core/types/user";
import { authActions } from "@/store/auth";

const menuItems = [
  // {
  //   title: "Home",
  //   menuKey: "home",
  //   icon: HomeOutlinedIcon,
  //   path: ADMIN_DASHBOARD_ROUTE,
  //   matches: [ADMIN_DASHBOARD_ROUTE],
  //   gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  // },
  // {
  //   title: "Agents",
  //   menuKey: "bots",
  //   icon: SmartToyOutlinedIcon,
  //   path: "/admin/agents",
  //   matches: ["/admin/agents", "/admin/agents/add", "/admin/agents/edit"],
  //   gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  // },
  {
    title: "Insights",
    menuKey: "insights",
    icon: InsightsIcon,
    path: "/admin/insights",
    matches: ["/admin/insights", "/admin/insights/add", "/admin/insights/edit"],
    gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  },
  {
    title: "Clients",
    menuKey: "clients",
    icon: GroupOutlinedIcon,
    path: ALL_CLIENTS_ROUTE,
    matches: [ALL_CLIENTS_ROUTE, "/admin/clients/add", "/admin/clients/edit"],
    gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  },
  // {
  //   title: "Inventory Feed",
  //   menuKey: "inventoryfeed",
  //   icon: FeedIcon,
  //   path: A_INVENTORY_FEED_LIST_ROUTE,
  //   matches: [A_INVENTORY_FEED_LIST_ROUTE],
  //   gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  // },
  // {
  //   title: "Usage",
  //   menuKey: "usage",
  //   icon: DonutLargeOutlinedIcon,
  //   path: "/admin/usage",
  //   matches: ["/admin/usage"],
  //   gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  // },
  // {
  //   title: "Users",
  //   menuKey: "users",
  //   icon: PersonOutlineOutlinedIcon,
  //   path: A_ALL_USERS_ROUTE,
  //   matches: [A_ALL_USERS_ROUTE, A_ADD_USER_ROUTE, A_UPDATE_USER_ROUTE],
  //   gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  // },
  {
    title: "Packages",
    menuKey: "packages",
    icon: Inventory2OutlinedIcon,
    path: "/admin/packages",
    matches: ["/admin/packages", "/admin/packages/add", "/admin/packages/edit"],
    gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  },
  {
    title: "Settings",
    menuKey: "settings",
    icon: SettingsOutlinedIcon,
    path: "/admin/settings",
    matches: ["/admin/settings"],
    gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  },
];

const hasPermission = (
  menuKey: keyof IUserPermissions,
  permissions?: IUserPermissions
): boolean => {
  if (!permissions) return false;

  return permissions[menuKey]?.view || false;
};

export default function Sidebar() {
  const pathname = usePathname();

  const router = useRouter();

  const dispatch = useDispatch();

  const { permissions } = useSelector((state: IRootState) => state.auth.user);

  const filteredMenuItems = menuItems.filter((item) => {
    switch (item.menuKey) {
      case "home":
        return hasPermission("home", permissions as IUserPermissions);
      case "bots":
        return hasPermission("bots", permissions as IUserPermissions);
      case "clients":
        return hasPermission("clients", permissions as IUserPermissions);
      case "usage":
        return hasPermission("usage", permissions as IUserPermissions);
      case "users":
        return hasPermission("users", permissions as IUserPermissions);
      case "settings":
        return hasPermission("settings", permissions as IUserPermissions);
      default:
        return true;
    }
  });

  const isActiveRoute = (item: any) => {
    return item.matches?.some(
      (match: string) => pathname === match || pathname.startsWith(match + "/")
    );
  };

  const handleLogout = () => {
    router.replace(ADMIN_LOGIN_ROUTE);
    dispatch(authActions.logout());
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0A0F1E",
        color: "#ffffff",
        width: "250px",
        borderRight: "1px solid rgba(115, 103, 240, 0.2)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {" "}
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              transition: "transform 0.3s ease",
              margin: "1rem .4rem",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              sx={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                background:
                  "linear-gradient(45deg, rgba(115, 103, 240, 0.2), rgba(206, 159, 252, 0.2))",
                border: "1px solid rgba(115, 103, 240, 0.3)",
                boxShadow: "0 0 12px rgba(115, 103, 240, 0.3)",

                animation: "pulse 4s ease-in-out infinite",
              }}
            >
              <BarChartIcon
                sx={{
                  color: "#7367f0",
                  fontSize: "20px",
                }}
              />
            </Box>
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "gradientShift 8s ease infinite",
                letterSpacing: "-0.5px",
              }}
            >
              UserInsight
            </div>
          </Box>
        </Link>
        {filteredMenuItems.map((item) => {
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
                  px: 2.5,
                  borderRadius: "12px",
                  color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
                  background: isActive
                    ? "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)"
                    : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)"
                      : "rgba(255,255,255,0.03)",
                    boxShadow: isActive
                      ? "0 5px 15px rgba(115, 103, 240, 0.6)"
                      : "none",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: 22,
                    color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
