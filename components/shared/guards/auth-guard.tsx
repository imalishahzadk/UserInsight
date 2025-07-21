"use client";

import { IAuthSession } from "@/core/types";
import generalService from "@/services/api/general-service";
import jwtService from "@/services/local/jwt-service";
import { authActions } from "@/store/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageSpinner from "../PageSpinner";
import { useRouter } from "next/navigation";
import { CLIENT_PRICING_ROUTE } from "@/core/routes";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = jwtService.getToken();

    if (token) {
      setIsLoading(true);
      generalService
        .getDetailsByToken()
        .then((res) => {
          if (res.success && res.data) {
            const authSession: IAuthSession = {
              user: res.data.userDetails,
              token: res.data.token,
              role: res.data.role,
            };
            dispatch(authActions.setAuthSession(authSession));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    const userData = jwtService.getAuthSession();

    if (
      userData?.user.activePlan === "FREE" ||
      userData?.user.activePlan === null
    ) {
      router.push(CLIENT_PRICING_ROUTE);
    }
  }, [router]);

  if (isLoading) {
    return <PageSpinner />;
  }

  return <>{children}</>;
};

export default AuthGuard;
