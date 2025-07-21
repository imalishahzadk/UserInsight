import { buildFormData } from "@/utils";
import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";
import { IUser } from "@/core/types/user";

class SettingService extends BaseService {
  async updateProfileSettings(payload: any): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      buildFormData(formData, payload);

      const res = await this.httpService.post(
        "/users/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async changePassword(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        "/users/change-password",
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCompanySettings(payload: any): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      buildFormData(formData, payload);

      const res = await this.httpService.post(
        "/users/update-company-settings",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMyDetails(): Promise<IUser | null | undefined> {
    try {
      const res = await this.httpService.get("/users/get-details");

      if (res.success) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  }
}

const settingService = new SettingService();

export default settingService;
