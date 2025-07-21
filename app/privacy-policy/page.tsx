"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  AppBar,
  Toolbar,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CLIENT_LOGIN_ROUTE } from "@/core/routes";
import Navbar from "@/components/shared/layout/Navbar";

export default function PrivacyPolicyPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "#0A0F1E", color: "white", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <Navbar />

      <Container maxWidth="lg" sx={{ pt: { xs: 15, md: 20 }, pb: 10 }}>
        {/* Back button and Breadcrumbs */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              component={Link}
              href="/"
              sx={{
                color: "#00E5FF",
                "&:hover": {
                  background: "rgba(0,229,255,0.05)",
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{ color: "rgba(255,255,255,0.6)" }}
          >
            <MuiLink
              component={Link}
              href="/"
              underline="hover"
              sx={{ color: "rgba(255,255,255,0.6)" }}
            >
              Home
            </MuiLink>
            <Typography color="#00E5FF">Privacy Policy</Typography>
          </Breadcrumbs>
        </Box>

        {/* Main Content */}
        <Paper
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: "24px",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              color: "#fff",
              mb: 4,
            }}
          >
            Privacy Policy
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            Last Updated: March 1, 2025
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            At Botlync, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our AI chatbot
            platform.
          </Typography>

          <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,0.1)" }} />

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
                color: "#fff",
                mb: 3,
              }}
            >
              Information We Collect
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              We collect several types of information from and about users of
              our platform, including:
            </Typography>
            <Box component="ul" sx={{ pl: 4, color: "rgba(255,255,255,0.7)" }}>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  <strong className="text-white">Personal information:</strong>{" "}
                  Such as your name, email address, and billing information when
                  you register for an account.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  <strong className="text-white">Usage data:</strong>{" "}
                  Information about how you interact with our platform,
                  including conversation logs with chatbots, website analytics,
                  and feature usage.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  <strong className="text-white">Device information:</strong>{" "}
                  Data about the device and browser you use to access our
                  services, including IP address, browser type, and operating
                  system.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
                color: "#fff",
                mb: 3,
              }}
            >
              How We Use Your Information
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              We use the information we collect to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, color: "rgba(255,255,255,0.7)" }}>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Provide, maintain, and improve our services
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Process transactions and send related information
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Send administrative notifications, such as updates to our
                  policies
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Respond to your inquiries and provide customer support
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Improve our AI models and develop new features
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* More sections would go here - trimmed for brevity */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
                color: "#fff",
                mb: 3,
              }}
            >
              Data Security
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              accidental loss, or damage. While we strive to protect your
              information, no method of transmission over the Internet or
              electronic storage is 100% secure.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
                color: "#fff",
                mb: 3,
              }}
            >
              Your Rights
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Depending on your location, you may have certain rights regarding
              your personal information, including the right to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, color: "rgba(255,255,255,0.7)" }}>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Access and receive a copy of your personal information
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Request deletion of your personal information
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                <Typography
                  sx={{
                    fontSize: "inherit",
                    color: "inherit",
                    lineHeight: 1.7,
                  }}
                >
                  Object to or restrict the processing of your personal
                  information
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
                color: "#fff",
                mb: 3,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              If you have any questions about this Privacy Policy, please
              contact us at:
            </Typography>
            <Typography
              sx={{
                color: "#00E5FF",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              privacy@botlync.com
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#070B14", color: "white", py: { xs: 10, md: 15 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background:
                    "linear-gradient(45deg, #00E5FF 30%, #00B8D4 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Botlync
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.8,
                }}
              >
                Empowering businesses with next-generation AI solutions.
                Transform your customer experience today.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: "#fff",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { name: "About", path: "/about" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "Documentation", path: "/docs" },
                ].map((item) => (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        justifyContent: "flex-start",
                        fontSize: { xs: "0.875rem", md: "1.1rem" },
                        "&:hover": {
                          color: "#00E5FF",
                          background: "transparent",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: "#fff",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Legal
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  {
                    name: "Privacy Policy",
                    path: "/privacy-policy",
                    active: true,
                  },
                  {
                    name: "Terms of Service",
                    path: "/terms-of-service",
                    active: false,
                  },
                ].map((item) => (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      sx={{
                        color: item.active
                          ? "#00E5FF"
                          : "rgba(255,255,255,0.7)",
                        justifyContent: "flex-start",
                        fontSize: { xs: "0.875rem", md: "1.1rem" },
                        fontWeight: item.active ? 600 : 400,
                        "&:hover": {
                          color: "#00E5FF",
                          background: "transparent",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.1)" }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
              © {new Date().getFullYear()} Botlync. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
