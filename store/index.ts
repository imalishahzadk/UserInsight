import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
