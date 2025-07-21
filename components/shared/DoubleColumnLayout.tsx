import React, { ReactNode } from "react";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TuneIcon from "@mui/icons-material/Tune";
import Link from "next/link";
import { Box } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

const DoubleColumnLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center font-sans">
      <div className="max-w-screen-2xl w-full flex flex-col md:flex-row overflow-hidden layout-container">
        {/* Left Section */}
        <div className="left-section w-full md:w-1/2 bg-[#7367f033] p-10 flex flex-col justify-center relative">
          <div className="mb-10">
            <Link href="/" className="link-wrapper">
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
                <Box className="icon-wrapper">
                  <BarChartIcon className="icon" />
                </Box>
                <div className="brand-name">UserInsight</div>
              </Box>
            </Link>
          </div>

          <div>
            <h1 className="heading text-white">
              Transform Data into
              <span className="highlight-text">Actionable Insights</span>
            </h1>

            <div className="space-y-6">
              <FeatureItem
                icon={<InsightsIcon className="text-[#fff]" />}
                text="Real-time analytics dashboard"
              />
              <FeatureItem
                icon={<AutoGraphIcon className="text-[#fff]" />}
                text="Automated reports & KPIs"
              />
              <FeatureItem
                icon={<TuneIcon className="text-[#fff]" />}
                text="Highly customizable workflows"
              />
            </div>
          </div>

          <div className="footer">© 2025 UserInsight Inc.</div>
        </div>

        {/* Right Section */}
        <div className="right-section w-full md:w-1/2 p-10 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="flex items-center gap-4">
    <div className="feature-icon">{icon}</div>
    <p className="text-gray-700 text-white font-medium">{text}</p>
  </div>
);

export default DoubleColumnLayout;
