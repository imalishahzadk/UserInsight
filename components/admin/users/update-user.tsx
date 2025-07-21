import React from "react";
import UserForm from "./user-form";
import { useQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import userService from "@/services/api/user/user-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { IUser } from "@/core/types/user";

const getUserDetails = async (userId: string): Promise<IUser | null> => {
  const res = await userService.getUserDetails(userId);

  if (res.success) {
    return res.data;
  }

  return null;
};

const UpdateUser = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isFetching, error } = useQuery({
    queryKey: ["update-user", userId],
    queryFn: () => getUserDetails(userId),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return notFound();
  }

  return <UserForm updateAction defaultValues={data} />;
};

export default UpdateUser;
