import React, { useState } from "react";
import SidebarWrapper from "./SidebarWrapper";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

import { Box, useMediaQuery, useTheme } from "@mui/material";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#0A0F1E",
      }}
    >
      <SidebarWrapper
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      >
        <Sidebar />
      </SidebarWrapper>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          marginLeft: !isMobile ? (isSidebarOpen ? "250px" : 0) : 0,
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Fixed Top Navigation */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            width: "100%",
            bgcolor: "white",
          }}
        >
          <TopNav onToggleSidebar={() => setIsSideBarOpen(!isSidebarOpen)} />
        </Box>

        {/* Scrollable Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowX: "hidden",
            overflowY: "auto",
            bgcolor: "#0A0F1E",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "3px",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutWrapper;
