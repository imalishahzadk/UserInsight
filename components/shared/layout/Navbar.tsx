"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLIENT_LOGIN_ROUTE } from "@/core/routes";

// Add keyframes for animations
const keyframes = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

// Create style element for global animations
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = keyframes;
  document.head.appendChild(styleEl);
}

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define navigation items
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    {
      name: "Pricing",
      path: "/pricing",
      icon: <PaymentsIcon fontSize="small" />,
    },
    { name: "About", path: "/about", icon: <InfoIcon fontSize="small" /> },
  ];

  // Check if we're on any page where we should show the navbar
  const isAuthPage = pathname?.includes("/auth") || false;
  const transparent = pathname === "/" && !scrolled;

  // If we're on an auth page, don't render the navbar
  if (isAuthPage) return null;

  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Mobile drawer content
  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background:
          "linear-gradient(145deg, rgba(26, 26, 46, 0.95), rgba(15, 15, 30, 0.97))",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        pt: 1,
      }}
      role="presentation"
    >
      {/* Close button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            color: "#fff",
            "&:hover": {
              color: "#7367f0",
              background: "rgba(115, 103, 240, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Logo in drawer */}
      <Box sx={{ textAlign: "center", mb: 3, mt: 1 }}>
        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradientShift 8s ease infinite",
            padding: "6px 0",
            display: "inline-block",
          }}
        >
          UserInsight
        </div>
      </Box>

      {/* Navigation items */}
      <List sx={{ px: 2 }}>
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              href={item.path}
              passHref
              style={{ textDecoration: "none" }}
              onClick={toggleDrawer}
            >
              <ListItem
                sx={{
                  borderRadius: "10px",
                  mb: 1,
                  background: isActive
                    ? "rgba(115, 103, 240, 0.15)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(115, 103, 240, 0.3)"
                    : "1px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(115, 103, 240, 0.1)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: isActive ? "#7367f0" : "#fff",
                    "& svg": {
                      mr: 2,
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {item.icon}
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "1rem",
                    }}
                  />
                </Box>
              </ListItem>
            </Link>
          );
        })}

        {/* Login button in mobile drawer */}
        <Link
          href={CLIENT_LOGIN_ROUTE}
          passHref
          style={{ textDecoration: "none" }}
          onClick={toggleDrawer}
        >
          <ListItem sx={{ mt: 4 }}>
            <Button
              fullWidth
              disabled={isLoading}
              variant="contained"
              sx={{
                py: 1.5,
                background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 8s ease infinite",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(115, 103, 240, 0.4)",
                borderRadius: "12px",
                color: "#fff",
                textTransform: "none",
                position: "relative",
                minHeight: "48px",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(115, 103, 240, 0.6)",
                  background:
                    "linear-gradient(45deg, #6354e0 30%, #bd8cf7 90%)",
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
                "Login"
              )}
            </Button>
          </ListItem>
        </Link>
      </List>

      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "#7367f0",
          opacity: 0.06,
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "-50px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "#ce9ffc",
          opacity: 0.06,
          filter: "blur(40px)",
        }}
      />
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: transparent ? "transparent" : "rgba(26, 26, 46, 0.75)",
        backdropFilter: "blur(12px)",
        borderBottom: transparent
          ? "none"
          : "1px solid rgba(115, 103, 240, 0.15)",
        boxShadow: transparent
          ? "none"
          : "0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(115, 103, 240, 0.1)",
        transition: "all 0.3s ease",
        width: isSmallMobile ? "94%" : "90%",
        maxWidth: "1400px",
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "16px",
        mt: 2,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #7367f0, #ce9ffc, #7367f0)",
          backgroundSize: "200% 100%",
          animation: "shimmer 6s infinite linear",
          opacity: transparent ? 0 : 1,
          transition: "opacity 0.3s ease",
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            "&.MuiToolbar-root": {
              minHeight: "64px",
            },
          }}
        >
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
                  fontSize: isMobile ? "1.4rem" : "1.8rem",
                  fontWeight: 700,
                  background:
                    "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
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

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "12px",
                padding: "4px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {navItems.map((item) => {
                // Check if the current path matches this nav item
                const isActive =
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);

                return (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      startIcon={isActive ? item.icon : null}
                      sx={{
                        color: isActive
                          ? "#7367f0"
                          : "rgba(255, 255, 255, 0.85)",
                        fontSize: "0.95rem",
                        fontWeight: isActive ? 600 : 400,
                        background: isActive
                          ? "rgba(115, 103, 240, 0.1)"
                          : "transparent",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        textTransform: "none",
                        minWidth: isActive ? "110px" : "auto",
                        "&:hover": {
                          background: isActive
                            ? "rgba(115, 103, 240, 0.15)"
                            : "rgba(255, 255, 255, 0.06)",
                          color: isActive ? "#7367f0" : "#fff",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </Box>
          )}

          {/* Login button & Mobile menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <Link href={CLIENT_LOGIN_ROUTE} passHref>
                <Button
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    background:
                      "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                    backgroundSize: "200% 200%",
                    animation: "gradientShift 8s ease infinite",
                    fontSize: "0.95rem",
                    py: 1,
                    px: 3,
                    boxShadow: "0 4px 15px rgba(115, 103, 240, 0.4)",
                    borderRadius: "10px",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    minWidth: "100px",
                    minHeight: "40px",
                    position: "relative",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(115, 103, 240, 0.6)",
                      transform: "translateY(-3px)",
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
                    "Login"
                  )}
                </Button>
              </Link>
            )}

            {isMobile && (
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(115, 103, 240, 0.15)",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(115, 103, 240, 0.25)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            background: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
