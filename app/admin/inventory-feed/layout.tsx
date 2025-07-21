"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Database, List } from "lucide-react";
import {
  A_ALL_INVENTORY_ROUTE,
  A_INVENTORY_FEED_DASHBOARD_ROUTE,
  A_INVENTORY_FEED_LIST_ROUTE,
} from "@/core/routes";

const links = [
  {
    path: A_INVENTORY_FEED_LIST_ROUTE,
    label: "Feed List",
    icon: List,
  },
  {
    path: A_INVENTORY_FEED_DASHBOARD_ROUTE,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: A_ALL_INVENTORY_ROUTE,
    label: "All Inventory",
    icon: Database,
  },
];

export default function InventoryFeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === A_INVENTORY_FEED_LIST_ROUTE) {
      return pathname === path;
    } else if (path === A_ALL_INVENTORY_ROUTE) {
      return pathname === path;
    } else if (path === A_INVENTORY_FEED_DASHBOARD_ROUTE) {
      return pathname === path;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[#070b15]">
      <header className="border-b border-[rgba(255,255,255,0.1)] bg-[#0a0f1e] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side: Title */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-white">Inventory Feed</h1>
              </div>
              {/* Navigation */}
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8 ml-8">
                {links.map(({ path, label, icon: Icon }) => {
                  const active = isActive(path);
                  return (
                    <Link
                      key={path}
                      href={path}
                      className={`
                        inline-flex items-center px-3 pt-1 text-sm font-medium border-b-2 transition-all duration-200
                        ${active 
                          ? 'border-[#00e5ff] text-[#00e5ff]' 
                          : 'border-transparent text-white hover:border-[rgba(255,255,255,0.2)] hover:text-[rgba(255,255,255,0.8)]'
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 mr-2 ${active ? 'text-[#00e5ff]' : 'text-white'}`} />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="sm:hidden bg-[#0a0f1e] border-b border-[rgba(255,255,255,0.1)] px-4 pb-1">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {links.map(({ path, label, icon: Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                href={path}
                className={`
                  inline-flex items-center px-3 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap
                  ${active 
                    ? 'bg-[rgba(0,229,255,0.1)] text-[#00e5ff]' 
                    : 'text-[rgba(255,255,255,0.7)] hover:text-white'
                  }
                `}
              >
                <Icon className={`w-4 h-4 mr-2 ${active ? 'text-[#00e5ff]' : ''}`} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">{children}</div>
      </main>
    </div>
  );
}
