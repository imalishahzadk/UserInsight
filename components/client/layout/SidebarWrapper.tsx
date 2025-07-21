import { Box } from "@mui/material";
import React, { useEffect } from "react";

const SidebarWrapper = ({
  children,
  isMobile = false,
  isSidebarOpen = true,
  setIsSideBarOpen,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSideBarOpen: (state: boolean) => void;
}) => {
  useEffect(() => {
    if (isMobile) {
      setIsSideBarOpen(false);
    }
  }, [isMobile]);

  if (!isMobile) {
    return (
      <Box
        sx={{
          width: isSidebarOpen ? "250px" : 0,
          flexShrink: 0,
          bgcolor: "black",
          transition: "width 0.3s ease",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: "auto",
          zIndex: 1200,
        }}
      >
        {children}
      </Box>
    );
  } else if (isMobile) {
    return (
      <>
        <Box
          sx={{
            position: "fixed",
            left: isSidebarOpen ? 0 : "-250px",
            width: "250px",
            height: "100vh",
            bgcolor: "black",
            transition: "left 0.3s ease",
            zIndex: 1200,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
        <Box
          onClick={() => setIsSideBarOpen(false)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 1100,
          }}
        />
      </>
    );
  }

  return <div>SidebarWrapper</div>;
};

export default SidebarWrapper;
