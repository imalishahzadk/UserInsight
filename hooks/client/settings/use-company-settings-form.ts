import useNotification from "@/hooks/shared/use-notification";
import settingService from "@/services/api/client/setting-service";
import React, { useEffect, useState } from "react";

const useCompanySettingsForm = () => {
  const [formGroup, setFormGroup] = useState({
    name: "",
    address: "",
    state: "",
    zipCode: "",
  });
  const [logo, setLogo] = useState<File | string | null>(null);
  const [defaultCompanyDetails, setDefaultCompanyDetails] = useState({
    name: "",
    address: "",
    state: "",
    zipCode: "",
    logo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notification = useNotification();

  useEffect(() => {
    settingService.getMyDetails().then((res) => {
      if (res) {
        const { name, address, state, zipCode, logo } = res.company || {};
        setFormGroup({ name, address, state, zipCode });
        setLogo(logo);

        setDefaultCompanyDetails({ name, address, state, zipCode, logo });
      }
    });
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormGroup({ ...formGroup, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const res = await settingService.updateCompanySettings({
      ...formGroup,
      image: logo,
    });
    setIsSubmitting(false);

    if (res.success) {
      notification.success(res.message);
    } else {
      notification.error(res.message);
    }
  };

  const handleCancel = () => {
    setFormGroup({
      name: defaultCompanyDetails.name,
      address: defaultCompanyDetails.address,
      state: defaultCompanyDetails.state,
      zipCode: defaultCompanyDetails.zipCode,
    });
    setLogo(defaultCompanyDetails.logo);
  };

  return {
    formGroup,
    logo,
    handleFileUpload,
    handleDragOver,
    handleDrop,
    handleChange,
    handleSubmit,
    handleCancel,
    isSubmitting,
  };
};

export default useCompanySettingsForm;
