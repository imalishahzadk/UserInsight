import axios from "axios";
import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

class AuthService extends BaseService {
  async login(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/clients/login`,
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

  async signup(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/clients/sign-up`,
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

  async sendOtp(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/auth/forgot-password/send-otp`,
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
  async resendOtp(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/auth/forgot-password/resend-otp`,
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

  async verifyOtp(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/auth/forgot-password/verify-otp`,
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

  async resetPassword(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/auth/forgot-password/reset-password`,
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
