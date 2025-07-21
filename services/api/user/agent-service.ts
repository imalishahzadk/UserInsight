import { buildFormData } from "../../../utils";
import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

interface IAgentUsage {
  name: string;
  value: number;
}

interface IAgentUsageResponse {
  totalUsage: number;
  chartData: IAgentUsage[];
}

class AgentService extends BaseService {
  async createAgent(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/users/create-agent`,
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
        `${this.baseUrl}/users/feed-knowledge-to-bot`,
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
        `${this.baseUrl}/users/agents-with-statistics`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getInsightsWithStatistics(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/users/insights-with-statistics`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBotDetails(agentId: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/users/get-agent-details?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addSuggestion(agentId: string, payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/users/add-suggestion?agentId=${agentId}`,
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
        `${this.baseUrl}/users/update-settings?agentId=${agentId}`,
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
        `${this.baseUrl}/users/get-agent-leads?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBotById(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/users/bot-by-id?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async chat(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/users/chat`,
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
        `${this.baseUrl}/users/get-conversations?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentsKnowledge(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/users/get-agent-knowledge?agentId=${agentId}`
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
        `${this.baseUrl}/users/update-bot-instructions?agentId=${agentId}`,
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
        `${this.baseUrl}/users/get-agent-inventories?agentId=${agentId}`
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
        `${this.baseUrl}/users/add-agent-inventory?agentId=${agentId}&inventoryId=${inventoryId}`
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
        `${this.baseUrl}/users/get-messages-by-conversation-id?conversationId=${conversationId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentUsageStatsById(agentId: string): Promise<IAgentUsageResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/users/get-agent-usage-stats?agentId=${agentId}`
      );

      if (res.success) {
        return res.data;
      } else {
        return { totalUsage: 0, chartData: [] };
      }
    } catch (error) {
      return { totalUsage: 0, chartData: [] };
    }
  }
}

const agentService = new AgentService();
export default agentService;
