import { CircularProgress } from "@mui/material";
import React from "react";

const PageSpinner = ({ size = 30 }) => {
  return (
    <div className="flex justify-center items-center py-10 bg-[#0A0F1E] h-[100dvh]">
      <CircularProgress size={size} thickness={4} sx={{ color: "#7367f0" }} />
    </div>
  );
};

export default PageSpinner;
