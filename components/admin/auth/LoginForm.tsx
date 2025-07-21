"use client";

import { FieldErrorMsg } from "@/components/shared/ui/Input";
import useLogin from "@/hooks/admin/auth/use-login";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import Spinner from "@/components/shared/ui/Spinner";
import Link from "next/link";
import { CLIENT_LOGIN_ROUTE } from "@/core/routes";
import { Button } from "@mui/material";

const LoginForm = () => {
  const {
    formInstance: {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    },
    handleLogin,
  } = useLogin();

  return (
    <div className="w-full max-w-md rounded-3xl p-10 relative overflow-hidden border border-[#7367f033] shadow-[0_15px_40px_rgba(0,0,0,0.3),_0_0_20px_rgba(115,103,240,0.2)] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#7367f0] before:to-[#ce9ffc] bg-[rgba(30,30,50,0.4)] backdrop-blur-xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
        <p className="text-white">Sign in</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-8">
        <div>
          <label htmlFor="email" className="block text-white mb-3 font-medium">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-5 py-4 bg-[#ffffffc] rounded-xl border border-[#7367f033] text-[#ffffff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#cd9ffcb9] focus:border-[#ce9ffc] outline-none transition-all"
              placeholder="name@company.com"
              {...register("email")}
            />
            <EmailIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <FieldErrorMsg
            name="email"
            errors={errors}
            className="text-red-500 mt-2"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-white mb-3 font-medium"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-5 py-4 bg-[rgba(255,255,255,0.05)] rounded-xl border border-[#7367f033] text-[#ffffff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#cd9ffcb9] focus:border-[#ce9ffc] outline-none transition-all"
              placeholder="••••••••"
              {...register("password")}
            />
          </div>
          <FieldErrorMsg
            name="password"
            errors={errors}
            className="text-red-500 mt-2"
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
            backgroundSize: "200% 200%",
            animation: "gradientShift 8s ease infinite",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(115, 103, 240, 0.4)",
            borderRadius: "12px",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(115, 103, 240, 0.6)",
              background: "linear-gradient(45deg, #6354e0 30%, #bd8cf7 90%)",
            },
          }}
        >
          {isSubmitting ? <Spinner size={18} /> : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500">
          <Link
            href={CLIENT_LOGIN_ROUTE}
            className="text-[#ffffff] font-semibold hover:text-[#7367f0] transition-colors"
          >
            Client Login
          </Link>
        </p>
      </div>

      {/* 
      <audio ref={successAudioRef} preload="auto">
        <source src="/sounds/success.mp3" type="audio/mpeg" />
        <source src="/sounds/success.wav" type="audio/wav" />
      </audio>
      
      <audio ref={errorAudioRef} preload="auto">
        <source src="/sounds/error.mp3" type="audio/mpeg" />
        <source src="/sounds/error.wav" type="audio/wav" />
      </audio>
      */}
    </div>
  );
};

export default LoginForm;
