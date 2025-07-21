import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

export interface ISlot {
  _id: string;
  start: string;
  end: string;
  booked: false;
  bookedBy: {
    email: string | null;
    name: string | null;
  };
}

class MeetingService extends BaseService {
  async addSlot(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post("/clients/add-slot", payload);

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAvailableSlots(): Promise<ISlot[]> {
    try {
      const res = await this.httpService.get("/clients/get-available-slots");

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async getScheduledSlots(): Promise<ISlot[]> {
    try {
      const res = await this.httpService.get("/clients/get-scheduled-slots");

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
      return res;
    } catch (error) {
      return [];
    }
  }
}

const meetingService = new MeetingService();

export default meetingService;
