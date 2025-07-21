"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  FileDown,
  Filter,
  Users,
  DollarSign,
  Search,
  X,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import inventoryService from "@/services/api/user/inventory-service";
import { formatAmountWithCommas } from "@/utils";
import InventoryTable from "./InventoryTable";

const StatsCards = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["inventory-data-dashboard"],
    queryFn: () => inventoryService.getInventorySummary(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0a0f1e] rounded-lg p-6 shadow-sm animate-pulse"
          >
            <div className="h-4 bg-[rgba(255,255,255,0.1)] rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-[rgba(255,255,255,0.1)] rounded w-1/3 mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded"></div>
              <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || error) {
    return <></>;
  }

  const stats = [
    {
      title: "Total Units",
      value: data.totalUnits,
      icon: ShoppingCart,
      details: [
        { label: "New Units", value: data.newUnits },
        { label: "Used Units", value: data.usedUnits },
      ],
    },
    {
      title: "Total Value",
      value: formatAmountWithCommas(Math.round(data.totalValue)),
      icon: DollarSign,
      details: [
        {
          label: "New Value",
          value: formatAmountWithCommas(Math.round(data.newUnitsValue)),
        },
        {
          label: "Used Value",
          value: formatAmountWithCommas(Math.round(data.usedUnitsValue)),
        },
      ],
    },
    {
      title: "Average Price",
      icon: Tag,
      value: formatAmountWithCommas(Math.round(data.averageValue)),
      details: [
        {
          label: "New Avg",
          value: formatAmountWithCommas(Math.round(data.newUnitsAvgValue)),
        },
        {
          label: "Used Avg",
          value: formatAmountWithCommas(Math.round(data.usedUnitsAvgValue)),
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#0a0f1e] rounded-lg p-6 shadow-lg border border-[rgba(0,229,255,0.2)] transition-all hover:border-[rgba(0,229,255,0.4)] hover:transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-[rgba(255,255,255,0.7)]">
              {stat.title}
            </h3>
            <div className="p-2 bg-[rgba(0,229,255,0.1)] rounded-lg">
              <stat.icon className="h-5 w-5 text-[#00e5ff]" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="mt-3 space-y-2">
              {stat.details.map((detail, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-[rgba(255,255,255,0.6)]">
                    {detail.label}
                  </span>
                  <span className="font-medium text-white">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function AllInventory() {
  return (
    <div className="p-6 bg-[#070b15] min-h-[calc(100vh-4rem)]">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Inventory Management
      </h2>
      <StatsCards />
      <InventoryTable />
    </div>
  );
}
