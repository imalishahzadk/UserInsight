"use client";

import { FieldErrorMsg } from "@/components/shared/ui/Input";
import useLogin from "@/hooks/client/auth/use-login";
import EmailIcon from "@mui/icons-material/Email";
import Spinner from "@/components/shared/ui/Spinner";
import Link from "next/link";
import {
  ADMIN_LOGIN_ROUTE,
  CLIENT_FROGOT_PASSWORD_ROUTE,
  CLIENT_SIGNUP_ROUTE,
} from "@/core/routes";
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
    <div className="relative w-full max-w-md rounded-3xl p-10 bg-[rgba(30,30,50,0.4)] border border-[rgba(115,103,240,0.2)] shadow-[0_15px_40px_rgba(0,0,0,0.3),_0_0_20px_rgba(115,103,240,0.2)] backdrop-blur-xl overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#7367f0] before:to-[#ce9ffc]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
        <p className="text-white">Sign in</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-8">
        <div>
          <label className="block text-white mb-3 font-medium">Email</label>
          <div className="relative">
            <input
              type="email"
              className="w-full px-5 py-4 bg-[rgba(255,255,255,0.05)] border border-[#7367f033] rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#cd9ffcb9] focus:border-[#ce9ffc] outline-none transition-all"
              placeholder="name@company.com"
              {...register("email")}
            />
            <EmailIcon className="absolute right-5 top-4 text-white" />
          </div>
          <FieldErrorMsg
            name="email"
            errors={errors}
            className="text-red-500 mt-2"
          />
        </div>

        <div>
          <label className="block text-white mb-3 font-medium">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full px-5 py-4 bg-[rgba(255,255,255,0.05)] border border-[#7367f033] rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#cd9ffcb9] focus:border-[#ce9ffc] outline-none transition-all"
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

      <div className="mt-8 text-center space-y-4">
        {/* <p className="text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href={CLIENT_SIGNUP_ROUTE}
            className="text-white font-semibold hover:text-[#7367f0] transition-colors"
          >
            Get started
          </Link>
        </p> */}

        <p className="text-gray-500">
          <Link
            href={ADMIN_LOGIN_ROUTE}
            className="text-white font-semibold hover:text-[#7367f0] transition-colors"
          >
            Admin Login
          </Link>
        </p>
        <p className="text-gray-500">
          <Link
            href={CLIENT_FROGOT_PASSWORD_ROUTE}
            className="text-white font-semibold hover:text-[#7367f0] transition-colors"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
