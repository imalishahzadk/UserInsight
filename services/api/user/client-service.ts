import { IBot } from "@/core/types/client";
import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

interface IAgentConversationUsage {
  name: string;
  value: number;
}

interface IAgentConversationUsageResponse {
  totalUsage: number;
  chartData: IAgentConversationUsage[];
}

export interface IClientAgent {
  _id: string;
  name: string;
  conversationCount: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  messagesCount: number;
}

class ClientService extends BaseService {
  async addClient(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post("/users/add-client", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateClient(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post("/users/update-client", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getClientDetails(clientId: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `/users/get-client-details?id=${clientId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllClients(): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get("/users/get-all-clients");

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteClient(clientId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `/users/delete-client?id=${clientId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getClientBotConversationUsage(
    clientId: string
  ): Promise<IAgentConversationUsageResponse> {
    try {
      const res = await this.httpService.get(
        `/users/get-clients-bot-conversation-usage?clientId=${clientId}`
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

  async getClientAgents(clientId: string): Promise<IClientAgent[]> {
    try {
      const res = await this.httpService.get(
        `/users/get-client-agents?clientId=${clientId}`
      );

      if (res.success) {
        return res.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
}

const clientService = new ClientService();

export default clientService;
