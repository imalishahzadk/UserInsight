import BaseService from "./base-service";
import { ApiResponse } from "@/core/types";
import { ISlot } from "./client/meeting-service";

class WidgetService extends BaseService {
  async getBotById(agentId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/widget/get-bot-by-id?agentId=${agentId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async chat(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/widget/chat`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async collectLead(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/widget/collect-lead`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createConversation(
    agentId: string,
    threadId: string,
    title: string
  ): Promise<ApiResponse> {
    const payload = { agentId, threadId, title };

    try {
      const res = await this.httpService.post(
        `${this.baseUrl}/widget/create-conversation`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createMessage(
    conversationId: string,
    role: string,
    content: string,
    tokensUsed: number,
    botOwner: {
      _id: string;
      role: "user" | "client";
    }
  ): Promise<ApiResponse> {
    try {
      const payload = { conversationId, role, content, tokensUsed, botOwner };

      const res = await this.httpService.post(
        `${this.baseUrl}/widget/create-message`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async scheduleMeeting(
    slotId: string,
    name: string,
    email: string
  ): Promise<ApiResponse> {
    try {
      const payload = { slotId, name, email };

      const res = await this.httpService.post(
        `${this.baseUrl}/widget/schedule-meeting`,
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAvailableSlots(agentId: string): Promise<ISlot[]> {
    try {
      const res = await this.httpService.get(
        `${this.baseUrl}/widget/get-available-slots?agentId=${agentId}`
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

const widgetService = new WidgetService();
export default widgetService;
