import {
  CLIENT_DASHBOARD_ROUTE,
  CLIENT_INSIGHTS_ROUTE,
  CLIENT_PRICING_ROUTE,
  PRICING_ROUTE,
} from "@/core/routes";
import { IAuthSession } from "@/core/types";
import useNotification from "@/hooks/shared/use-notification";
import authService from "@/services/api/client/auth-service";
import jwtService from "@/services/local/jwt-service";
import { authActions } from "@/store/auth";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const useLogin = () => {
  const formInstance = useForm();

  const notification = useNotification();

  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async (data: any) => {
    const res = await authService.login(data);

    if (res.success) {
      const session: IAuthSession = {
        user: res.data.userDetails,
        token: res.data.token,
        role: "client",
      };

      dispatch(authActions.setAuthSession(session));

      notification.success(res.message);

      // Check if user has no active plan or has free plan
      if (
        !res.data.userDetails.activePlan ||
        res.data.userDetails.activePlan === "free"
      ) {
        router.push(CLIENT_PRICING_ROUTE);
      } else {
        router.push(CLIENT_DASHBOARD_ROUTE);
      }
    } else {
      notification.error(res.message);
    }
  };

  return { formInstance, handleLogin };
};

export default useLogin;
