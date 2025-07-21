"use client";

import { Box, Tabs, Tab, debounce } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import DetailsTab from "./tabs/DetailsTab";
import KnowledgeTab from "./tabs/KnowledgeTab";
import AppearanceTab from "./tabs/AppearanceTab";
import ConversationTab from "./tabs/ConversationTab";
import LeadsTab from "./tabs/LeadsTab";
import Header from "./Header";
import ChatPreview from "./tabs/AppearanceTab/components/ChatPreview";
import { useParams } from "next/navigation";
import agentService from "@/services/api/client/agent-service";
import { useQuery } from "@tanstack/react-query";
import PageSpinner from "@/components/shared/PageSpinner";
import BotInstructions from "./tabs/BotInstructions";

export interface IBotSettingFormData {
  image: string | File | null;
  name: string;
  theme: string;
  fontSize: number;
  primaryColor: string;
  subTitle: string;
  width: number;
  height: number;
  isDefaultOpen: boolean;
  suggestions: string[];
}

const getBotDetails = async (agentId: string) => {
  const response = await agentService.getBotDetails(agentId);
  console.log("till herer2");
  if (response.success && response.data && response.data.botDetails) {
    return response.data.botDetails;
  } else {
    throw new Error(response.message ?? "Something went wrong!");
  }
};

export default function AgentDetailPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const { id: agentId } = useParams<{ id: string }>();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["agent-details", agentId],
    queryFn: () => getBotDetails(agentId),
    refetchOnWindowFocus: false,
  });

  const [previewType, setPreviewType] = useState<"full" | "mini" | "button">(
    "button"
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);

    if (newValue === 3) {
      setPreviewType("full");
    } else {
      if (previewType !== "button") {
        setPreviewType("button");
      }
    }
  };

  const handlePreviewTypeChange = (newState: "full" | "mini" | "button") => {
    setPreviewType(newState);
  };

  const [botSettings, setBotSettings] = useState<IBotSettingFormData>({
    image: null,
    name: "",
    theme: "dark",
    fontSize: 16,
    primaryColor: "#00e5ff",
    subTitle: "",
    width: 420,
    height: 600,
    isDefaultOpen: false,
    suggestions: [],
  });

  useEffect(() => {
    if (data) {
      const {
        botDetails: { name: agentName, imageUrl },
        botAppearance,
      } = data;

      setBotSettings({
        image: imageUrl,
        name: agentName,
        theme: botAppearance.theme,
        fontSize: botAppearance.fontSize,
        primaryColor: botAppearance.primaryColor,
        subTitle: botAppearance.subTitle,
        width: botAppearance.width,
        height: botAppearance.height,
        isDefaultOpen: botAppearance.isDefaultOpen ?? false,
        suggestions: botAppearance.suggestions,
      });
    }
  }, [data]);

  if (isFetching) {
    return <PageSpinner />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  if (!botSettings) {
    return <></>;
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#070b15",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Header
        createdAt={data.botDetails.createdAt}
        imageUrl={data.botDetails.imageUrl}
        name={data.botDetails.name}
        role={data.botDetails.role}
        handlePreviewTypeChange={handlePreviewTypeChange}
      />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "rgba(0, 229, 255, 0.1)",
          mb: 4,
          overflowX: "auto",
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              minWidth: 120,
              color: "#fff",
              opacity: 0.7,
              "&.Mui-selected": {
                color: "#00e5ff",
                opacity: 1,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#00e5ff",
            },
          }}
        >
          <Tab label="Bot detail" />
          <Tab label="Instructions" />
          <Tab label="Knowledge" />
          <Tab label="Appearance" />
          <Tab label="Conversation" />
          <Tab label="Leads" />
        </Tabs>
      </Box>

      <Box sx={{ bgcolor: "#0a0f1e", borderRadius: "16px", p: 3 }}>
        {currentTab === 0 && (
          <DetailsTab
            agentId={agentId}
            agentName={data.botDetails.name}
            welcomeMessage={data.botAppearance.welcomeMessage}
          />
        )}
        {currentTab === 1 && (
          <BotInstructions
            agentId={agentId}
            instructions={data.botDetails.botInstructions}
          />
        )}
        {currentTab === 2 && (
          <KnowledgeTab agentId={agentId} agentName={data.botDetails.name} />
        )}
        {currentTab === 3 && (
          <AppearanceTab
            agentId={agentId}
            formData={botSettings}
            setFormData={setBotSettings}
            refetch={refetch}
          />
        )}
        {currentTab === 4 && <ConversationTab agentId={agentId} />}
        {currentTab === 5 && <LeadsTab agentId={agentId} />}
      </Box>

      <ChatPreview
        agentId={agentId}
        botSettings={botSettings}
        currentView={previewType}
        handleStateChange={handlePreviewTypeChange}
      />
    </Box>
  );
}
