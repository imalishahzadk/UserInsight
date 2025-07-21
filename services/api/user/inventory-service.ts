import BaseService from "../base-service";
import { ApiResponse } from "@/core/types";

interface IInventoryFeed {
  _id: string;
  inventoryUrl: string;
}

interface IInventorySummary {
  totalUnits: number;
  newUnits: number;
  usedUnits: number;
  totalValue: number;
  newUnitsValue: number;
  usedUnitsValue: number;
  averageValue: number;
  newUnitsAvgValue: number;
  usedUnitsAvgValue: number;
  totalFeeds: number;
}

interface IInventoryItem {
  _id: string;
  inventoryId: string;
  stockNumber: string;
  description: string;
  manufacturer: string;
  make: string;
  model: string;
  year: number;
  productType: string;
  isNew: boolean;
  itemDetailUrl: string;
  prices: {
    msrp: number;
    salePrice: number;
  };
  images: { url: string }[];
}

interface InventoryResponse {
  inventoryItems: IInventoryItem[];
  totalCount: number;
}

class InventoryService extends BaseService {
  async getInventoryFeed(): Promise<IInventoryFeed[]> {
    try {
      const res = await this.httpService.get("/users/get-inventory-feed");

      if (res.success) {
        return res.data ?? [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async getInventoryFeedById(
    inventoryId: string
  ): Promise<IInventoryFeed | null> {
    const res = await this.httpService.get(
      `/users/get-inventory-feed-by-id?inventoryId=${inventoryId}`
    );

    if (res.success) {
      return res.data;
    }

    return null;
  }

  async addInventory(payload: any): Promise<ApiResponse> {
    try {
      const res = await this.httpService.post(
        "/users/add-inventory-feed",
        payload
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteInventoryFeed(inventoryId: string): Promise<ApiResponse> {
    try {
      const res = await this.httpService.get(
        `/users/delete-inventory-feed?inventoryId=${inventoryId}`
      );

      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getInventorySummary(): Promise<IInventorySummary> {
    const res = await this.httpService.get(`/users/get-inventory-summary`);

    if (res.success) {
      return res.data;
    } else {
      return {
        totalUnits: 0,
        newUnits: 0,
        usedUnits: 0,
        totalValue: 0,
        newUnitsValue: 0,
        usedUnitsValue: 0,
        averageValue: 0,
        newUnitsAvgValue: 0,
        usedUnitsAvgValue: 0,
        totalFeeds: 0,
      };
    }
  }

  async getInventoryItems(filters: any): Promise<InventoryResponse> {
    const res = await this.httpService.post(
      `/users/get-all-inventory-items`,
      filters
    );

    if (res.success) {
      return res.data;
    } else {
      return { inventoryItems: [], totalCount: 0 };
    }
  }
}

const inventoryService = new InventoryService();

export default inventoryService;
