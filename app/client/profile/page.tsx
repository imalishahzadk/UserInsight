"use client";

import PageSpinner from "@/components/shared/PageSpinner";
import ProfileForm from "@/components/shared/ProfileForm";
import { ApiResponse } from "@/core/types";
import settingService from "@/services/api/client/setting-service";
import { useQuery } from "@tanstack/react-query";

export default function ClientProfilePage() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => settingService.getMyDetails(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return <>Something went wrong!</>;
  }

  const onSubmit = async (payload: any) => {
    const res = await settingService.updateProfileSettings(payload);
    return res;
  };

  return <ProfileForm initialData={data} onSubmit={onSubmit} />;
}
