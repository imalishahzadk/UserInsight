import React from "react";
import BotConfiguration from "./BotConfiguration";
import UsageStatistics from "./UsageStatistics";
import RecentLeads from "./RecentLeads";
import { Box } from "@mui/material";
import UsagePage from "./Usage";

const DetailsTab = ({
  agentId,
  agentName,
}: {
  agentId: string;
  agentName: string;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <BotConfiguration agentId={agentId} name={agentName} />
      <UsageStatistics agentId={agentId} />
      <RecentLeads agentId={agentId} />
      <UsagePage agentId={agentId} />
    </Box>
  );
};

export default DetailsTab;
