"use client";

import { Box, Typography, Divider } from "@mui/material";
import { AutoAwesome as AutoAwesomeIcon } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import PageSpinner from "@/components/shared/PageSpinner";
import agentService from "@/services/api/user/agent-service";
import { colors } from "./styles";
import KnowledgeList from "./KnowledgeList";
import AddKnowledgeSection from "./AddKnowledgeSection";
import AddInventory from "./add-inventory";

const getAgentKnowledge = async (agentId: string) => {
  const res = await agentService.getAgentsKnowledge(agentId);

  if (res.success) {
    return res.data;
  } else {
    return [];
  }
};

const KnowledgeTab = ({
  agentId,
  agentName,
}: {
  agentId: string;
  agentName: string;
}) => {
  const {
    data: knowledgeBase,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["knowledge", agentId],
    queryFn: () => getAgentKnowledge(agentId),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          color: colors.textSecondary,
        }}
      >
        <Typography>Something went wrong. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: colors.background, minHeight: "100vh" }}>
      <AddKnowledgeSection 
        agentId={agentId} 
        agentName={agentName} 
        refetch={refetch} 
      />

      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <AutoAwesomeIcon sx={{ color: colors.primary, fontSize: 22 }} />
          <Typography 
            sx={{ 
              fontSize: "20px", 
              fontWeight: 600, 
              color: colors.text,
            }}
          >
            Knowledge Base
          </Typography>
        </Box>
        <KnowledgeList knowledgeBase={knowledgeBase} />
      </Box>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 4 }} />
      
      <AddInventory agentId={agentId} refetchKnowledge={refetch} />
    </Box>
  );
};

export default KnowledgeTab;
