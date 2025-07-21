import PageSpinner from "@/components/shared/PageSpinner";
import dealershipService from "@/services/api/client/dealership-service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleConfirm } from "@/utils";

interface ICardProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  handleDelete: () => void;
}

const DealershipCard = ({
  name = "",
  email = "",
  phone = "",
  address = "",
  location,
  handleDelete,
}: ICardProps) => {
  return (
    <div className="relative rounded-xl p-4 bg-[#090f1d]">
      <button
        className="absolute -top-2 -right-2 cursor-pointer"
        onClick={handleDelete}
      >
        <DeleteIcon className="text-red-500" />
      </button>
      <p className="!text-gray-100 text-lg font-bold">{name}</p>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-2">
          <EmailIcon />

          <p className="!text-gray-100">{email}</p>
        </div>

        <div className="flex items-center gap-2">
          <LocalPhoneIcon />

          <p className="!text-gray-100">{phone}</p>
        </div>
        <div className="flex items-start gap-2">
          <LocationOnIcon />
          <p className="!text-gray-100 ">{address}</p>
        </div>
        {/* <div className="text-gray-100 ">
          <span>{location.latitude}</span> - <span>{location.longitude}</span>
        </div> */}
      </div>
    </div>
  );
};

const DealershipGrid = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["client-dealerships"],
    queryFn: () => dealershipService.getAllDealerships(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  const handleDelete = async (dealershipId: string) => {
    const res = await dealershipService.deleteDealership(dealershipId);
    if (res.success) {
      refetch();
    }
    return res;
  };

  return (
    <div className="grid xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {data?.map((dealership, i) => (
        <DealershipCard
          key={dealership._id}
          {...dealership}
          handleDelete={() => handleConfirm(() => handleDelete(dealership._id))}
        />
      ))}
    </div>
  );
};

export default DealershipGrid;
