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

class AgentService extends BaseService {
  async createAgent(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/clients/create-agent`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async createInsightAgent(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/clients/create-insight-agent`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async feedKnowledgeToBot(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/clients/feed-knowledge-to-bot`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentsWithStatistics(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/agents-with-statistics`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getInsighsWithStatistics(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/insights-with-statistics`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBotDetails(agentId: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-agent-details?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getInsightsDetails(agentId: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-insight-details?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addSuggestion(agentId: string, payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/clients/add-suggestion?agentId=${agentId}`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateSettings(agentId: string, payload: any): Promise<ApiResponse> {
    try {
      const formData = new FormData();

      buildFormData(formData, payload);

      const res = await this.httpService.post(
        `${this.baseUrl}/clients/update-settings?agentId=${agentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentLeads(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-insight-analytics?insightId=${agentId}`
      );

      return res.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getLeadsSetting(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-leads-setting?insightId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async updateLeadsSetting(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/clients/update-leads-setting`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getInsighLeads(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/leads-data?insightId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getLeadsAnalytics(userId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/leads-analytics-data?userId=${userId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserLeads(insightId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-insight-all-users?insightId=${insightId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBotById(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/bot-by-id?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async chat(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/clients/chat`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getConversations(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-conversations?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentsKnowledge(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-agent-knowledge?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateBotInstructions(
    agentId: string,
    instructions: string
  ): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/clients/update-bot-instructions?agentId=${agentId}`,
        { instructions }
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentInventories(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-agent-inventories?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async handleAddAgentInventory(
    agentId: string,
    inventoryId: string
  ): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/add-agent-inventory?agentId=${agentId}&inventoryId=${inventoryId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMessagesByConversationId(
    conversationId: string
  ): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-messages-by-conversation-id?conversationId=${conversationId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentUsageStatsById(agentId: string): Promise<any> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/clients/get-insight-analytics?insightId=${agentId}`
      );

      if (res.success) {
        return res.data;
      } else {
        return {
          totalUsage: 0,
          chartData: [],
          topCountries: [],
          uniqueSessions: 0,
          uniqueUsers: 0,
          totalVisitors: 0,
        };
      }
    } catch (error) {
      return {
        totalUsage: 0,
        chartData: [],
        topCountries: [],
        uniqueSessions: 0,
        uniqueUsers: 0,
        totalVisitors: 0,
      };
    }
  }
}

const agentService = new AgentService();
export default agentService;
