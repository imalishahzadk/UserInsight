"use client";

import React from 'react';
import {
  Typography,
  Box,
  Modal,
  IconButton,
  Button,
} from '@mui/material';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CodeIcon from "@mui/icons-material/Code";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import InsightsIcon from "@mui/icons-material/Insights";
import BarChartIcon from "@mui/icons-material/BarChart";
import Link from "next/link";
import { CLIENT_LOGIN_ROUTE } from "@/core/routes";

interface HowItWorksModalProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const HowItWorksModal = ({ open, onClose, isMobile }: HowItWorksModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="how-it-works-modal"
      closeAfterTransition
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '95%' : '80%',
          maxWidth: 1000,
          maxHeight: '90vh',
          bgcolor: 'rgba(26, 26, 46, 0.95)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(115, 103, 240, 0.3)',
          borderRadius: 4,
          p: 0,
          border: '1px solid rgba(115, 103, 240, 0.2)',
          backdropFilter: 'blur(20px)',
          overflow: 'auto',
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(115, 103, 240, 0.2)',
            padding: 2.5,
            position: 'sticky',
            top: 0,
            background: 'rgba(26, 26, 46, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              background: 'linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How UserInsight Works
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: '#fff',
              bgcolor: 'rgba(115, 103, 240, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(115, 103, 240, 0.2)',
              },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* Modal Content */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {/* Introduction */}
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                mb: 2
              }}
            >
              Get powerful website analytics with just a few simple steps. 
              Our seamless integration process makes it easy to start gathering 
              valuable insights about your visitors.
            </Typography>
          </Box>

          {/* Steps */}
          <Box sx={{ mb: 6 }}>
            {[
              {
                title: "Add Our Script",
                description: "Copy our lightweight tracking script and add it to your website's header. It takes less than 5 minutes to integrate.",
                icon: <CodeIcon sx={{ fontSize: { xs: 36, md: 48 }, color: "#7367f0" }} />,
                code: `<script src="https://userinsight.ai/tracking/YOUR_SITE_ID.js"></script>`,
              },
              {
                title: "Configure Your Preferences",
                description: "Set up which user interactions you want to track. Customize event tracking for clicks, form submissions, page views, and more.",
                icon: <SettingsSuggestIcon sx={{ fontSize: { xs: 36, md: 48 }, color: "#7367f0" }} />,
                code: `UserInsight.init({
  trackClicks: true,
  trackForms: true,
  sessionTimeout: 30
});`,
              },
              {
                title: "Watch Data Flow In",
                description: "As users interact with your site, data begins flowing into your dashboard instantly. No waiting period required.",
                icon: <InsightsIcon sx={{ fontSize: { xs: 36, md: 48 }, color: "#7367f0" }} />,
              },
              {
                title: "Analyze & Optimize",
                description: "Use our intuitive dashboard to identify patterns, track conversions, and make data-driven decisions to improve your site.",
                icon: <BarChartIcon sx={{ fontSize: { xs: 36, md: 48 }, color: "#7367f0" }} />,
              },
            ].map((step, index) => (
              <Box 
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 3, md: 4 },
                  mb: 5,
                  position: "relative",
                  "&::after": index < 3 ? {
                    content: "''",
                    position: "absolute",
                    left: { xs: "30px", md: "40px" },
                    bottom: { xs: "-40px", md: "-30px" },
                    width: { xs: "2px", md: "3px" },
                    height: { xs: "35px", md: "25px" },
                    background: "linear-gradient(to bottom, rgba(115, 103, 240, 0.7), rgba(115, 103, 240, 0))",
                    display: { xs: "block", md: "block" },
                  } : {},
                }}
              >
                {/* Step number and icon */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(115, 103, 240, 0.1)",
                      border: "1px solid rgba(115, 103, 240, 0.2)",
                      position: "relative",
                      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(115, 103, 240, 0.2)",
                      "&::before": {
                        content: `"${index + 1}"`,
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "#7367f0",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "14px",
                        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                      }
                    }}
                  >
                    {step.icon}
                  </Box>
                </Box>
                
                {/* Step content */}
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 1, 
                      color: "#fff",
                      fontSize: { xs: "1.1rem", md: "1.25rem" }
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: "rgba(255, 255, 255, 0.7)", 
                      mb: step.code ? 3 : 0,
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      lineHeight: 1.6
                    }}
                  >
                    {step.description}
                  </Typography>
                  
                  {/* Code sample if available */}
                  {step.code && (
                    <Box 
                      sx={{
                        p: 3,
                        mt: 2,
                        borderRadius: "12px",
                        background: "rgba(15, 15, 25, 0.8)",
                        border: "1px solid rgba(115, 103, 240, 0.15)",
                        fontFamily: "monospace",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: "absolute", 
                          top: 0, 
                          right: 0, 
                          borderRadius: "0 0 0 8px",
                          padding: "4px 10px", 
                          background: "rgba(115, 103, 240, 0.2)",
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        Code Sample
                      </Box>
                      <pre 
                        style={{ 
                          margin: 0, 
                          color: "#fff", 
                          fontSize: "0.9rem",
                          overflow: "auto",
                          maxWidth: "100%"
                        }}
                      >
                        <code>{step.code}</code>
                      </pre>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Call to action */}
          <Box 
            sx={{ 
              textAlign: "center", 
              mt: 6, 
              mb: 2, 
              position: "relative",
              padding: 3,
              background: "rgba(115, 103, 240, 0.05)",
              borderRadius: "16px",
              border: "1px solid rgba(115, 103, 240, 0.15)",
              overflow: "hidden",
              "&::before": {
                content: "''",
                position: "absolute",
                bottom: "-80px",
                right: "-80px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "#7367f0",
                opacity: 0.1,
                filter: "blur(70px)",
                zIndex: 0,
              },
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                fontWeight: 700,
                color: "#fff",
                position: "relative",
                zIndex: 1,
              }}
            >
              Ready to get started?
            </Typography>
            <Link href={CLIENT_LOGIN_ROUTE} passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 8s ease infinite",
                  py: 1.5,
                  px: 4,
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#fff",
                  textTransform: "none",
                  boxShadow: "0 8px 20px rgba(115, 103, 240, 0.4)",
                  position: "relative",
                  zIndex: 1,
                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(115, 103, 240, 0.6)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                Create Free Account
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default HowItWorksModal;