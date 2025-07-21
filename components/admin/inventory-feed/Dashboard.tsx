"use client";

import { BarChart, PieChart, Users, DollarSign } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import inventoryService from "@/services/api/user/inventory-service";
import PageSpinner from "@/components/shared/PageSpinner";
import { formatAmountWithCommas } from "@/utils";

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
  prices?: {
    msrp?: number;
    salePrice?: number;
  };
  images: { url: string }[];
}

const RecentlyAddedInventory = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["recent-inventoy-items"],
    queryFn: () => inventoryService.getInventoryItems({ limit: 5, page: 1 }),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return (
      <div className="space-y-4 py-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-3 animate-pulse"
          >
            <div className="w-2/3">
              <div className="h-4 bg-[rgba(255,255,255,0.1)] rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded w-3/4"></div>
            </div>
            <div className="h-6 bg-[rgba(255,255,255,0.1)] rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || error || data.inventoryItems.length <= 0) {
    return (
      <div className="flex items-center justify-center h-48 text-[rgba(255,255,255,0.5)]">
        No recent inventory data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.inventoryItems.map((inventoryItem: IInventoryItem) => (
        <div
          key={inventoryItem._id}
          className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-3 hover:bg-[rgba(0,229,255,0.05)] p-2 rounded transition-colors"
        >
          <div>
            <p className="font-medium text-white">
              {inventoryItem.stockNumber}
            </p>
            <p className="text-sm text-[rgba(255,255,255,0.6)]">
              {inventoryItem.make} {inventoryItem.model} {inventoryItem.year}
            </p>
          </div>
          <span className="text-[#00e5ff] font-medium">
            {inventoryItem.prices && inventoryItem.prices.salePrice
              ? formatAmountWithCommas(inventoryItem.prices.salePrice)
              : "N/A"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["inventory-data-dashboard"],
    queryFn: () => inventoryService.getInventorySummary(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <p className="text-gray-500">Unable to load dashboard data</p>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Units",
      value: data.totalUnits,
      icon: Users,
      change: `${data.newUnits} New`,
    },
    {
      title: "Total Value",
      value: `$${(data.totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      change: `Avg ${formatAmountWithCommas(Math.round(data.averageValue))}`,
    },
    {
      title: "Active Feeds",
      value: data.totalFeeds,
      icon: BarChart,
      change: "Feeds",
    },
    {
      title: "Inventory Split",
      value: `${Math.round((data.newUnits / data.totalUnits) * 100)}% New`,
      icon: PieChart,
      change: `${Math.round((data.usedUnits / data.totalUnits) * 100)}% Used`,
    },
  ];

  const chartData = [
    { name: "New", value: data.newUnits },
    { name: "Used", value: data.usedUnits },
  ];

  return (
    <div className="p-6 bg-[#070b15] min-h-[calc(100vh-4rem)]">
      <h2 className="text-2xl font-bold mb-6 text-white">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-[#0a0f1e] p-6 rounded-lg shadow-lg border border-[rgba(0,229,255,0.2)] transition-all hover:border-[rgba(0,229,255,0.4)] hover:transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[rgba(255,255,255,0.7)]">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1 text-white">
                  {stat.value}
                </h3>
                <span className="text-sm text-[#00e5ff]">{stat.change}</span>
              </div>
              <div className="bg-[rgba(0,229,255,0.1)] p-2 rounded-lg">
                <stat.icon className="w-8 h-8 text-[#00e5ff]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory by Status */}
        <div className="bg-[#0a0f1e] p-6 rounded-lg shadow-lg border border-[rgba(0,229,255,0.2)]">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Inventory by Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                />
                <YAxis tick={{ fill: "rgba(255,255,255,0.7)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a0f1e",
                    border: "1px solid rgba(0,229,255,0.2)",
                    color: "white",
                  }}
                />
                <Bar dataKey="value" fill="#00e5ff" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recently added inventory (styled to match) */}
        <div className="bg-[#0a0f1e] p-6 rounded-lg shadow-lg border border-[rgba(0,229,255,0.2)]">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Recently Added Units
          </h3>
          <RecentlyAddedInventory />
        </div>
      </div>
    </div>
  );
}
