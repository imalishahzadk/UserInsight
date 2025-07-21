import SignupForm from "@/components/client/auth/SignupForm";
import DoubleColumnLayout from "@/components/shared/DoubleColumnLayout";
import React from "react";

const page = () => {
  return (
    <DoubleColumnLayout>
      <SignupForm />
    </DoubleColumnLayout>
  );
};

export default page;
