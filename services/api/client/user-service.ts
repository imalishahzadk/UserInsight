import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

class UserService extends BaseService {
  async addUser(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post("/clients/add-subuser", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateUser(subUserId: string, payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `/clients/update-subuser?subUserId=${subUserId}`,
        payload,
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

  async getUserDetails(subUserId: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `/clients/get-subuser-details?subUserId=${subUserId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllUsers(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get("/clients/get-all-subusers");

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteUser(subUserId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `/clients/delete-subuser?subUserId=${subUserId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async toggleStatus(
    subUserId: string,
    isActive: boolean
  ): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `/clients/toggle-subuser-status?subUserId=${subUserId}`,
        { isActive }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

const userService = new UserService();

export default userService;
