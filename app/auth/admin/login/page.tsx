import LoginForm from "@/components/admin/auth/LoginForm";
import DoubleColumnLayout from "@/components/shared/DoubleColumnLayout";
import React from "react";

const page = () => {
  return (
    <DoubleColumnLayout>
      <LoginForm />
    </DoubleColumnLayout>
  );
};

export default page;
