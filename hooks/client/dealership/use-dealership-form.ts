import { CLIENT_DEALERSHIPS_ROUTE } from "@/core/routes";
import useNotification from "@/hooks/shared/use-notification";
import dealershipService, {
  IDealership,
} from "@/services/api/client/dealership-service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const useDealershipForm = (
  updateAction: boolean,
  defaultValues: IDealership | undefined
) => {
  const formInstance = useForm({
    defaultValues,
  });

  const notification = useNotification();

  const router = useRouter();

  const handleSubmitForm = async (data: any) => {
    let res;

    if (updateAction && defaultValues) {
      const dealerShipId = defaultValues._id;
      res = await dealershipService.updateDealership(dealerShipId, data);
    } else {
      res = await dealershipService.addDealership(data);
    }

    if (res.success) {
      notification.success(res.message);

      if (!updateAction) {
        router.push(CLIENT_DEALERSHIPS_ROUTE);
      }
    } else {
      notification.error(res.message);
    }
  };

  return { formInstance, handleSubmitForm };
};

export default useDealershipForm;
