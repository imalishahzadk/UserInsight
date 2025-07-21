"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  InputAdornment,
  Divider,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
  MoreVert as MoreVertIcon,
  InfoOutlined as InfoIcon,
  LinkOff as LinkOffIcon,
} from "@mui/icons-material";
import PageSpinner from "@/components/shared/PageSpinner";
import Spinner from "@/components/shared/ui/Spinner";
import useInventoryFeedForm from "@/hooks/admin/inventory-feed/use-inventoryfeed-form";
import inventoryService from "@/services/api/user/inventory-service";
import { handleConfirm } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material/styles";

interface IInventoryFeed {
  _id: string;
  inventoryUrl: string;
}

// No feeds state component
const NoFeeds = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        bgcolor: "#0a0f1e",
        borderRadius: "16px",
        border: "1px dashed rgba(0, 229, 255, 0.2)",
        my: 4,
      }}
    >
      <LinkOffIcon
        sx={{ fontSize: 48, color: "rgba(0, 229, 255, 0.3)", mb: 2 }}
      />
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#fff", mb: 1 }}>
        No Inventory Feeds Found
      </Typography>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        Add your first inventory feed using the form above.
      </Typography>
    </Box>
  );
};

// Feed card component
interface IFeedCardProps {
  url: string;
  handleDelete: () => void;
}

const FeedCard = ({ url = "", handleDelete }: IFeedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      elevation={isHovered ? 2 : 0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        mb: 2,
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "12px",
        bgcolor: "#0a0f1e",
        border: "1px solid rgba(0, 229, 255, 0.2)",
        transition: "all 0.2s ease-in-out",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovered ? "0 8px 16px rgba(0, 229, 255, 0.1)" : "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            bgcolor: "rgba(0, 229, 255, 0.1)",
            borderRadius: "10px",
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinkIcon sx={{ color: "#00e5ff", fontSize: 24 }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
              mb: 0.5,
              maxWidth: "600px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: { xs: "none", sm: "block" },
            }}
          >
            Inventory Feed
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: { xs: "200px", sm: "600px" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url}
          </Typography>
        </Box>
      </Box>

      <Tooltip title="Delete feed">
        <IconButton
          onClick={handleDelete}
          sx={{
            color: "#ef4444",
            bgcolor: "rgba(239, 68, 68, 0.1)",
            "&:hover": {
              bgcolor: "rgba(239, 68, 68, 0.2)",
            },
            transition: "all 0.2s",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

// Feed list component
const FeedList = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["inventory-feed"],
    queryFn: () => inventoryService.getInventoryFeed(),
    refetchOnWindowFocus: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress thickness={4} size={40} sx={{ color: "#7367f0" }} />
      </Box>
    );
  }

  if (!data || error || data.length <= 0) {
    return <NoFeeds />;
  }

  // Filter feeds based on search term
  const filteredFeeds = searchTerm
    ? data.filter((feed: IInventoryFeed) =>
        feed.inventoryUrl.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const handleDelete = async (inventoryFeedId: string) => {
    const res = await inventoryService.deleteInventoryFeed(inventoryFeedId);
    if (res.success) {
      refetch();
    }
    return res;
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Search and filter bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
          Available Feeds ({filteredFeeds.length})
        </Typography>

        <TextField
          placeholder="Search feeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "300px" },
            "& .MuiInputBase-root": {
              height: "40px",
              bgcolor: "#0a0f1e",
              borderRadius: "8px",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
              },
            },
            "& fieldset": { border: "none" },
            "& input": {
              color: "#fff",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#00e5ff" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Feed list */}
      {filteredFeeds.length === 0 ? (
        <Alert
          severity="info"
          sx={{
            bgcolor: "rgba(0, 229, 255, 0.05)",
            color: "#00e5ff",
            ".MuiAlert-icon": { color: "#00e5ff" },
            borderRadius: "12px",
          }}
        >
          No feeds match your search criteria.
        </Alert>
      ) : (
        <Box>
          {filteredFeeds.map((feed: IInventoryFeed) => (
            <FeedCard
              key={feed._id}
              url={feed.inventoryUrl}
              handleDelete={() => handleConfirm(() => handleDelete(feed._id))}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

// Feed form component
const FeedForm = () => {
  const {
    formInstance: {
      register,
      formState: { isSubmitting, errors },
      handleSubmit,
      reset,
    },
    handleAddFeed,
  } = useInventoryFeedForm();

  const onSubmit = async (data: any) => {
    await handleAddFeed(data);
    reset(); // Clear form after submission
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "#0a0f1e",
        borderRadius: "16px",
        border: "1px solid rgba(0, 229, 255, 0.2)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
          Add New Inventory Feed
        </Typography>
        <Tooltip title="Add external inventory data sources that can be connected to your agents">
          <InfoIcon sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 18 }} />
        </Tooltip>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
          }}
        >
          <TextField
            placeholder="Enter inventory feed URL"
            fullWidth
            error={!!errors.inventoryUrl}
            helperText={errors.inventoryUrl?.message as string}
            sx={{
              "& .MuiInputBase-root": {
                bgcolor: "#070b15",
                borderRadius: "8px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
              },
              "& fieldset": { border: "none" },
              "& input": {
                color: "#fff",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.5)",
                  opacity: 1,
                },
              },
              "& .MuiFormHelperText-root": {
                color: "#ef4444",
                marginLeft: 0,
              },
            }}
            {...register("inventoryUrl", {
              required: "Inventory URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Please enter a valid URL",
              },
            })}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <Spinner size={18} /> : <AddIcon />}
            sx={{
              bgcolor: "#00e5ff",
              color: "#0a0f1e",
              borderRadius: "8px",
              textTransform: "none",
              px: 4,
              py: 1,
              fontWeight: 600,
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.8)",
              },
              "&:disabled": {
                bgcolor: "rgba(0, 229, 255, 0.5)",
                color: "#0a0f1e",
              },
              minWidth: { xs: "100%", sm: "180px" },
              height: "40px",
            }}
          >
            {isSubmitting ? "Adding..." : "Add Feed"}
          </Button>
        </Box>
      </form>

      <Typography
        sx={{
          mt: 2,
          fontSize: 13,
          color: "rgba(255, 255, 255, 0.5)",
          fontStyle: "italic",
        }}
      >
        Note: Feeds must be accessible and properly formatted for agents to use
        them effectively.
      </Typography>
    </Paper>
  );
};

// Main component
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
          Inventory Feed Management
        </Typography>
      </Box>

      <FeedForm />
      <FeedList />
    </Box>
  );
};

export default FeedListPage;
