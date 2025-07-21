import axios from "axios";
import BaseService from "./base-service";
import { ApiResponse } from "@/core/types";

interface ISubscriptionObj {
  currentPeriodStart: string;
  currentPeriodEnd: string;
  remainingDays: number;
  activePlan: "FREE" | "STARTER" | "GROWTH" | "PRO";
}

class SubscriptionService extends BaseService {
  async createCheckoutSession(payload: any): Promise<ApiResponse> {
    try {
      const res = await axios.post<ApiResponse>(
        `${this.baseUrl}/clients/create-checkout-session`,
        payload,
        {
          headers: this.headers,
        }
      );

      return res.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createBillingPortal(): Promise<ApiResponse> {
    try {
      const res = await axios.get<ApiResponse>(
        `${this.baseUrl}/clients/create-billing-portal`,
        {
          headers: this.headers,
        }
      );

      return res.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getSubscription(): Promise<ISubscriptionObj> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-subscription-details`
      );

      if (res.success) {
        return res.data;
      } else {
        return {
          currentPeriodStart: "",
          currentPeriodEnd: "",
          remainingDays: 0,
          activePlan: "FREE",
        };
      }
    } catch (error) {
      return {
        currentPeriodStart: "",
        currentPeriodEnd: "",
        remainingDays: 0,
        activePlan: "FREE",
      };
    }
  }
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;
