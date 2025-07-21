import BaseService from "../base-service";
import { MonthType } from "@/core/types";

interface DashboardTopStats {
  users: {
    total: number;
    last30d: number;
  };
  agents: {
    total: number;
    last30d: number;
  };
  activeAgents: {
    total: number;
    last30d: number;
  };
  conversations: {
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
  activeUsers: number;
  conversations: number;
  tokensUsed: number;
  leads: number;
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

export interface IUserAndBotChartStat {
  month: MonthType;
  activeBots: Number;
  totalUsers: Number;
}

export interface IUserAndBotCounts {
  activeBots: number;
  totalUsers: number;
}

class AnalyticsService extends BaseService {
  async getDashboardCardStatistics(): Promise<any> {
    try {
      const res = await this.httpService.get(
        `/clients/get-insight-dashboard-top-stats`
      );

      if (res.success) {
        return res.data;
      } else {
        return {
          activeAgents: {
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
        activeAgents: {
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
      const res = await this.httpService.get(`/clients/most-used-insights`);

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async getMostRecentAgents(): Promise<MostUsedAgent[]> {
    try {
      const res = await this.httpService.get(`/clients/most-recent-agents`);

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
      const res = await this.httpService.get(`/clients/get-usage-stats`);

      if (res.success) {
        return res.data;
      } else {
        return {
          activeUsers: 0,
          conversations: 0,
          tokensUsed: 0,
          leads: 0,
        };
      }
    } catch (error) {
      return {
        activeUsers: 0,
        conversations: 0,
        tokensUsed: 0,
        leads: 0,
      };
    }
  }

  async getTokensUsageWithFilter(
    filters: "this-month" | "last-month"
  ): Promise<ITokensUsage[]> {
    try {
      const res = await this.httpService.get(
        `/clients/get-tokens-usage?filter=${filters}`
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
  async getInsightAnalytics(
    startDate?: string,
    endDate?: string,
    insightId?: string
  ): Promise<any> {
    try {
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (insightId) params.insightId = insightId;

      const res = await this.httpService.get(
        `/clients/track-insight-agent-new`,
        {
          params,
        }
      );

      if (res.success) {
        return res;
      } else {
        console.warn("Failed to fetch insight analytics:", res.message);
        return [];
      }
    } catch (error) {
      console.error("Error in getInsightAnalytics:", error);
      return [];
    }
  }
  async getInsightAnalyticsOfAgent(
    startDate?: string,
    endDate?: string,
    agentId?: string
  ): Promise<any> {
    try {
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await this.httpService.get(
        `/clients/track-insight-agent-new-agent?insightId=${agentId}`,
        {
          params,
        }
      );

      if (res.success) {
        return res;
      } else {
        console.warn("Failed to fetch insight analytics:", res.message);
        return [];
      }
    } catch (error) {
      console.error("Error in getInsightAnalytics:", error);
      return [];
    }
  }

  async getBotAndCreditUsageTrends(
    filter: "this-month" | "last-month" | "this-year"
  ): Promise<IBotAndCreditUsageTrends[]> {
    try {
      const res = await this.httpService.get(
        `/clients/get-bot-and-credit-usage-trends?filter=${filter}`
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

  async getUsersAndBotCharStats(): Promise<IUserAndBotChartStat[]> {
    try {
      const res = await this.httpService.get(
        `/clients/get-users-and-bot-chart-stats`
      );

      if (res.success) {
        return res.data;
      } else {
        return (
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ] as MonthType[]
        ).map((m: MonthType) => ({ month: m, activeBots: 0, totalUsers: 0 }));
      }
    } catch (error) {
      return (
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ] as MonthType[]
      ).map((m: MonthType) => ({ month: m, activeBots: 0, totalUsers: 0 }));
    }
  }

  async getUsersAndBotCounts(): Promise<IUserAndBotCounts> {
    try {
      const res = await this.httpService.get(
        `/clients/get-users-and-bot-counts`
      );

      if (res.success) {
        return res.data;
      } else {
        return {
          activeBots: 0,
          totalUsers: 0,
        };
      }
    } catch (error) {
      return {
        activeBots: 0,
        totalUsers: 0,
      };
    }
  }
}

const analyticsService = new AnalyticsService();

export default analyticsService;
