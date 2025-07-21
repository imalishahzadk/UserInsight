import { Box, Button, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import InsightsIcon from "@mui/icons-material/Insights";
import Link from "next/link";
import BarChartIcon from "@mui/icons-material/BarChart";
import FeedIcon from "@mui/icons-material/Feed";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  C_INVENTORY_FEED_LIST_ROUTE,
  CLIENT_LOGIN_ROUTE,
  CLIENT_MEETING_SCHEDULE_ROUTE,
  C_ALL_USERS_ROUTE,
  CLIENT_DEALERSHIPS_ROUTE,
} from "@/core/routes";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { authActions } from "@/store/auth";
import { IClientPermissions } from "@/core/types/client";

const menuItems = [
  {
    title: "Home",
    menuKey: "home",
    icon: HomeOutlinedIcon,
    path: "/client/dashboard",
    matches: ["/client/dashboard", "/client/dashboard/"],
  },
  // {
  //   title: "Agents",
  //   menuKey: "bots",
  //   icon: SmartToyOutlinedIcon,
  //   path: "/client/agents",
  //   matches: ["/client/agents", "/client/agents/create", "/client/agents/[id]"],
  // },
  {
    title: "Trackers",
    menuKey: "insights",
    icon: InsightsIcon,
    path: "/client/insights",
    matches: [
      "/client/insights",
      "/client/insights/create",
      "/client/insights/[id]",
    ],
  },
  // {
  //   title: "Inventory Feed",
  //   menuKey: "inventoryfeed",
  //   icon: FeedIcon,
  //   path: C_INVENTORY_FEED_LIST_ROUTE,
  //   matches: [C_INVENTORY_FEED_LIST_ROUTE],
  //   gradient: "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
  // },
  {
    title: "Analytics",
    menuKey: "usage",
    icon: DonutLargeOutlinedIcon,
    path: "/client/usage",
    matches: ["/client/usage"],
  },
  // {
  //   title: "Users",
  //   menuKey: "users",
  //   icon: GroupOutlinedIcon,
  //   path: C_ALL_USERS_ROUTE,
  //   matches: [C_ALL_USERS_ROUTE],
  // },
  {
    title: "Leads",
    menuKey: "leads",
    icon: Inventory2OutlinedIcon,
    path: "/client/leads",
    matches: ["/client/leads"],
  },
  // {
  //   title: "Meeting Slots",
  //   menuKey: "meetingSlots",
  //   icon: CalendarMonthIcon,
  //   path: CLIENT_MEETING_SCHEDULE_ROUTE,
  //   matches: [CLIENT_MEETING_SCHEDULE_ROUTE],
  // },
  // {
  //   title: "Dealerships",
  //   menuKey: "dealerShips",
  //   icon: BusinessIcon,
  //   path: CLIENT_DEALERSHIPS_ROUTE,
  //   matches: [CLIENT_DEALERSHIPS_ROUTE],
  // },
  {
    title: "Settings",
    menuKey: "settings",
    icon: SettingsOutlinedIcon,
    path: "/client/settings",
    matches: ["/client/settings"],
  },
];

const hasPermission = (
  menuKey: keyof IClientPermissions,
  permissions: IClientPermissions
): boolean => {
  if (!permissions) return false;

  return permissions[menuKey]?.view || false;
};

export default function Sidebar() {
  const pathname = usePathname();

  const router = useRouter();

  const { permissions } = useSelector((state: IRootState) => state.auth.user);

  const filteredMenuItems = menuItems.filter((item) => {
    switch (item.menuKey) {
      case "home":
        return hasPermission("home", permissions as IClientPermissions);
      case "bots":
        return hasPermission("bots", permissions as IClientPermissions);
      case "usage":
        return hasPermission("usage", permissions as IClientPermissions);
      case "users":
        return hasPermission("users", permissions as IClientPermissions);
      case "leads":
        return hasPermission("leads", permissions as IClientPermissions);
      case "meetingSlots":
        return hasPermission("meetingSlots", permissions as IClientPermissions);
      case "settings":
        return hasPermission("settings", permissions as IClientPermissions);
      default:
        return true;
    }
  });

  const dispatch = useDispatch();

  const isActiveRoute = (item: any) => {
    return item.matches?.some(
      (match: string) => pathname === match || pathname.startsWith(match + "/")
    );
  };

  const handleLogout = () => {
    router.replace(CLIENT_LOGIN_ROUTE);
    dispatch(authActions.logout());
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0A0F1E",
        color: "white",
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
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "4px",
          },
        }}
      >
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
                  color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  background: isActive
                    ? "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)"
                    : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)"
                      : "rgba(255,255,255,0.03)",
                    boxShadow: isActive
                      ? "0 8px 25px rgba(115, 103, 240, 0.6)"
                      : "none",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: 22,
                    color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: isActive ? 600 : 400,
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
