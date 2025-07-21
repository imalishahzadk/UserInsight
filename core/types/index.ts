import { IUserPermissions } from "./user";
import { IClientPermissions } from "./client";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface IAuthUserData<TPermissions = IUserPermissions> {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  photoUrl: string;
  activePlan?: string;
  permissions?: TPermissions;
  userId?: string;
}

export interface IAuthSession {
  user: IAuthUserData<IUserPermissions | IClientPermissions>;
  token: string | null;
  role: "user" | "client";
}

export type MonthType =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";
