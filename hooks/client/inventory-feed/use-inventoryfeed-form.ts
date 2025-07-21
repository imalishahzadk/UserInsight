import useNotification from "@/hooks/shared/use-notification";
import inventoryService from "@/services/api/client/inventory-service";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const useInventoryFeedForm = () => {
  const queryClient = useQueryClient();
  const formInstance = useForm();

  const notification = useNotification();

  const handleAddFeed = async (payload: any) => {
    const res = await inventoryService.addInventory(payload);

    if (res.success) {
      notification.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["inventory-feed"],
        exact: true,
      });
      return;
    }

    notification.error(res.message);
  };

  return {
    formInstance,
    handleAddFeed,
  };
};

export default useInventoryFeedForm;
