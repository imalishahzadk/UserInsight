import LoginForm from "@/components/client/auth/LoginForm";
import DoubleColumnLayout from "@/components/shared/DoubleColumnLayout";
import React from "react";

const Page = () => {
  return (
    <DoubleColumnLayout>
      <LoginForm />
    </DoubleColumnLayout>
  );
};

export default Page;
