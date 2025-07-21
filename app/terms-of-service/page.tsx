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

export default function TermsOfServicePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "#0A0F1E", color: "white", minHeight: "100vh" }}>
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
            <Typography color="#00E5FF">Terms of Service</Typography>
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
            Terms of Service
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
            Please read these Terms of Service carefully before using the
            Botlync platform. By accessing or using our services, you agree to
            be bound by these terms and our Privacy Policy.
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
              1. Acceptance of Terms
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              By accessing or using Botlync's services, you acknowledge that you
              have read, understood, and agree to be bound by these Terms of
              Service. If you do not agree to these terms, you must not access
              or use our services.
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
              2. Description of Services
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Botlync provides an AI-powered chatbot platform that allows
              businesses to create, deploy, and manage conversational AI
              assistants on their websites and other digital channels. Our
              services include, but are not limited to:
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
                  Chatbot creation and customization tools
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
                  Natural language processing capabilities
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
                  Analytics and reporting features
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
                  Integration with third-party services
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
              3. User Accounts and Registration
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              To use certain features of our services, you must register for an
              account. When you register, you agree to:
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
                  Provide accurate, current, and complete information
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
                  Maintain the security of your account credentials
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
                  Take responsibility for all activities that occur under your
                  account
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
                  Promptly notify Botlync of any unauthorized use of your
                  account
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
              4. Subscription and Billing
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Botlync offers subscription-based services with different pricing
              tiers. By subscribing to a paid plan:
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
                  You agree to pay all fees associated with your selected plan
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
                  You authorize us to charge your payment method on file
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
                  Subscriptions will automatically renew unless canceled before
                  the renewal date
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
              5. Intellectual Property
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              All content, features, and functionality of our services,
              including but not limited to text, graphics, logos, and software,
              are owned by Botlync and protected by copyright, trademark, and
              other intellectual property laws.
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              You retain ownership of any content you provide to our platform,
              but you grant Botlync a worldwide, non-exclusive, royalty-free
              license to use, reproduce, and display such content in connection
              with providing and improving our services.
            </Typography>
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
              10. Contact Us
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              If you have any questions about these Terms of Service, please
              contact us at:
            </Typography>
            <Typography
              sx={{
                color: "#00E5FF",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              legal@botlync.com
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
                    active: false,
                  },
                  {
                    name: "Terms of Service",
                    path: "/terms-of-service",
                    active: true,
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
