"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLIENT_LOGIN_ROUTE } from "@/core/routes";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();

  // Define navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Docs", path: "/docs" },
  ];

  // Check if we're on any page where we should show the navbar
  const isAuthPage = pathname?.includes("/auth") || false;

  // If we're on an auth page, don't render the navbar
  if (isAuthPage) return null;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: transparent ? "rgba(10, 15, 30, 0.85)" : "#0A0F1E",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1.5 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/" passHref>
              <Box
                component="a"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src="/logo1.png"
                  alt="Botlync Logo"
                  style={{
                    height: isMobile ? "35px" : "45px",
                    width: "auto",
                  }}
                />
              </Box>
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: isMobile ? 2 : 4,
              alignItems: "center",
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
                    sx={{
                      color: isActive ? "#00E5FF" : "#fff",
                      fontSize: isMobile ? "0.875rem" : "1rem",
                      position: "relative",
                      overflow: "hidden",
                      fontWeight: isActive ? 700 : 400,
                      background: isActive
                        ? "rgba(0, 229, 255, 0.1)"
                        : "transparent",
                      padding: "6px 12px",
                      marginX: 1,
                      borderRadius: "8px",
                      "&:hover": {
                        color: "#00E5FF",
                        background: isActive
                          ? "rgba(0, 229, 255, 0.15)"
                          : "rgba(0, 229, 255, 0.05)",
                        "&::after": {
                          transform: "scaleX(1)",
                        },
                      },
                      "&::after": {
                        content: "''",
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#00E5FF",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "right",
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}

            <Link href={CLIENT_LOGIN_ROUTE} passHref>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
                  px: isMobile ? 2 : 4,
                  borderRadius: "12px",
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  boxShadow: "0 5px 15px rgba(0, 229, 255, 0.3)",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 20px rgba(0, 229, 255, 0.4)",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
