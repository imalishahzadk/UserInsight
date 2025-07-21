"use client";

import React from "react";
import ClientForm from "./client-form";
import { useQuery } from "@tanstack/react-query";
import clientService from "@/services/api/user/client-service";
import PageSpinner from "@/components/shared/PageSpinner";

const UpdateClient = ({ clientId }: { clientId: string }) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["client-details", clientId],
    queryFn: () => clientService.getClientDetails(clientId),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (error || !data) {
    return <></>;
  }

  return (
    <div className="p-6 inner-box-style">
      <div className="max-w-lg w-full">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-xl font-bold text-white font-inter">
            Update Client Details
          </h2>
        </div>
        <ClientForm updateAction defaultValues={data.data} />
      </div>
    </div>
  );
};

export default UpdateClient;
