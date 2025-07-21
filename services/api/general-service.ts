import BaseService from "./base-service";
import { ApiResponse } from "@/core/types";

class GeneralService extends BaseService {
  async getDetailsByToken(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/general/get-details-by-token`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPackages(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/general/get-all-packages`
      );
      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

const generalService = new GeneralService();
export default generalService;
