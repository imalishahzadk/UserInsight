import React from "react";
import { notFound } from "next/navigation";
import { FactCheck, Check } from "@mui/icons-material";
import Link from "next/link";
import { CLIENT_DASHBOARD_ROUTE } from "@/core/routes";

const page = ({ searchParams }: { searchParams: any }) => {
  const { session_id } = searchParams;

  if (!session_id) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-[500px] justify-center items-center gap-7">
      <div className="border-2 border-black w-24 h-24 rounded-full flex items-center justify-center">
        <Check className="text-6xl text-black" />
      </div>
      <p className="text-xl sm:text-2xl font-bold">
        Subscription subscribed successfully!
      </p>

      <Link
        href={CLIENT_DASHBOARD_ROUTE}
        className="text-white bg-black rounded-lg px-6 py-2 text-base"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default page;
