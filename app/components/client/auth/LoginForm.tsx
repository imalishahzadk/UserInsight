"use client";

import Button from "@/components/shared/ui/Button";
import {
  FieldErrorMsg,
  IconInput,
  Input,
  InputFieldWrapper,
  Label,
  PasswordInput,
} from "@/components/shared/ui/Input";
import useLogin from "@/hooks/client/auth/use-login";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";

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
    <div className="w-full md:w-1/2 flex items-center">
      <div className="w-full max-w-lg mx-auto px-6 py-6">
        <h4 className="text-2xl lg:text-3xl font-semibold mb-1">
          Welcome back 👋
        </h4>
        <p className="text-gray-600 mb-4 text-sm lg:text-base leading-relaxed">
          Sign in to start managing your Business.
        </p>

        <form className="mb-4" onSubmit={handleSubmit(handleLogin)}>
          <InputFieldWrapper className="mb-4">
            <Label text="Email" />
            <IconInput
              icon={<EmailIcon />}
              type="email"
              placeholder="Enter your Email"
              {...register("email", { required: "Email is required!" })}
            />
            <FieldErrorMsg name="email" errors={errors} />
          </InputFieldWrapper>

          <InputFieldWrapper className="mb-4">
            <Label text="Password" />
            <PasswordInput
              placeholder="Enter Password"
              {...register("password", { required: "Password is required!" })}
            />
            <FieldErrorMsg name="password" errors={errors} />
          </InputFieldWrapper>

          {/* <div className="text-right mt-1 mb-3">
            <a href="/auth/forgot-password" className="text-gray-600 text-sm">
              Forgot password?
            </a>
          </div> */}

          <Button type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </form>

        <div className="text-center">
          <div className="flex items-center mb-3 gap-2">
            <div className="flex-1 border-b border-gray-300"></div>
            <p className="text-gray-600 text-sm">Or</p>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>

          <button className="w-full h-12 border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 mb-2 hover:bg-gray-100">
            <img src="/images/google.png" alt="Google" className="w-5 h-5" />{" "}
            Log In With Google
          </button>

          {/* <button className="w-full h-12 border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <img
              src="/images/facebook.png"
              alt="Facebook"
              className="w-5 h-5"
            />{" "}
            Log In With Facebook
          </button> */}

          {/* <p className="mt-4 text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-blue-500 font-medium">
              Sign up
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
