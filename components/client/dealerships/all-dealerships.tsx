import React from "react";
import Link from "next/link";
import { ADD_CLIENT_DEALERSHIPS_ROUTE } from "@/core/routes";
import DealershipGrid from "./dealership-grid";

const AllDealerships = () => {
  return (
    <div className="p-6 text-white bg-[#070b15] min-h-screen">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold mb-10 text-white">Dealerships</h1>

        <Link
          href={ADD_CLIENT_DEALERSHIPS_ROUTE}
          className="bg-[#47c7d4] hover:bg-[#47c7d4]/90 font-semibold px-6 py-2 rounded-lg"
        >
          + Add Dealership
        </Link>
      </div>

      <DealershipGrid />
    </div>
  );
};

export default AllDealerships;
