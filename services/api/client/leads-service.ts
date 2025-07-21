import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

interface ILead {
  _id: string;
  agentId: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  interestQuery: string;
}

interface ILeadAnalytics {
  totalLeads: number;
  averageMsgPerLead: number;
}

class LeadsService extends BaseService {
  async getAllLeads(): Promise<any> {
    try {
      const res = await this.httpService.get("/clients/get-all-leads");

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
  async getLeadAnalytics(): Promise<ILeadAnalytics> {
    try {
      const res = await this.httpService.get("/clients/get-leads-analytics");

      if (res.success) {
        return res.data;
      } else {
        return {
          totalLeads: 0,
          averageMsgPerLead: 0,
        };
      }
    } catch (error) {
      return {
        totalLeads: 0,
        averageMsgPerLead: 0,
      };
    }
  }
}

const leadsService = new LeadsService();

export default leadsService;
