import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

class UserService extends BaseService {
  async addUser(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post("/users/add-new-user", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateUser(userId: string, payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `/users/update-user?userId=${userId}`,
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

  async getUserDetails(userId: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `/users/get-user-details?userId=${userId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllUsers(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get("/users/get-all-users");

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteUser(userId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `/users/delete-user?userId=${userId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async toggleStatus(userId: string, isActive: boolean): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `/users/toggle-status?userId=${userId}`,
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
