import { buildFormData } from "../../../utils";
import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

interface IAgentUsage {
  count: number;
  _id: string;
  name: string;
  value: number;
}

interface IAgentUsageResponse {
  topCountries: Array<IAgentUsage>;
  uniqueSessions: number;
  uniqueUsers: number;
  totalVisitors: number;
  totalUsage: number;
  chartData: IAgentUsage[];
}

class PackageService extends BaseService {
  async createPackage(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/packages/create-package`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPackages(): Promise<any> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/packages/get-packages`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePackage(id: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.delete(
        `${this.baseUrl}/packages/delete-package/${id}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePackage(id: string, payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.put(
        `${this.baseUrl}/packages/update-package/${id}`,
        payload
      );
      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

const packageService = new PackageService();
export default packageService;
