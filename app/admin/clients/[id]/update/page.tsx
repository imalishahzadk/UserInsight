import UpdateClient from "@/components/admin/client/update-client";
import { notFound } from "next/navigation";
import React from "react";

const page = ({ params }: { params: any }) => {
  const { id: clientId } = params;

  if (!clientId) {
    return notFound();
  }

  return <UpdateClient clientId={clientId} />;
};

export default page;
