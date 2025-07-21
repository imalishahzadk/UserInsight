import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

class PlanServices extends BaseService {
  async activatePlan(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post("/plans/activate", payload);

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getActivePlan(clientID: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(`/plans/active/${clientID}`);

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPurchaseHistory(clientId: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(`/plans/history/${clientId}`);

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

const planServices = new PlanServices();

export default planServices;
