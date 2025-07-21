import { A_ALL_USERS_ROUTE } from "@/core/routes";
import { IUser, IUserPermissions } from "@/core/types/user";
import useNotification from "@/hooks/shared/use-notification";
import userService from "@/services/api/user/user-service";
import { buildFormData } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IUserFormData {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  password: string;
  image: File | string | null;
  permissions: IUserPermissions;
}

type PermissionModule = keyof IUserPermissions;

export interface IUserFormField {
  label: string;
  name: keyof IUserFormData;
  type?: string;
  required?: string;
}

export const formFields: IUserFormField[] = [
  { label: "Enter name", name: "name", required: "Name is required!" },
  { label: "Enter email", name: "email", required: "Email is required!" },
  {
    label: "Enter password",
    name: "password",
    type: "password",
    required: "Password is required!",
  },
  {
    label: "Phone number",
    name: "phoneNumber",
    required: "Phone number is required!",
  },
  {
    label: "Company name",
    name: "companyName",
    required: "Company name is required!",
  },
];

const useUserForm = ({
  updateAction = false,
  defaultValues,
}: {
  updateAction: boolean;
  defaultValues: IUser | undefined | null;
}) => {
  const notification = useNotification();
  const router = useRouter();

  const [formGroup, setFormGroup] = useState<IUserFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    password: "",
    permissions: {
      home: {
        view: false,
        edit: false,
        add: false,
        delete: false,
      },
      bots: {
        view: false,
        edit: false,
        add: false,
        delete: false,
      },
      clients: {
        view: false,
        edit: false,
        add: false,
        delete: false,
      },
      usage: {
        view: false,
        edit: false,
        add: false,
        delete: false,
      },
      users: {
        view: false,
        edit: false,
        add: false,
        delete: false,
      },
      settings: {
        view: false,
        edit: false,
        add: false,
        delete: false,
      },
    },
    image: null as File | null,
  });

  const permissionModules: PermissionModule[] = [
    "home",
    "bots",
    "clients",
    "usage",
    "users",
    "settings",
  ];

  useEffect(() => {
    if (defaultValues) {
      setFormGroup({
        companyName: defaultValues.company.name,
        email: defaultValues.email,
        image: defaultValues.photoUrl,
        name: defaultValues.name,
        password: "",
        permissions: defaultValues.permissions,
        phoneNumber: defaultValues.phoneNumber,
      });
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormGroup({ ...formGroup, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormGroup({ ...formGroup, image: e.target.files[0] });
    }
  };

  const toggleAllPermissions = () => {
    const prevPermissions = formGroup.permissions;

    const areAllSelected = permissionModules.every((module) =>
      Object.values(prevPermissions[module]).every((value) => value)
    );

    const newPermissions = permissionModules.reduce((acc, module) => {
      acc[module] = {
        view: !areAllSelected,
        edit: !areAllSelected,
        add: !areAllSelected,
        delete: !areAllSelected,
      };
      return acc;
    }, {} as IUserPermissions);

    setFormGroup({ ...formGroup, permissions: newPermissions });
  };

  const handleToggleSelectPermission = (
    module: PermissionModule,
    permission: "view" | "edit" | "add" | "delete"
  ) => {
    setFormGroup((prev) => {
      const newPermissions = {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [permission]: !prev.permissions[module][permission],
        },
      };

      return {
        ...prev,
        permissions: newPermissions,
      };
    });
  };

  const throwError = (msg: string) => {
    notification.error(msg);
  };

  const validateForm = () => {
    for (const field of formFields) {
      if (
        field.required &&
        !formGroup[field.name] &&
        !(updateAction && field.name === "password")
      ) {
        throwError(field.required);
        return false;
      }
    }

    const prevPermissions = formGroup.permissions;
    const areAllDeSelected = permissionModules.every((module) =>
      Object.values(prevPermissions[module]).every((value) => !value)
    );

    if (areAllDeSelected) {
      throwError("Please select atleast one permission!");
      return false;
    }

    return true;
  };

  const handleAddUser = async () => {
    setIsLoading(true);

    const formData = new FormData();
    buildFormData(formData, formGroup);

    const res = await userService.addUser(formData);
    setIsLoading(false);

    if (res.success) {
      notification.success(res.message);
      router.push(A_ALL_USERS_ROUTE);
    } else {
      notification.error(res.message);
    }
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);

    const formData = new FormData();
    buildFormData(formData, formGroup);

    const userId = defaultValues?._id;

    if (!userId) return;

    const res = await userService.updateUser(userId, formData);
    setIsLoading(false);

    if (res.success) {
      notification.success(res.message);
    } else {
      notification.error(res.message);
    }
  };

  const handleSubmitForm = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    if (updateAction) {
      await handleUpdateUser();
      return;
    }

    await handleAddUser();
  };

  return {
    handleSubmitForm,
    formGroup,
    isLoading,
    handleInputChange,
    handleImageChange,
    toggleAllPermissions,
    handleToggleSelectPermission,
    permissionModules,
  };
};

export default useUserForm;
