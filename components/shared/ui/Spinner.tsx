import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = ({ size = 18 }) => {
  return <CircularProgress size={size} sx={{ color: "#7367f0" }} />;
};

export default Spinner;
