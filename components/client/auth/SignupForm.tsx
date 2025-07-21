"use client";

import { FieldErrorMsg } from "@/components/shared/ui/Input";
import useSignup from "@/hooks/client/auth/use-signup";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Spinner from "@/components/shared/ui/Spinner";
import Link from "next/link";
import { CLIENT_LOGIN_ROUTE } from "@/core/routes";
import { Button } from "@mui/material";

const SignupForm = () => {
  const {
    formInstance: {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    },
    handleSignup,
  } = useSignup();

  return (
    <div className="signup-card w-full max-w-md rounded-3xl p-10 relative overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome To</h2>
        <p className="text-white">Create an account</p>
      </div>

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-8">
        {/* Name Field */}
        <div>
          <label className="block text-white mb-3 font-medium">Name</label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-5 py-4 bg-[rgba(255, 255, 255, 0.05)] border border-gray/10 rounded-xl border-[#7367f033] text-[#ffffff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#cd9ffcb9] focus:border-[#ce9ffc] outline-none transition-all"
              {...register("name", { required: "Name is required." })}
              placeholder="Enter your name"
            />
            <PersonIcon className="absolute right-5 top-4 text-gray-500" />
          </div>
          <FieldErrorMsg
            name="name"
            errors={errors}
            className="text-red-500 font-medium mt-2"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-white mb-3 font-medium">Email</label>
          <div className="relative">
            <input
              type="email"
              className="w-full px-5 py-4 bg-[rgba(255, 255, 255, 0.05)] border border-gray/10 rounded-xl border-[#7367f033] text-[#ffffff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#cd9ffcb9] focus:border-[#ce9ffc] outline-none transition-all"
              placeholder="name@company.com"
              {...register("email", { required: "Email is required." })}
            />
            <EmailIcon className="absolute right-5 top-4 text-gray-500" />
          </div>
          <FieldErrorMsg
            name="email"
            errors={errors}
            className="text-red-500 font-medium mt-2"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-white mb-3 font-medium">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full px-5 py-4 bg-[rgba(255, 255, 255, 0.05)] border border-gray/10 rounded-xl border-[#7367f033] text-[#ffffff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#cd9ffcb9] focus:border-[#ce9ffc] outline-none transition-all"
              placeholder="••••••••"
              {...register("password", { required: "Password is required." })}
            />
          </div>
          <FieldErrorMsg
            name="password"
            errors={errors}
            className="text-red-500 font-medium mt-2"
          />
        </div>

        {/* Submit Button */}
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
          {isSubmitting ? <Spinner size={18} /> : "Sign Up"}
        </Button>
      </form>

      {/* Link to Login */}
      <div className="mt-8 text-center">
        <p className="text-white">
          Already have an account?{" "}
          <Link
            href={CLIENT_LOGIN_ROUTE}
            className="text-[#ffffff] font-semibold hover:text-[#7367f0] transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
