import { IAuthSession, IAuthUserData } from "@/core/types";
import { IUserPermissions } from "@/core/types/user";
import { IClientPermissions } from "@/core/types/client";
import jwtService from "@/services/local/jwt-service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthSession = {
  user: {
    companyName: "",
    email: "",
    name: "",
    phoneNumber: "",
    photoUrl: "",
    activePlan: "",
  },
  token: null,
  role: "client",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSession: (
      state,
      action: PayloadAction<{
        user: IAuthUserData<IUserPermissions | IClientPermissions>;
        token: string | null;
        role: "user" | "client";
      }>
    ) => {
      const { user, role, token } = action.payload;
      // console.log("user", user);

      state.user = user;
      state.role = role;
      state.token = token;

      jwtService.setAuthSession({ user, role, token });
    },

    updateUserData: (state, action) => {
      const { user } = action.payload;

      const prevState = { ...state.user };

      state.user = { ...prevState, ...user };

      jwtService.updateUserData(user);
    },

    logout: (state) => {
      state.user = {
        companyName: "",
        email: "",
        name: "",
        phoneNumber: "",
        photoUrl: "",
        activePlan: "",
      };
      state.token = null;
      state.role = "client";

      jwtService.clearSession();
    },
  },
});
