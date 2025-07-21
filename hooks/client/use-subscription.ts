import { useState } from "react";
import subscriptionService from "@/services/api/subscription-service";
import toast from "react-hot-toast";

const useSubscription = () => {
  const [loadingPlanKey, setLoadingPlanKey] = useState<string | null>(null);
  const [isCreatingBillingPortal, setIsCreatingBillingPortal] = useState(false);

  const createCheckoutSession = async (planKey: string) => {
    setLoadingPlanKey(planKey);
    const res = await subscriptionService.createCheckoutSession({ planKey });
    setLoadingPlanKey(null);

    if (res.success) {
      window.location.href = res.data.url;
    } else {
      toast.error(res.message);
    }
  };

  const createBillingPortal = async () => {
    setIsCreatingBillingPortal(true);
    const res = await subscriptionService.createBillingPortal();
    setIsCreatingBillingPortal(false);

    if (res.success) {
      window.location.href = res.data.url;
    } else {
      toast.error(res.message);
    }
  };

  return {
    createCheckoutSession,
    loadingPlanKey,
    createBillingPortal,
    isCreatingBillingPortal,
  };
};

export default useSubscription;
