"use client";
import { useState } from "react";
import { 
  Box, 
  Typography, 
  Chip,
  Divider,
  Paper,
  Skeleton,
  Alert,
  Link
} from "@mui/material";
import { 
  Inventory as InventoryIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  LinkOff as LinkOffIcon
} from "@mui/icons-material";
import PageSpinner from "@/components/shared/PageSpinner";
import useNotification from "@/hooks/shared/use-notification";
import agentService from "@/services/api/user/agent-service";
import { useQuery } from "@tanstack/react-query";
import { colors, cardStyles } from "./styles";

const getAgentInventories = async (agentId: string) => {
  const res = await agentService.getAgentInventories(agentId);

  if (res.success) {
    return res.data;
  } else {
    return [];
  }
};

const NoFeeds = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        color: colors.textSecondary,
        bgcolor: "rgba(0, 229, 255, 0.03)",
        borderRadius: "16px",
        border: `1px dashed ${colors.border}`,
      }}
    >
      <LinkOffIcon sx={{ fontSize: 48, color: "rgba(0, 229, 255, 0.2)", mb: 2 }} />
      <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 1 }}>
        No Inventory Feeds Available
      </Typography>
      <Typography sx={{ fontSize: "14px", textAlign: "center", maxWidth: "80%" }}>
        There are no inventory feeds to connect at this time. 
        Contact your administrator to add inventory sources.
      </Typography>
    </Box>
  );
};

interface IFeedCardProps {
  url: string;
  isAdded: boolean;
  handleAddFeed: () => void;
}

const FeedCard = ({
  url = "",
  isAdded = false,
  handleAddFeed,
}: IFeedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      elevation={isHovered ? 3 : 0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        mb: 2,
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "12px",
        border: `1px solid ${isAdded ? "rgba(16, 185, 129, 0.2)" : colors.border}`,
        bgcolor: isAdded ? "rgba(16, 185, 129, 0.05)" : colors.cardBackground,
        transition: "all 0.2s ease-in-out",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovered 
          ? "0 8px 16px rgba(0, 229, 255, 0.1)" 
          : "0 2px 4px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {isAdded && (
        <Box 
          sx={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "4px", 
            height: "100%", 
            bgcolor: colors.success 
          }} 
        />
      )}
      
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, maxWidth: "70%" }}>
        <InventoryIcon sx={{ color: isAdded ? colors.success : colors.primary, fontSize: 24 }} />
        <Box>
          <Typography 
            sx={{ 
              fontSize: "15px", 
              fontWeight: 500, 
              color: colors.text,
              mb: 0.5,
            }}
          >
            Inventory Feed
          </Typography>
          <Typography 
            sx={{ 
              fontSize: "13px", 
              color: colors.textSecondary,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url}
          </Typography>
        </Box>
      </Box>
      
      {isAdded ? (
        <Chip
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
          label="Connected"
          sx={{
            fontSize: "12px",
            fontWeight: "600",
            bgcolor: "rgba(16, 185, 129, 0.1)",
            color: colors.success,
            borderRadius: "16px",
            "& .MuiChip-icon": {
              color: colors.success,
            },
          }}
        />
      ) : (
        <button
          onClick={handleAddFeed}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(0, 229, 255, 0.1)",
            color: colors.primary,
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 229, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 229, 255, 0.1)";
          }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          Connect
        </button>
      )}
    </Paper>
  );
};

// Loading skeleton for inventory items
const LoadingSkeleton = () => (
  <>
    {[1, 2].map((i) => (
      <Paper
        key={i}
        sx={{
          mb: 2,
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "12px",
          bgcolor: colors.cardBackground,
          border: `1px solid ${colors.border}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "70%" }}>
          <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
          <Box sx={{ width: "100%" }}>
            <Skeleton width="40%" height={20} sx={{ mb: 0.5, bgcolor: "rgba(255, 255, 255, 0.1)" }} />
            <Skeleton width="80%" height={16} sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
          </Box>
        </Box>
        <Skeleton width={80} height={36} sx={{ borderRadius: 8, bgcolor: "rgba(255, 255, 255, 0.1)" }} />
      </Paper>
    ))}
  </>
);

interface IInventoryFeed {
  _id: string;
  inventoryUrl: string;
  isAdded: boolean;
}

const AddInventory = ({
  agentId,
  refetchKnowledge,
}: {
  agentId: string;
  refetchKnowledge: () => void;
}) => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["inventory-feed", agentId],
    queryFn: () => getAgentInventories(agentId),
    refetchOnWindowFocus: false,
  });

  const notification = useNotification();

  const handleAddFeed = async (inventoryFeedId: string) => {
    try {
      const res = await agentService.handleAddAgentInventory(
        agentId,
        inventoryFeedId
      );
      if (res.success) {
        notification.success(res.message);
        refetch();
        refetchKnowledge();
      } else {
        notification.error(res.message);
      }
    } catch (err) {
      notification.error("Failed to connect inventory feed. Please try again.");
    }
  };

  return (
    <Box sx={cardStyles}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <InventoryIcon sx={{ color: colors.primary, fontSize: 22 }} />
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: colors.text,
          }}
        >
          Inventory Integration
        </Typography>
      </Box>
      
      <Typography 
        sx={{ 
          color: colors.textSecondary, 
          fontSize: "14px", 
          lineHeight: 1.5,
          mb: 3
        }}
      >
        Connect inventory feeds to provide your agent with real-time product data and availability information.
      </Typography>
      
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />
      
      {isFetching ? (
        <LoadingSkeleton />
      ) : error ? (
        <Alert 
          severity="error" 
          sx={{ 
            bgcolor: "rgba(239, 68, 68, 0.1)", 
            color: "#EF4444",
            borderRadius: "12px"
          }}
        >
          Failed to load inventory feeds. Please refresh the page or try again later.
        </Alert>
      ) : (!data || data.length === 0) ? (
        <NoFeeds />
      ) : (
        <>
          {data.some((feed: IInventoryFeed) => feed.isAdded) && (
            <Box sx={{ mb: 3 }}>
              <Typography 
                sx={{ 
                  fontSize: "15px", 
                  fontWeight: 500, 
                  color: colors.text,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 16, color: colors.success }} />
                Connected Inventory
              </Typography>
              
              {data
                .filter((feed: IInventoryFeed) => feed.isAdded)
                .map((feed: IInventoryFeed) => (
                  <FeedCard
                    key={feed._id}
                    isAdded={feed.isAdded}
                    url={feed.inventoryUrl}
                    handleAddFeed={() => handleAddFeed(feed._id)}
                  />
                ))}
            </Box>
          )}
          
          {data.some((feed: IInventoryFeed) => !feed.isAdded) && (
            <Box>
              <Typography 
                sx={{ 
                  fontSize: "15px", 
                  fontWeight: 500, 
                  color: colors.text,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <AddIcon sx={{ fontSize: 16, color: colors.primary }} />
                Available Inventory Sources
              </Typography>
              
              {data
                .filter((feed: IInventoryFeed) => !feed.isAdded)
                .map((feed: IInventoryFeed) => (
                  <FeedCard
                    key={feed._id}
                    isAdded={feed.isAdded}
                    url={feed.inventoryUrl}
                    handleAddFeed={() => handleAddFeed(feed._id)}
                  />
                ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default AddInventory;
