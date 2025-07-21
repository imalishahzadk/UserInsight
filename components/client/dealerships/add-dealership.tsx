"use client";

import React from "react";
import DealershipForm from "./dealership-form";

const AddDealership = () => {
  return (
    <div className="p-6 text-white bg-[#070b15] min-h-screen">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-white">Add Dealership</h1>
      </div>
      <DealershipForm />
    </div>
  );
};

export default AddDealership;
