"use client";

import PageSpinner from "@/components/shared/PageSpinner";
import Spinner from "@/components/shared/ui/Spinner";
import useInventoryFeedForm from "@/hooks/client/inventory-feed/use-inventoryfeed-form";
import inventoryService from "@/services/api/client/inventory-service";
import { handleConfirm } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

interface IInventoryFeed {
  _id: string;
  inventoryUrl: string;
}

interface IFeedCardProps {
  url: string;
  handleDelete: () => void;
}

const NoFeeds = () => {
  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      my: 10 
    }}>
      <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "1.5rem" }}>
        No Feeds Found!
      </Typography>
    </Box>
  );
};

const FeedCard = ({ url = "", handleDelete }: IFeedCardProps) => {
  return (
    <Box 
      component="li" 
      sx={{
        bgcolor: "#0a0f1e",
        color: "#fff",
        p: 2,
        borderRadius: "8px",
        mb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        border: "1px solid rgba(0, 229, 255, 0.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "rgba(0, 229, 255, 0.4)",
          transform: "translateY(-3px)",
          boxShadow: "0 5px 15px rgba(0,229,255,0.1)",
        },
      }}
    >
      <Typography sx={{ fontSize: "0.9rem", color: "#fff" }}>{url}</Typography>
      <Button
        sx={{ 
          minWidth: "auto", 
          p: 1,
          color: "#EA4335" 
        }}
        onClick={handleDelete}
      >
        <MdDelete size={20} />
      </Button>
    </Box>
  );
};

const FeedList = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["inventory-feed"],
    queryFn: () => inventoryService.getInventoryFeed(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data || error) {
    return <NoFeeds />;
  }

  if (data.length <= 0) {
    return <NoFeeds />;
  }

  const handleDelete = async (inventoryFeedId: string) => {
    const res = await inventoryService.deleteInventoryFeed(inventoryFeedId);
    if (res.success) {
      refetch();
    }
    return res;
  };

  return (
    <Box component="ul" sx={{ my: 4, listStyle: "none", p: 0 }}>
      {data.map((feed: IInventoryFeed) => (
        <FeedCard
          key={feed._id}
          url={feed.inventoryUrl}
          handleDelete={() => handleConfirm(() => handleDelete(feed._id))}
        />
      ))}
    </Box>
  );
};

const FeedForm = () => {
  const {
    formInstance: {
      register,
      formState: { isSubmitting, errors },
      handleSubmit,
    },
    handleAddFeed,
  } = useInventoryFeedForm();

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit(handleAddFeed)}
      sx={{ 
        mb: 4, 
        display: "flex", 
        alignItems: "center", 
        gap: 2,
        bgcolor: "#0a0f1e",
        p: 3,
        borderRadius: "16px",
        border: "1px solid rgba(0, 229, 255, 0.2)",
      }}
    >
      <TextField
        fullWidth
        placeholder="Enter Feed URL"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00e5ff",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(255, 255, 255, 0.5)",
          },
        }}
        {...register("inventoryUrl", {
          required: "Inventory URL is required!",
        })}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{
          bgcolor: "#00e5ff",
          color: "#000",
          borderRadius: "8px",
          minWidth: "120px",
          "&:hover": {
            bgcolor: "#00c8e0",
          },
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? <Spinner size={18} /> : "Add Feed"}
      </Button>
    </Box>
  );
};

const FeedListPage = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#070b15",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Inventory Feed
        </Typography>
      </Box>
      <FeedForm />
      <FeedList />
    </Box>
  );
};

export default FeedListPage;