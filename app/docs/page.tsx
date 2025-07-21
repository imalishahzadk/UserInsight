"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  AppBar,
  Toolbar,
  Grid,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Chip,
} from "@mui/material";
import Link from "next/link";
import { CLIENT_LOGIN_ROUTE } from "@/core/routes";
import Navbar from "@/components/shared/ui/navbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArticleIcon from "@mui/icons-material/Article";
import TerminalIcon from "@mui/icons-material/Terminal";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";

// Documentation sections
const docSections = [
  { id: "getting-started", label: "Getting Started", icon: <SchoolIcon /> },
  { id: "integration", label: "Integration", icon: <CodeIcon /> },
  { id: "customization", label: "Customization", icon: <SettingsIcon /> },
  { id: "api-reference", label: "API Reference", icon: <TerminalIcon /> },
  { id: "webhooks", label: "Webhooks", icon: <StorageIcon /> },
  { id: "faqs", label: "FAQs", icon: <ArticleIcon /> },
];

export default function DocumentationPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  const [activeSection, setActiveSection] = useState("getting-started");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMedium) {
      setDrawerOpen(false);
    }
  };

  const copyCode = (id: string) => {
    const codeElement = document.getElementById(id);
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.innerText);
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2000);
    }
  };

  const renderDocContent = () => {
    switch (activeSection) {
      case "getting-started":
        return (
          <>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                color: "#000000",
                mb: 4,
              }}
            >
              Getting Started
            </Typography>

            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.7)",
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Welcome to Botlync! This guide will help you set up your first AI
              chatbot in just a few minutes. Follow these simple steps to get
              started:
            </Typography>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                Step 1: Create Your Account
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                  mb: 4,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      color: "rgba(0, 0, 0, 0.7)",
                      mb: 2,
                      fontSize: "1.1rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Sign up for a Botlync account to access our AI chatbot
                    platform. You can start with a free trial to explore all
                    features before committing to a paid plan.
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    href={CLIENT_LOGIN_ROUTE}
                    sx={{
                      background:
                        "linear-gradient(45deg, #000000 30%, #000000 90%)",
                      borderRadius: "12px",
                      py: 1.5,
                      px: 4,
                      fontSize: "1rem",
                      fontWeight: 600,
                      mt: 2,
                      color: "#fff",
                    }}
                  >
                    Sign Up Free
                  </Button>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: "rgba(0, 0, 0, 0.03)",
                    borderRadius: "16px",
                    p: 3,
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography sx={{ color: "#000000", mb: 2, fontWeight: 600 }}>
                    Pro Tip
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                    }}
                  >
                    You can sign up using your Google or Microsoft account for
                    faster onboarding. All your data will be stored securely
                    according to our Privacy Policy.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                Step 2: Create Your First Chatbot
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                After signing in, you'll be taken to your dashboard where you
                can create your first chatbot:
              </Typography>
              <Box component="ol" sx={{ pl: 3, color: "rgba(0, 0, 0, 0.7)" }}>
                <Box component="li" sx={{ mb: 2, fontSize: "1.1rem" }}>
                  <Typography
                    sx={{
                      fontSize: "inherit",
                      color: "inherit",
                      lineHeight: 1.7,
                    }}
                  >
                    Click on the{" "}
                    <strong style={{ color: "#000000" }}>+ New Chatbot</strong>{" "}
                    button
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
                    Choose a template or start from scratch
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
                    Name your chatbot and select your industry
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
                    Customize the appearance to match your brand
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
                    Click <strong style={{ color: "#000000" }}>Create</strong>{" "}
                    to launch your chatbot builder
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                Step 3: Train Your Chatbot
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                Training your chatbot helps it understand your business and
                respond accurately to customer inquiries:
              </Typography>
              <Box
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "16px",
                  p: 4,
                  mb: 4,
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <CheckCircleIcon sx={{ color: "#000000", fontSize: 24 }} />
                  <Typography sx={{ color: "#000000", fontWeight: 600 }}>
                    Add FAQs
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.7)",
                    mb: 2,
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Enter common questions and answers your customers might ask.
                  You can import these from an existing FAQ page or enter them
                  manually.
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "16px",
                  p: 4,
                  mb: 4,
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <CheckCircleIcon sx={{ color: "#000000", fontSize: 24 }} />
                  <Typography sx={{ color: "#000000", fontWeight: 600 }}>
                    Upload Knowledge Base
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.7)",
                    mb: 2,
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Upload documents like PDFs, website URLs, or product manuals
                  to give your chatbot comprehensive knowledge about your
                  business.
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "16px",
                  p: 4,
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <CheckCircleIcon sx={{ color: "#000000", fontSize: 24 }} />
                  <Typography sx={{ color: "#000000", fontWeight: 600 }}>
                    Fine-tune Responses
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.7)",
                    mb: 2,
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Review and adjust how your chatbot responds to ensure the tone
                  and information align with your brand voice.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                Step 4: Deploy Your Chatbot
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                Once your chatbot is trained, it's time to deploy it to your
                website:
              </Typography>
              <Paper
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                  <IconButton
                    size="small"
                    onClick={() => copyCode("integration-code")}
                    sx={{
                      color:
                        copiedSnippet === "integration-code"
                          ? "#000000"
                          : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {copiedSnippet === "integration-code" ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
                <Typography
                  sx={{ color: "#000000", mb: 2, fontFamily: "monospace" }}
                >
                  // Add this script to your website
                </Typography>
                <pre
                  id="integration-code"
                  style={{
                    color: "rgba(0, 0, 0, 0.8)",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    overflow: "auto",
                    margin: 0,
                  }}
                >
                  {`<script src="https://cdn.botlync.ai/botlync.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    Botlync.init({
      botId: 'YOUR_BOT_ID',
      theme: 'light',
      position: 'bottom-right'
    });
  });
</script>`}
                </pre>
              </Paper>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                Replace 'YOUR_BOT_ID' with the unique ID found in your
                dashboard. This code should be added just before the closing
                &lt;/body&gt; tag of your website.
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                What's Next?
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.03)",
                      p: 3,
                      borderRadius: "16px",
                      height: "100%",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Typography
                      sx={{ color: "#000000", fontWeight: 700, mb: 2 }}
                    >
                      Customize Your Chatbot
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "1rem" }}
                    >
                      Explore advanced customization options to make your
                      chatbot truly yours.
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => handleSectionChange("customization")}
                      sx={{ color: "#000000", mt: 2, pl: 0 }}
                    >
                      Learn more →
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.03)",
                      p: 3,
                      borderRadius: "16px",
                      height: "100%",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Typography
                      sx={{ color: "#000000", fontWeight: 700, mb: 2 }}
                    >
                      Connect to Your Systems
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "1rem" }}
                    >
                      Integrate with your CRM, helpdesk, or other systems for
                      seamless data flow.
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => handleSectionChange("integration")}
                      sx={{ color: "#000000", mt: 2, pl: 0 }}
                    >
                      Learn more →
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.03)",
                      p: 3,
                      borderRadius: "16px",
                      height: "100%",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Typography
                      sx={{ color: "#000000", fontWeight: 700, mb: 2 }}
                    >
                      Explore API Options
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "1rem" }}
                    >
                      Use our APIs for custom implementations and advanced use
                      cases.
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => handleSectionChange("api-reference")}
                      sx={{ color: "#000000", mt: 2, pl: 0 }}
                    >
                      Learn more →
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        );

      case "integration":
        return (
          <>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                color: "#000000",
                mb: 4,
              }}
            >
              Integration Guide
            </Typography>

            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.7)",
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Botlync offers multiple integration options to fit your technical
              requirements and business needs. Choose the method that works best
              for you.
            </Typography>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                JavaScript Widget (Recommended)
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                The easiest way to add Botlync to your website is with our
                JavaScript widget. Just copy and paste this code into your HTML:
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                  <IconButton
                    size="small"
                    onClick={() => copyCode("js-widget-code")}
                    sx={{
                      color:
                        copiedSnippet === "js-widget-code"
                          ? "#000000"
                          : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {copiedSnippet === "js-widget-code" ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
                <pre
                  id="js-widget-code"
                  style={{
                    color: "rgba(0, 0, 0, 0.8)",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    overflow: "auto",
                    margin: 0,
                  }}
                >
                  {`<script src="https://cdn.botlync.ai/botlync.min.js"></script>
<script>
  Botlync.init({
    botId: 'YOUR_BOT_ID',
    theme: 'light',  // Options: 'light', 'dark', or custom hex color
    position: 'bottom-right',  // Options: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    greeting: 'Hello! How can I help you today?',
    title: 'Customer Support',
    subtitle: 'Typically replies within minutes',
    avatar: 'https://yourwebsite.com/avatar.png',  // Optional: URL to your custom avatar
    primaryColor: '#000000',  // Optional: Custom brand color
    allowAttachments: true,  // Optional: Enable file uploads
    allowTranscript: true  // Optional: Allow users to email chat transcript
  });
</script>`}
                </pre>
              </Paper>

              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "16px",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography sx={{ color: "#000000", fontWeight: 600, mb: 2 }}>
                  Customization Options
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong style={{ color: "#000000" }}>theme</strong>:
                      Visual appearance
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong style={{ color: "#000000" }}>position</strong>:
                      Widget placement
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong style={{ color: "#000000" }}>greeting</strong>:
                      Initial message
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong style={{ color: "#000000" }}>title</strong>: Chat
                      window title
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong style={{ color: "#000000" }}>primaryColor</strong>
                      : Brand color
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong style={{ color: "#000000" }}>avatar</strong>: Chat
                      avatar URL
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 2,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                For best performance, add this code just before the closing
                &lt;/body&gt; tag. The widget is responsive and will work on
                both desktop and mobile devices.
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                Embed via iFrame
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                If you prefer embedding the chatbot directly in your page rather
                than as a popup widget, use our iFrame approach:
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                  <IconButton
                    size="small"
                    onClick={() => copyCode("iframe-code")}
                    sx={{
                      color:
                        copiedSnippet === "iframe-code"
                          ? "#000000"
                          : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {copiedSnippet === "iframe-code" ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
                <pre
                  id="iframe-code"
                  style={{
                    color: "rgba(0, 0, 0, 0.8)",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    overflow: "auto",
                    margin: 0,
                  }}
                >
                  {`<iframe 
  src="https://chat.botlync.ai/embed/YOUR_BOT_ID?theme=light" 
  width="100%" 
  height="600px" 
  frameborder="0"
  allow="microphone">
</iframe>`}
                </pre>
              </Paper>

              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 2,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                This approach is perfect for dedicated help pages or support
                sections of your website where you want the chatbot to be
                immediately visible.
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                }}
              >
                REST API Integration
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                For developers looking to build custom integrations, our REST
                API provides programmatic access to your chatbot:
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                  <IconButton
                    size="small"
                    onClick={() => copyCode("api-code")}
                    sx={{
                      color:
                        copiedSnippet === "api-code"
                          ? "#000000"
                          : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {copiedSnippet === "api-code" ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
                <Typography
                  sx={{ color: "#000000", mb: 2, fontFamily: "monospace" }}
                >
                  // Send a message to your chatbot
                </Typography>
                <pre
                  id="api-code"
                  style={{
                    color: "rgba(0, 0, 0, 0.8)",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    overflow: "auto",
                    margin: 0,
                  }}
                >
                  {`fetch('https://api.botlync.ai/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    botId: 'YOUR_BOT_ID',
    message: 'What are your business hours?',
    sessionId: 'unique-user-session-id',
    context: {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      previousPage: '/products'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                </pre>
              </Paper>

              <Typography
                sx={{
                  color: "rgba(0,0,0,0.7)",
                  mb: 4,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                The API provides endpoints for sending messages, retrieving
                conversation history, managing bot settings, and more. For
                comprehensive documentation on all available endpoints, see our{" "}
                <a
                  href="#api-reference"
                  onClick={() => handleSectionChange("api-reference")}
                  style={{ color: "#000000", textDecoration: "none" }}
                >
                  API Reference
                </a>
                .
              </Typography>

              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid rgba(0,0,0, 0.1)",
                }}
              >
                <Typography sx={{ color: "#000000", fontWeight: 700, mb: 2 }}>
                  Authentication
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "1rem",
                    mb: 2,
                  }}
                >
                  You'll need an API key to authenticate your requests. To
                  generate an API key:
                </Typography>
                <Box
                  component="ol"
                  sx={{ pl: 3, color: "rgba(0,0,0,0.7)", mb: 0 }}
                >
                  <Box component="li" sx={{ mb: 1, fontSize: "1rem" }}>
                    <Typography
                      sx={{
                        fontSize: "inherit",
                        color: "inherit",
                        lineHeight: 1.7,
                      }}
                    >
                      Log in to your Botlync dashboard
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1, fontSize: "1rem" }}>
                    <Typography
                      sx={{
                        fontSize: "inherit",
                        color: "inherit",
                        lineHeight: 1.7,
                      }}
                    >
                      Navigate to Settings → API
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1, fontSize: "1rem" }}>
                    <Typography
                      sx={{
                        fontSize: "inherit",
                        color: "inherit",
                        lineHeight: 1.7,
                      }}
                    >
                      Click "Generate New API Key"
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ fontSize: "1rem" }}>
                    <Typography
                      sx={{
                        fontSize: "inherit",
                        color: "inherit",
                        lineHeight: 1.7,
                      }}
                    >
                      Store your API key securely — it won't be shown again
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  color: "#fff",
                  mb: 3,
                }}
              >
                Mobile SDK Integration
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0,0,0,0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                For native mobile apps, we offer SDKs for iOS and Android:
              </Typography>

              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                      p: 3,
                      borderRadius: "16px",
                      height: "100%",
                      border: "1px solid rgba(0,0,0, 0.1)",
                    }}
                  >
                    <Typography sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
                      iOS Integration
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(0,0,0,0.7)",
                        fontSize: "1rem",
                        mb: 2,
                      }}
                    >
                      Install via CocoaPods:
                    </Typography>
                    <Paper
                      sx={{
                        p: 2,
                        mb: 3,
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid rgba(0,0,0, 0.1)",
                      }}
                    >
                      <pre
                        style={{
                          color: "rgba(0, 0, 0, 0.8)",
                          fontFamily: "monospace",
                          fontSize: "0.9rem",
                          overflow: "auto",
                          margin: 0,
                        }}
                      >
                        {`pod 'BotlyncSDK', '~> 1.0'`}
                      </pre>
                    </Paper>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "rgba(0, 0, 0, 0.5)",
                        color: "#000000",
                        "&:hover": {
                          borderColor: "#000000",
                          background: "rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    >
                      View iOS Documentation
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                      p: 3,
                      borderRadius: "16px",
                      height: "100%",
                      border: "1px solid rgba(0,0,0, 0.1)",
                    }}
                  >
                    <Typography
                      sx={{ color: "#000000", fontWeight: 700, mb: 2 }}
                    >
                      Android Integration
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(0,0,0,0.7)",
                        fontSize: "1rem",
                        mb: 2,
                      }}
                    >
                      Install via Gradle:
                    </Typography>
                    <Paper
                      sx={{
                        p: 2,
                        mb: 3,
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid rgba(0,0,0, 0.1)",
                      }}
                    >
                      <pre
                        style={{
                          color: "rgba(0, 0, 0, 0.8)",
                          fontFamily: "monospace",
                          fontSize: "0.9rem",
                          overflow: "auto",
                          margin: 0,
                        }}
                      >
                        {`implementation 'ai.botlync:sdk:1.0.+'`}
                      </pre>
                    </Paper>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "rgba(0, 0, 0, 0.5)",
                        color: "#000000",
                        "&:hover": {
                          borderColor: "#000000",
                          background: "rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    >
                      View Android Documentation
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <Typography
                sx={{
                  color: "rgba(0,0,0,0.7)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                Our mobile SDKs provide native UI components and full access to
                the Botlync API, allowing you to create seamless in-app chat
                experiences.
              </Typography>
            </Box>
          </>
        );

      case "api-reference":
        return (
          <>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                color: "#fff",
                mb: 4,
              }}
            >
              API Reference
            </Typography>

            <Typography
              sx={{
                color: "rgba(0,0,0,0.7)",
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Our comprehensive REST API allows you to interact with your
              Botlync chatbots programmatically. Use these endpoints to send
              messages, manage conversations, and integrate with your existing
              systems.
            </Typography>

            <Box sx={{ mb: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Chip
                  label="POST"
                  sx={{
                    bgcolor: "#000000",
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    mr: 2,
                    mb: { xs: 2, sm: 0 },
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                    verticalAlign: "middle",
                  }}
                >
                  /v1/chat
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "rgba(0,0,0,0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                Send a message to your chatbot and receive a response.
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
                  Request Body
                </Typography>
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(0,0,0, 0.1)",
                  }}
                >
                  <pre
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      overflow: "auto",
                      margin: 0,
                    }}
                  >
                    {`{
  "botId": "string",        // Required: Your bot's unique identifier
  "message": "string",      // Required: The user's message
  "sessionId": "string",    // Required: Unique identifier for the conversation
  "context": {              // Optional: Additional context for the conversation
    "userName": "string",   // Optional: User's name
    "userEmail": "string",  // Optional: User's email
    "custom": {}            // Optional: Any custom data as key-value pairs
  }
}`}
                  </pre>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
                  Response
                </Typography>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(0,0,0, 0.1)",
                  }}
                >
                  <pre
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      overflow: "auto",
                      margin: 0,
                    }}
                  >
                    {`{
  "id": "msg_123456789",     // Unique ID for this message
  "botId": "bot_123456789",  // Your bot's ID
  "response": "string",      // The bot's response text
  "sessionId": "string",     // The conversation session ID
  "timestamp": "string",     // ISO 8601 timestamp
  "actions": [               // Optional: Suggested actions for the user
    {
      "type": "button",      // Action type (button, link, etc.)
      "text": "string",      // Display text
      "value": "string"      // Action value
    }
  ],
  "metadata": {              // Additional information about the response
    "confidence": 0.95,      // Confidence score (0-1)
    "intent": "string",      // Detected intent
    "source": "string"       // Source of the answer (e.g., "knowledge_base")
  }
}`}
                  </pre>
                </Paper>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Chip
                  label="GET"
                  sx={{
                    bgcolor: "#4CAF50",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    mr: 2,
                    mb: { xs: 2, sm: 0 },
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                    verticalAlign: "middle",
                  }}
                >
                  /v1/conversations/{"{sessionId}"}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "rgba(0,0,0,0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                Retrieve conversation history for a specific session.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
                  Parameters
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ color: "#000000", mb: 1, fontWeight: 600 }}>
                    Path Parameters
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography
                      sx={{ color: "rgba(0,0,0,0.7)", fontSize: "1rem" }}
                    >
                      <strong style={{ color: "#fff" }}>sessionId</strong>{" "}
                      (string, required) - The unique identifier for the
                      conversation session
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ color: "#000000", mb: 1, fontWeight: 600 }}>
                    Query Parameters
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography
                      sx={{
                        color: "rgba(0,0,0,0.7)",
                        fontSize: "1rem",
                        mb: 1,
                      }}
                    >
                      <strong style={{ color: "#fff" }}>limit</strong> (integer,
                      optional) - Maximum number of messages to return (default:
                      50)
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(0,0,0,0.7)", fontSize: "1rem" }}
                    >
                      <strong style={{ color: "#fff" }}>before</strong> (string,
                      optional) - Return messages before this timestamp (ISO
                      8601 format)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography
              sx={{
                color: "rgba(0,0,0,0.7)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Our API documentation includes many more endpoints for managing
              your chatbots, analyzing performance, and integrating with
              third-party services. For the complete API reference, download our
              API documentation:
            </Typography>

            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #000000 30%, #00B8D4 90%)",
                borderRadius: "12px",
                py: 1.5,
                px: 4,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Download Full API Documentation
            </Button>
          </>
        );

      case "faqs":
        return (
          <>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                color: "#fff",
                mb: 4,
              }}
            >
              Frequently Asked Questions
            </Typography>

            <Box sx={{ mb: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  How do I train my chatbot with my business information?
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  You can train your chatbot by uploading documents (PDFs, Word
                  docs, etc.), adding FAQs manually, or connecting your
                  knowledge base via API. The more information you provide, the
                  more accurately your chatbot will respond to user inquiries.
                  We recommend starting with your most common customer questions
                  and adding more specialized knowledge over time.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  Can I customize the chatbot's appearance to match my brand?
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Yes! You can fully customize your chatbot's appearance,
                  including colors, fonts, avatar, and chat window design. In
                  your dashboard, go to Settings → Appearance to adjust these
                  elements. You can also add your logo and choose from light or
                  dark themes, or create a custom theme that perfectly matches
                  your brand identity.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  How do I connect my chatbot to my CRM or help desk?
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Botlync integrates with popular CRM and help desk systems
                  including Salesforce, HubSpot, Zendesk, and more. In your
                  dashboard, go to Settings → Integrations and select your
                  platform. You'll need to authorize the connection and
                  configure which data should be shared. For custom
                  integrations, you can use our webhooks to send data to any
                  system.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  What languages does Botlync support?
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Botlync supports over 30 languages including English, Spanish,
                  French, German, Chinese, Japanese, Arabic, and many more. You
                  can configure multiple languages for a single chatbot or
                  create language-specific chatbots. Our AI automatically
                  detects the user's language and responds accordingly, making
                  it perfect for global businesses.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  How do I handle complex queries that the chatbot can't answer?
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  You can set up human handoff for scenarios where the AI can't
                  provide a satisfactory answer. Configure confidence thresholds
                  to determine when to suggest a human agent. You can integrate
                  with live chat tools or collect contact information to follow
                  up. Our analytics help you identify common queries that your
                  chatbot struggles with, so you can improve its training over
                  time.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  Is Botlync GDPR and CCPA compliant?
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Yes, Botlync is compliant with major privacy regulations
                  including GDPR (Europe) and CCPA (California). We provide
                  tools to help you maintain compliance, including data
                  retention controls, user data export and deletion
                  capabilities, and consent management features. For more
                  details, please refer to our Privacy Policy and Data
                  Processing Agreement.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                bgcolor: "rgba(0,229,255,0.05)",
                p: 4,
                borderRadius: "16px",
                border: "1px solid rgba(0,229,255,0.2)",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 2,
                  fontSize: "1.25rem",
                }}
              >
                Still have questions?
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0,0,0,0.7)",
                  mb: 3,
                  fontSize: "1.1rem",
                }}
              >
                Our support team is ready to help you get the most out of
                Botlync.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #000000 30%, #00B8D4 90%)",
                  borderRadius: "12px",
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Contact Support
              </Button>
            </Box>
          </>
        );

      default:
        return (
          <Typography
            sx={{
              color: "rgba(0,0,0,0.7)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            Select a section from the sidebar to view documentation.
          </Typography>
        );
    }
  };

  const renderSidebar = () => {
    return (
      <Box
        sx={{
          width: "100%",
          borderRight: isMedium ? "none" : "1px solid rgba(0, 0, 0, 0.1)",
          height: "100%",
        }}
      >
        <List component="nav" sx={{ py: 0 }}>
          {docSections.map((section) => (
            <ListItem
              key={section.id}
              sx={{
                py: 1.5,
                px: 3,
                borderLeft:
                  activeSection === section.id
                    ? "3px solid #000000"
                    : "3px solid transparent",
                background:
                  activeSection === section.id
                    ? "rgba(0, 0, 0, 0.05)"
                    : "transparent",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.05)",
                },
                cursor: "pointer",
              }}
              onClick={() => handleSectionChange(section.id)}
            >
              <Box
                sx={{
                  mr: 2,
                  color:
                    activeSection === section.id
                      ? "#000000"
                      : "rgba(0, 0, 0, 0.5)",
                }}
              >
                {section.icon}
              </Box>
              <ListItemText
                primary={section.label}
                primaryTypographyProps={{
                  sx: {
                    color: activeSection === section.id ? "#000000" : "#2d2d2d",
                    fontWeight: activeSection === section.id ? 600 : 400,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFD", color: "black", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Documentation Content */}
      <Box sx={{ pt: { xs: 8, md: 10 } }}>
        <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 8 }, pb: 10 }}>
          {/* Document Header */}
          <Box
            sx={{
              mb: 6,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: 900,
                color: "#000000",
                mb: 2,
              }}
            >
              Documentation
            </Typography>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.7)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                maxWidth: "800px",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Learn how to set up, customize, and integrate Botlync's AI chatbot
              platform to enhance your customer experience.
            </Typography>

            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                maxWidth: "600px",
                bgcolor: "rgba(0, 0, 0, 0.03)",
                borderRadius: "12px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                p: 1,
              }}
            >
              <IconButton sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                <SearchIcon />
              </IconButton>
              <input
                type="text"
                placeholder="Search documentation..."
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "black",
                  width: "100%",
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              />
            </Box>
          </Box>

          {/* Mobile Menu Toggle */}
          {isMedium && (
            <Box sx={{ mb: 4 }}>
              <Button
                variant="outlined"
                startIcon={<MenuIcon />}
                onClick={toggleDrawer(true)}
                sx={{
                  color: "#000000",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    borderColor: "#000000",
                    background: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                Documentation Menu
              </Button>
            </Box>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={isMedium && drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: 280,
                bgcolor: "#F8FAFD",
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box sx={{ pt: 8, height: "100%" }}>{renderSidebar()}</Box>
          </Drawer>

          {/* Content Grid */}
          <Grid container spacing={4}>
            {/* Sidebar - desktop only */}
            {!isMedium && (
              <Grid item xs={12} md={3} lg={2.5}>
                {renderSidebar()}
              </Grid>
            )}

            {/* Main Content */}
            <Grid item xs={12} md={9} lg={9.5}>
              <Paper
                sx={{
                  p: { xs: 3, md: 6 },
                  borderRadius: "24px",
                  background: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,0,0, 0.1)",
                  minHeight: "70vh",
                }}
              >
                {renderDocContent()}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          background:
            "linear-gradient(35deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.623) 100%)",
          color: "#fff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="flex-start">
            {/* Brand */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "1.75rem", md: "2rem" },
                }}
              >
                Botlync
              </Typography>
              <Typography
                sx={{ color: "#bbb", fontSize: "1rem", lineHeight: 1.6 }}
              >
                Empowering businesses with next-generation AI solutions.
                Transform your customer experience today.
              </Typography>
            </Grid>

            {/* Navigation */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, fontSize: "1.25rem" }}
              >
                Navigation
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "Docs", path: "/docs" },
                ].map((item) => (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      sx={{
                        color: "#fff",
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontSize: "1rem",
                        px: 0,
                        "&:hover": {
                          textDecoration: "underline",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Legal */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, fontSize: "1.25rem" }}
              >
                Legal
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { name: "Privacy Policy", path: "/privacy-policy" },
                  { name: "Terms of Service", path: "/terms-of-service" },
                ].map((item) => (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      sx={{
                        color: "#fff",
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontSize: "1rem",
                        px: 0,
                        "&:hover": {
                          textDecoration: "underline",
                          backgroundColor: "transparent",
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

          {/* Bottom Bar */}
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              borderTop: "1px solid #333",
              pt: 3,
            }}
          >
            <Typography sx={{ color: "#888", fontSize: "0.875rem" }}>
              © {new Date().getFullYear()} Botlync. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
