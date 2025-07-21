import ApiClient from "@/core/lib/api-client";
import jwtService from "./jwt-service";
import { AxiosInstance, AxiosRequestConfig } from "axios";

class HttpService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = ApiClient;

    this.setUpInterceptors();
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.httpClient
      .get(url, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.message ?? "Something went wrong!",
        };
      });
  }

  post(url: string, payload: any, config?: AxiosRequestConfig) {
    return this.httpClient
      .post(url, payload, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.data?.message ?? "Something went wrong!",
        };
      });
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.httpClient
      .delete(url, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.message ?? "Something went wrong!",
        };
      });
  }

  setUpInterceptors() {
    this.httpClient.interceptors.request.use((config) => {
      const authToken = jwtService.getToken();

      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
        return config;
      }

      return config;
    });
  }
  put(url: string, payload: any, config?: AxiosRequestConfig) {
    return this.httpClient
      .put(url, payload, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.message ?? "Something went wrong!",
        };
      });
  }
}

const httpService = new HttpService();

export default httpService;
