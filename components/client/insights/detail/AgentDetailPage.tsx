"use client";

import { Box, Button, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams, useRouter } from "next/navigation";
import agentService from "@/services/api/client/agent-service";
import { useQuery } from "@tanstack/react-query";
import PageSpinner from "@/components/shared/PageSpinner";
import DetailsTab from "./tabs/DetailsTab";

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
  const response = await agentService.getInsightsDetails(agentId);
  if (response.success && response.data && response.data.botDetails) {
    return response.data.botDetails;
  } else {
    throw new Error(response.message ?? "Something went wrong!");
  }
};

export default function AgentDetailPage() {
  const { id: agentId } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["agent-details", agentId],
    queryFn: () => getBotDetails(agentId),
    refetchOnWindowFocus: false,
  });

  const [previewType, setPreviewType] = useState<"full" | "mini" | "button">(
    "button"
  );

  const handlePreviewTypeChange = (newState: "full" | "mini" | "button") => {
    setPreviewType(newState);
  };

  const [botSettings, setBotSettings] = useState<IBotSettingFormData>({
    image: null,
    name: "",
    theme: "dark",
    fontSize: 16,
    primaryColor: "#7367f0",
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
        theme: "dark",
        fontSize: 16,
        primaryColor: botAppearance?.primaryColor ?? "#1A83FF",
        subTitle: botAppearance?.subTitle ?? "test",
        width: botAppearance?.width ?? 420,
        height: 600,
        isDefaultOpen: botAppearance?.isDefaultOpen ?? false,
        suggestions: botAppearance?.suggestions ?? [],
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
        bgcolor: "#0A0F1E",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          bgcolor: "#1e1e3266",
          backdropFilter: "blur(20px)",
          border: "1px solid #7367f033",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
          borderRadius: "16px",
          p: 4,
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#7367f0",
              color: "#7367f0",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "rgba(115, 103, 240, 0.03)",
              },
            }}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>
        <Box
          sx={{
            border: "1px solid #7367f033",
            borderRadius: "16px",
            p: 3,
            mb: 3,
          }}
        >
          <Grid container spacing={4}>
            {/* Left Column - Agent Info */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                Insight Agent Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ffffff",
                        mb: 1,
                      }}
                    >
                      Created At
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#ffffff",
                        fontWeight: 500,
                      }}
                    >
                      {new Date(data.botDetails.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ffffff",
                        mb: 1,
                      }}
                    >
                      Agent Name
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#ffffff",
                        fontWeight: 500,
                      }}
                    >
                      {data.botDetails.name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#f9f9f9",
                        mb: 1,
                      }}
                    >
                      Role
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#ffffff",
                        fontWeight: 500,
                      }}
                    >
                      {data.botDetails.role}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ffffff",
                        mb: 1,
                      }}
                    >
                      Status
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: data.botDetails.isActive ? "#00c853" : "#ffffff",
                        fontWeight: 500,
                      }}
                    >
                      {data.botDetails.isActive ? "Active" : "Inactive"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column - Preview Button */}
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handlePreviewTypeChange("full")}
                  sx={{
                    borderColor: "#7367f0",
                    color: "#7367f0",
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 3,
                    py: 1,
                    "&:hover": {
                      borderColor: "rgba(115, 103, 240, 0.03)",
                    },
                  }}
                >
                  Preview Bot
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <DetailsTab agentId={agentId} agentName={data.botDetails.name} />
      </Box>
    </Box>
  );
}
