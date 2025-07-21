import { cn } from "@/utils";
import React from "react";

const Button = ({ className = "", disabled = false, ...props }) => {
  return (
    <button
      className={cn(
        "w-full px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600",
        className
      )}
      style={{
        opacity: disabled ? "0.7" : 1,
      }}
      {...props}
    />
  );
};

export default Button;
