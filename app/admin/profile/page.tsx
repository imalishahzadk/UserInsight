"use client";

import PageSpinner from "@/components/shared/PageSpinner";
import ProfileForm from "@/components/shared/ProfileForm";
import settingService from "@/services/api/user/setting-service";
import { useQuery } from "@tanstack/react-query";

export default function AdminProfilePage() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["my-profile", "user"],
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
