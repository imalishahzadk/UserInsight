import axios from "axios";
import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

class AuthService extends BaseService {
  async login(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/users/login`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return res.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

const authService = new AuthService();
export default authService;
