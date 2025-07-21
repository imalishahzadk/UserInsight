import Button from "@/components/shared/ui/Button";
import useDealershipForm from "@/hooks/client/dealership/use-dealership-form";
import { IDealership } from "@/services/api/client/dealership-service";
import React from "react";

interface IDealershipFormProps {
  defaultValues?: IDealership | undefined;
  updateAction?: boolean;
}

const DealershipForm = ({
  updateAction = false,
  defaultValues,
}: IDealershipFormProps) => {
  const {
    formInstance: {
      handleSubmit,
      formState: { isSubmitting, errors },
      register,
    },
    handleSubmitForm,
  } = useDealershipForm(updateAction, defaultValues);

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="grid gap-4">
        <div className="w-full">
          <label htmlFor="">
            <span className="block mb-2 text-white font-medium">Name</span>
            <input
              type="text"
              className="bg-[#090f1d] w-full border border-gray-400 text-white px-3 py-2 rounded-lg focus:border-gray-300"
              {...register("name", { required: "Name is required." })}
            />
          </label>
          {errors && errors["name"] && errors["name"].message && (
            <p className="text-xs !text-red-600 mt-1">
              {errors["name"].message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="">
            <span className="block mb-2 text-white font-medium">Phone</span>
            <input
              type="text"
              className="bg-[#090f1d] w-full border border-gray-400 text-white px-3 py-2 rounded-lg focus:border-gray-300"
              {...register("phone", { required: "Phone is required." })}
            />
          </label>
          {errors && errors["phone"] && errors["phone"].message && (
            <p className="text-xs !text-red-600 mt-1">
              {errors["phone"].message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="">
            <span className="block mb-2 text-white font-medium">Email</span>
            <input
              type="email"
              className="bg-[#090f1d] w-full border border-gray-400 text-white px-3 py-2 rounded-lg focus:border-gray-300"
              {...register("email", { required: "Email is required." })}
            />
          </label>
          {errors && errors["email"] && errors["email"].message && (
            <p className="text-xs !text-red-600 mt-1">
              {errors["email"].message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="">
            <span className="block mb-2 text-white font-medium">Address</span>
            <input
              type="address"
              className="bg-[#090f1d] w-full border border-gray-400 text-white px-3 py-2 rounded-lg focus:border-gray-300"
              {...register("address", { required: "Address is required." })}
            />
          </label>
          {errors && errors["address"] && errors["address"].message && (
            <p className="text-xs !text-red-600 mt-1">
              {errors["address"].message}
            </p>
          )}
        </div>

        <div className="w-full">
          <p className="mb-2 text-white font-medium">Location</p>
          <div className="flex items-center gap-5">
            <div>
              <input
                type="number"
                step="any"
                className="bg-[#090f1d] w-full border border-gray-400 text-white px-3 py-2 rounded-lg focus:border-gray-300"
                placeholder="Latitude"
                {...register("location.latitude", {
                  required: "Latitude is required.",
                })}
              />
              {errors &&
                errors["location"] &&
                errors["location"].latitude?.message && (
                  <p className="text-xs !text-red-600 mt-1">
                    {errors["location"].latitude.message}
                  </p>
                )}
            </div>
            <div>
              <input
                type="number"
                step="any"
                className="bg-[#090f1d] w-full border border-gray-400 text-white px-3 py-2 rounded-lg focus:border-gray-300"
                placeholder="Longitude"
                {...register("location.longitude", {
                  required: "Longitude is required.",
                })}
              />
              {errors &&
                errors["location"] &&
                errors["location"].longitude?.message && (
                  <p className="text-xs !text-red-600 mt-1">
                    {errors["location"].longitude.message}
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-[#47c7d4] hover:bg-[#47c7d4]/80 font-semibold px-6 py-2 rounded-lg mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving.." : "Save"}
      </Button>
    </form>
  );
};

export default DealershipForm;
