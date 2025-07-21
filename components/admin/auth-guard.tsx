import jwtService from "@/services/local/jwt-service";
import { authActions } from "@/store/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const authSession = jwtService.getAuthSession();

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (authSession) {
      dispatch(authActions.setAuthSession(authSession));
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
