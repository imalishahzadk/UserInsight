"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/layout/Navbar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { ADMIN_LOGIN_ROUTE, CLIENT_LOGIN_ROUTE } from "@/core/routes";
import BarChartIcon from "@mui/icons-material/BarChart";

// Team members data (placeholder)
const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "CEO & Founder",
    image: "/team/team1.jpg", // placeholder - this file doesn't exist yet
    bio: "Passionate about AI and its potential to transform customer interactions.",
  },
  {
    name: "Mark Williams",
    position: "CTO",
    image: "/team/team2.jpg", // placeholder - this file doesn't exist yet
    bio: "AI engineering expert with 15+ years experience in conversational systems.",
  },
  {
    name: "David Chen",
    position: "Head of Product",
    image: "/team/team3.jpg", // placeholder - this file doesn't exist yet
    bio: "Product visionary focused on creating intuitive, powerful AI solutions.",
  },
];

// Core values data
const coreValues = [
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: "#ffffff" }} />,
    title: "Innovation",
    description:
      "We constantly push the boundaries of AI to create smarter, more intuitive solutions.",
  },
  {
    icon: <EngineeringIcon sx={{ fontSize: 40, color: "#ffffff" }} />,
    title: "Quality",
    description:
      "We're committed to excellence in everything we build, from code to customer service.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#ffffff" }} />,
    title: "Customer Success",
    description:
      "Your success is our success. We're dedicated to helping your business thrive with AI.",
  },
];

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ bgcolor: "#0A0F1E", color: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          display: "flex",
          alignItems: "center",

          overflow: "hidden",
          pt: { xs: 8 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            {/* Text Section */}
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.25rem", sm: "3rem", md: "3.5rem" },
                  fontWeight: 800,
                  color: "#ffffff",
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Powering the Future of
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background:
                      "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                    paddingBottom: "10px",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 200%",
                    animation: "gradientShift 8s ease infinite",
                  }}
                >
                  Conversational AI
                </Box>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  color: "#ffffff",
                  mb: 4,
                  maxWidth: "600px",
                  lineHeight: 1.6,
                }}
              >
                Botlync was founded with a simple mission: to make advanced AI
                technology accessible to businesses of all sizes. We're
                transforming how companies engage with their customers through
                intelligent conversation.
              </Typography>

              <Button
                variant="contained"
                size="large"
                component={Link}
                href={CLIENT_LOGIN_ROUTE}
                sx={{
                  background:
                    "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                  borderRadius: "12px",
                  py: 2,
                  px: 6,
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: "0 8px 20px rgba(115, 103, 240, 0.4)",
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(115, 103, 240, 0.6)",
                    background:
                      "linear-gradient(45deg, #6354e0 30%, #bd8cf7 90%)",
                  },
                }}
              >
                Get Started
              </Button>
            </Grid>

            {/* Image/Icon Section */}
            {/* <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "300px", md: "400px" },
                  border: "2px solid #444",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#111",
                }}
              >
                <EmojiObjectsIcon sx={{ fontSize: 100, color: "#666" }} />
              </Box>
            </Grid> */}
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Box
        sx={{
          py: { xs: 8, md: 15 },
          background: "#0A0F1E",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                color: "#fff",
                mb: 3,
              }}
            >
              Our Story
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "rgba(255,255,255,0.7)",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              How we went from a small idea to revolutionizing customer
              interactions
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "300px", md: "400px" },
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 80px rgba(0,0,0,0.3)",
                }}
              >
                {/* Placeholder for actual office image */}
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "rgba(30, 30, 50, 0.4)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(115, 103, 240, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MeetingRoomIcon
                    sx={{ fontSize: 100, color: "rgba(255,255,255,0.2)" }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontWeight: 700,
                  color: "#fff",
                  mb: 3,
                }}
              >
                From Vision to Reality
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.7)",
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                Botlync began in 2022 when our founders recognized a fundamental
                problem: businesses were struggling to provide personalized,
                efficient customer service at scale. AI chatbots existed, but
                they were either too simplistic or required extensive technical
                expertise to implement.
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.7)",
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                We set out to build something different—an AI platform that
                combined sophisticated natural language processing with an
                intuitive no-code interface, making truly intelligent
                conversations accessible to any business.
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                }}
              >
                Today, our AI assistants help thousands of businesses across
                industries deliver exceptional customer experiences while saving
                time and resources.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Values Section */}
      <Box
        sx={{
          py: { xs: 8, md: 15 },
          background:
            "radial-gradient(circle at 50% 0%, rgba(115,103,240,0.1) 0%, rgba(10,15,30,1) 70%)",
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                color: "#ffffff",
                mb: 2,
              }}
            >
              Our Core Values
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                color: "#ffffff",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              The principles that guide everything we do
            </Typography>
          </Box>

          {/* Cards */}
          <Grid container spacing={4}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    background: "rgba(30, 30, 50, 0.4)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(115, 103, 240, 0.2)",
                    height: "100%",
                    transition: "border-color 0.3s ease",
                    "&:hover": {
                      borderColor: "#252525",
                    },
                    overflow: "hidden",
                    "&::before": {
                      content: "''",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
                    },
                  }}
                >
                  <Box sx={{ mb: 3, color: "#ffffff" }}>{value.icon}</Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#ffffff",
                      mb: 1.5,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Team Section (Simplified version) */}
      <Box
        sx={{
          py: { xs: 8, md: 15 },
          background: "#0A0F1E",
        }}
      >
        <Container maxWidth="lg">
          {/* Heading */}
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                color: "#ffffff",
                mb: 2,
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                color: "#bbb",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              The brilliant minds behind Botlync
            </Typography>
          </Box>

          {/* Team Cards */}
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: "20px",
                    background: "rgba(30, 30, 50, 0.4)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(115, 103, 240, 0.2)",
                    height: "100%",
                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, border-color 0.3s ease",

                    "&::before": {
                      content: "''",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
                    },
                  }}
                >
                  <Avatar
                    // src={member.avatar} // optionally use images
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                      border: "2px solid #ffffff",
                    }}
                  >
                    {member.name.charAt(0)}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#ffffff", mb: 0.5 }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      mb: 2,
                    }}
                  >
                    {member.position}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#ffffff",
                      lineHeight: 1.6,
                    }}
                  >
                    {member.bio}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              px: { xs: 3, md: 6 },
              py: { xs: 5, md: 8 },
              borderRadius: "32px",
              background: "rgba(30, 30, 50, 0.4)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(115, 103, 240, 0.2)",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 800,
                mb: 2,
                color: "#ffffff",
              }}
            >
              Supercharge Your Customer{" "}
              <span
                style={{
                  display: "block",
                  background:
                    "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                  paddingBottom: "10px",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 8s ease infinite",
                }}
              >
                {" "}
                Experience
              </span>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "rgba(255, 255, 255, 0.8)",
                maxWidth: "720px",
                mx: "auto",
                mb: 5,
                lineHeight: 1.7,
              }}
            >
              Elevate support, increase engagement, and grow revenue with
              Botlync — the ultimate solution for modern businesses.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                href={CLIENT_LOGIN_ROUTE}
                sx={{
                  background:
                    "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                  borderRadius: "12px",
                  py: 2,
                  px: 6,
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: "0 8px 20px rgba(115, 103, 240, 0.4)",
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(115, 103, 240, 0.6)",
                    background:
                      "linear-gradient(45deg, #6354e0 30%, #bd8cf7 90%)",
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/pricing"
                sx={{
                  border: "1px solid  #7367f0 ",
                  borderRadius: "12px",
                  py: 2,
                  px: 6,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background: "transparent",
                  color: "#ce9ffc",
                  boxShadow: "0 8px 20px rgba(115, 103, 240, 0.4)",
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(115, 103, 240, 0.6)",
                    background:
                      "linear-gradient(45deg, #6354e0 30%, #bd8cf7 90%)",
                  },
                }}
              >
                View Pricing
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "#070B14",
          color: "white",
          py: { xs: 10, md: 15 },
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(115, 103, 240, 0.15)",
          "&::before": {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: "30%",
            width: "40%",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(115, 103, 240, 0) 0%, rgba(115, 103, 240, 0.5) 50%, rgba(115, 103, 240, 0) 100%)",
            boxShadow: "0 0 8px rgba(115, 103, 240, 0.3)",
          },
          "&::after": {
            content: "''",
            position: "absolute",
            top: "5%",
            right: "-150px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "#7367f0",
            opacity: 0.03,
            filter: "blur(80px)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    background:
                      "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 200%",
                    animation: "gradientShift 8s ease infinite",
                  }}
                >
                  UserInsight
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  Empowering businesses with intelligent website analytics.
                  Transform visitor data into actionable insights to optimize
                  your user experience.
                </Typography>

                <Box
                  sx={{
                    mt: "auto",
                    pt: 2,
                    borderTop: "1px solid rgba(115, 103, 240, 0.1)",
                    display: "flex",
                    gap: 3,
                  }}
                >
                  {/* Social media icons - we'll use Material UI icons */}
                  {[
                    <svg
                      key="twitter"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>,
                    <svg
                      key="facebook"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>,
                    <svg
                      key="linkedin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>,
                  ].map((icon, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        bgcolor: "rgba(115, 103, 240, 0.1)",
                        borderRadius: "12px",
                        p: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#7367f0",
                          bgcolor: "rgba(115, 103, 240, 0.2)",
                          transform: "translateY(-3px)",
                          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      {icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: "#fff",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    width: "40px",
                    height: "3px",
                    background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
                    borderRadius: "2px",
                  },
                }}
              >
                Navigation
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { name: "Home", path: "/" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "About", path: "/about" },
                  { name: "Contact", path: "/contact" },
                  { name: "Blog", path: "/blog" },
                ].map((item) => (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      startIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      }
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        justifyContent: "flex-start",
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        fontWeight: 400,
                        textTransform: "none",
                        p: 0,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#7367f0",
                          background: "transparent",
                          transform: "translateX(5px)",
                          "& .MuiButton-startIcon": {
                            color: "#7367f0",
                          },
                        },
                        "& .MuiButton-startIcon": {
                          marginRight: "8px",
                          transition: "all 0.3s ease",
                          color: "rgba(115, 103, 240, 0.7)",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: "#fff",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    width: "40px",
                    height: "3px",
                    background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
                    borderRadius: "2px",
                  },
                }}
              >
                Legal
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mb: 4,
                }}
              >
                {[
                  { name: "Privacy Policy", path: "/privacy-policy" },
                  { name: "Terms of Service", path: "/terms-of-service" },
                  { name: "Cookie Policy", path: "/cookie-policy" },
                  { name: "GDPR Compliance", path: "/gdpr" },
                ].map((item) => (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      startIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      }
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        justifyContent: "flex-start",
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        fontWeight: 400,
                        textTransform: "none",
                        p: 0,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#7367f0",
                          background: "transparent",
                          transform: "translateX(5px)",
                          "& .MuiButton-startIcon": {
                            color: "#7367f0",
                          },
                        },
                        "& .MuiButton-startIcon": {
                          marginRight: "8px",
                          transition: "all 0.3s ease",
                          color: "rgba(115, 103, 240, 0.7)",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>

              <Box
                sx={{
                  p: 3,
                  background: "rgba(115, 103, 240, 0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(115, 103, 240, 0.15)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#fff", mb: 1, fontWeight: 600 }}
                >
                  Subscribe to Our Newsletter
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)", mb: 3 }}
                >
                  Get the latest updates and offers
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <TextField
                    placeholder="Your email"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(0,0,0,0.2)",
                        borderRadius: "8px",
                        color: "#fff",
                        "& fieldset": {
                          borderColor: "rgba(115, 103, 240, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(115, 103, 240, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#7367f0",
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "rgba(255,255,255,0.4)",
                        opacity: 1,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "unset",
                      bgcolor: "#7367f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(115, 103, 240, 0.4)",
                      transition: "all 0.3s ease",
                      px: 2,
                      "&:hover": {
                        bgcolor: "#6354e0",
                        boxShadow: "0 6px 15px rgba(115, 103, 240, 0.6)",
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </Button>
                </Box>

                {/* Decorative element */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-30px",
                    right: "-30px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "rgba(115, 103, 240, 0.15)",
                    filter: "blur(30px)",
                    zIndex: 0,
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 8,
              pt: 3,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "flex-start" },
              gap: 2,
            }}
          >
            <Typography
              sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}
            >
              © {new Date().getFullYear()} UserInsight. All rights reserved.
            </Typography>

            <Box sx={{ display: "flex", gap: 3 }}>
              {[
                { name: "Support", path: "/support" },
                { name: "Careers", path: "/careers" },
                { name: "FAQ", path: "/faq" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.875rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#7367f0",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
