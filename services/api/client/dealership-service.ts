import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IDealership {
  _id: string;
  clientId: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  location: ILocation;
}

class DealershipService extends BaseService {
  async getAllDealerships(): Promise<IDealership[]> {
    const res = await this.httpService.get("/clients/get-all-dealerships");

    if (res.success) {
      return res.data ?? [];
    } else {
      return [];
    }
  }

  async addDealership(payload: any): Promise<ApiResponse> {
    const res = await this.httpService.post("/clients/add-dealership", payload);

    return res;
  }

  async updateDealership(
    dealershipId: string,
    payload: any
  ): Promise<ApiResponse> {
    const res = await this.httpService.post(
      `/clients/update-dealership?dealershipId=${dealershipId}`,
      payload
    );

    return res;
  }

  async deleteDealership(dealershipId: string): Promise<ApiResponse> {
    const res = await this.httpService.get(
      `/clients/delete-dealership?dealershipId=${dealershipId}`
    );

    return res;
  }
}

const dealershipService = new DealershipService();

export default dealershipService;
