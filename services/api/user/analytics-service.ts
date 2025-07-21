import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

interface DashboardTopStats {
  clients: {
    total: number;
    last30d: number;
  };
  users: {
    total: number;
    last30d: number;
  };
  conversations: {
    total: number;
    last30d: number;
  };
  agents: {
    total: number;
    last30d: number;
  };
}

export interface MostUsedAgent {
  _id: string;
  name: string;
  conversationCount: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  messagesCount: number;
}

export interface UsageStats {
  tokens: {
    thisMonth: number;
    lastMonth: number;
  };
  cost: {
    thisMonth: number;
    lastMonth: number;
  };
}

export interface ITokensUsage {
  date: number;
  value: number;
}

export interface IBotAndCreditUsageTrends {
  name: string;
  botCreation: number;
  activeBots: number;
}

class AnalyticsService extends BaseService {
  async getDashboardCardStatistics(): Promise<DashboardTopStats> {
    try {
      const res = await this.httpService.get(`/users/get-dashboard-top-stats`);

      if (res.success) {
        return res.data;
      } else {
        return {
          clients: {
            total: 0,
            last30d: 0,
          },
          users: {
            total: 0,
            last30d: 0,
          },
          conversations: {
            total: 0,
            last30d: 0,
          },
          agents: {
            total: 0,
            last30d: 0,
          },
        };
      }
    } catch (error) {
      return {
        clients: {
          total: 0,
          last30d: 0,
        },
        users: {
          total: 0,
          last30d: 0,
        },
        conversations: {
          total: 0,
          last30d: 0,
        },
        agents: {
          total: 0,
          last30d: 0,
        },
      };
    }
  }

  async getMostUsedAgents(): Promise<MostUsedAgent[]> {
    try {
      const res = await this.httpService.get(`/users/most-used-agents`);

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async getUsageStats(): Promise<UsageStats> {
    try {
      const res = await this.httpService.get(`/users/get-usage-stats`);

      if (res.success) {
        return res.data;
      } else {
        return {
          tokens: {
            thisMonth: 0,
            lastMonth: 0,
          },
          cost: {
            thisMonth: 0,
            lastMonth: 0,
          },
        };
      }
    } catch (error) {
      return {
        tokens: {
          thisMonth: 0,
          lastMonth: 0,
        },
        cost: {
          thisMonth: 0,
          lastMonth: 0,
        },
      };
    }
  }

  async getTokensUsageWithFilter(
    filters: "this-month" | "last-month"
  ): Promise<ITokensUsage[]> {
    try {
      const res = await this.httpService.get(
        `/users/get-tokens-usage?filter=${filters}`
      );

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async getBotAndCreditUsageTrends(
    filter: "this-month" | "last-month" | "this-year"
  ): Promise<IBotAndCreditUsageTrends[]> {
    try {
      const res = await this.httpService.get(
        `/users/get-bot-and-credit-usage-trends?filter=${filter}`
      );

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
}

const analyticsService = new AnalyticsService();

export default analyticsService;
