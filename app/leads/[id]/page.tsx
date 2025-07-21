"use client";

import { useParams } from "next/navigation";
import LeadPopupModal from "@/components/client/leads/PricingPlans";

export default function LeadPopupPage() {
  const params = useParams<{ id: string }>();
  const agentId = params.id;
  return (
    <>
      <LeadPopupModal agentId={agentId} />
    </>
  );
}
