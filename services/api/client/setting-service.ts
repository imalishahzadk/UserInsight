import { buildFormData } from "@/utils";
import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";
import { IClient } from "@/core/types/client";

class SettingService extends BaseService {
  async updateProfileSettings(payload: any): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      buildFormData(formData, payload);

      const res = await this.httpService.post(
        "/clients/update-profile",
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
        "/clients/change-password",
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
        "/clients/update-company-settings",
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

  async getMyDetails(): Promise<IClient | null | undefined> {
    try {
      const res = await this.httpService.get("/clients/get-details");

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
