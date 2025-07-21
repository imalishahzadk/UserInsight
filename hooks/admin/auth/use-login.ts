import {
  A_ALL_AGENTS_ROUTE,
  A_ALL_INVENTORY_ROUTE,
  A_ALL_USERS_ROUTE,
  A_INVENTORY_FEED_LIST_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
  ALL_CLIENTS_ROUTE,
  PRICING_ROUTE,
} from "@/core/routes";
import { IAuthSession } from "@/core/types";
import { IUserPermissions } from "@/core/types/user";
import useNotification from "@/hooks/shared/use-notification";
import authService from "@/services/api/user/auth-service";
import jwtService from "@/services/local/jwt-service";
import { authActions } from "@/store/auth";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const checkRouteToNavigate = (permissions: IUserPermissions) => {
  if (permissions.clients.view) return ALL_CLIENTS_ROUTE;
  else if (permissions.home.view) return ADMIN_DASHBOARD_ROUTE;
  else if (permissions.bots.view) return A_ALL_AGENTS_ROUTE;
  else if (permissions.users.view) return A_ALL_USERS_ROUTE;
  else return A_INVENTORY_FEED_LIST_ROUTE;
};

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
        role: "user",
      };

      dispatch(authActions.setAuthSession(session));

      notification.success(res.message);

      const navigateTo = checkRouteToNavigate(res.data.userDetails.permissions);

      router.push(navigateTo);
    } else {
      notification.error(res.message);
    }
  };

  return { formInstance, handleLogin };
};

export default useLogin;
