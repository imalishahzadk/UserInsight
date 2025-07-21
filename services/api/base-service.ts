import { ApiResponse } from "@/core/types";
import { AxiosError, AxiosHeaders } from "axios";
import jwtService from "../local/jwt-service";
import httpService from "../local/http-service";

class BaseService {
  baseUrl: string | undefined;
  authToken: string | undefined | null;
  headers: any;
  httpService: typeof httpService;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("Loaded BASE URL:", this.baseUrl); 

    this.authToken = jwtService.getToken();
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtService.getToken()}`,
    };
    this.httpService = httpService;
  }

  handleError(error: unknown): ApiResponse {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.data?.message ??
          error.message ??
          "Something went wrong, please try again!",
      };
    }
    return {
      success: false,
      message: "Something went wrong, please try again!",
    };
  }
}

export default BaseService;
