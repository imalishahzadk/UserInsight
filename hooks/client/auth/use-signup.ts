import {
  CLIENT_DASHBOARD_ROUTE,
  CLIENT_INSIGHTS_ROUTE,
  CLIENT_LOGIN_ROUTE,
  PRICING_ROUTE,
} from "@/core/routes";
import { IAuthSession } from "@/core/types";
import useNotification from "@/hooks/shared/use-notification";
import authService from "@/services/api/client/auth-service";
import { authActions } from "@/store/auth";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const useSignup = () => {
  const formInstance = useForm();

  const notification = useNotification();

  const router = useRouter();

  const dispatch = useDispatch();

  const handleSignup = async (data: any) => {
    const res = await authService.signup(data);

    if (res.success) {
      const session: IAuthSession = {
        user: res.data.userDetails,
        token: res.data.token,
        role: "client",
      };

      dispatch(authActions.setAuthSession(session));

      notification.success(res.message);

      router.push(CLIENT_LOGIN_ROUTE);
    } else {
      notification.error(res.message);
    }
  };

  return { formInstance, handleSignup };
};

export default useSignup;
