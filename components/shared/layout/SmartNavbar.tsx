"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const SmartNavbar = () => {
  const pathname = usePathname();

  // Don't show navbar on login pages
  if (pathname?.includes("/auth")) {
    return null;
  }

  // Show transparent navbar on landing page
  const isTransparent = pathname === "/";

  return <Navbar />;
};

export default SmartNavbar;
