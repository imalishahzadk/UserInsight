import { ALL_CLIENTS_ROUTE } from "@/core/routes";
import useNotification from "@/hooks/shared/use-notification";
import clientService from "@/services/api/user/client-service";
import { buildFormData } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IClientForm {
  updateAction: boolean;
  defaultValues: any;
}

const useClientForm = ({
  updateAction = false,
  defaultValues,
}: IClientForm) => {
  const formInstance = useForm();

  const notification = useNotification();
  const router = useRouter();

  const [image, setImage] = useState<any>(null);
  // to show preview of image
  const [previewImage, setPreviewImage] = useState<any>(
    defaultValues?.photoUrl
  );

  const onChangeImage = (e: any) => {
    const file = e.target.files[0];

    setImage(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
  };

  const handleSubmitForm = async (data: any) => {
    if (!image && !previewImage) {
      return notification.error("Image is required!");
    }

    const formData = new FormData();
    if (updateAction) {
      if (!defaultValues) return;

      const payload = { ...data, id: defaultValues._id };

      if (image) {
        payload["image"] = image;
      }

      buildFormData(formData, payload);

      const res = await clientService.updateClient(formData);

      if (res.success) {
        notification.success(res.message);
      } else {
        notification.error(res.message);
      }

      return;
    }

    const payload = { ...data, image };

    buildFormData(formData, payload);

    const res = await clientService.addClient(formData);

    if (res.success) {
      notification.success(res.message);
      router.push(ALL_CLIENTS_ROUTE);
    } else {
      notification.error(res.message);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return {
    formInstance,
    handleSubmitForm,
    handleGoBack,
    onChangeImage,
    image,
    previewImage,
  };
};

export default useClientForm;
