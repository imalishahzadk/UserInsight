import React from "react";
import BotConfiguration from "./BotConfiguration";
import UsageStatistics from "./UsageStatistics";
import RecentLeads from "./RecentLeads";
import { Box } from "@mui/material";

const DetailsTab = ({
  agentId,
  agentName,
  welcomeMessage,
}: {
  agentId: string;
  agentName: string;
  welcomeMessage: string;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <BotConfiguration
        agentId={agentId}
        name={agentName}
        welcomeMessage={welcomeMessage}
      />
      <UsageStatistics agentId={agentId} />
      <RecentLeads agentId={agentId} />
    </Box>
  );
};

export default DetailsTab;
