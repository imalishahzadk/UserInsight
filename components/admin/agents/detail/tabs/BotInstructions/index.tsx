"use client";

import Spinner from "@/components/shared/ui/Spinner";
import useNotification from "@/hooks/shared/use-notification";
import agentService from "@/services/api/user/agent-service";
import { Box, Button, Typography, Card } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SettingsIcon from "@mui/icons-material/Settings";

// Using same color palette as KnowledgeTab
const colors = {
  background: "#070b15",
  cardBackground: "#0a0f1e",
  primary: "#00e5ff",
  text: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  border: "rgba(0, 229, 255, 0.2)",
  borderHover: "rgba(0, 229, 255, 0.4)",
};

const BotInstructions = ({
  agentId,
  instructions,
}: {
  agentId: string;
  instructions: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const notification = useNotification();

  const handleSaveInstructions = async (data: any) => {
    const instructions: string = data.instructions;
    const res = await agentService.updateBotInstructions(agentId, instructions);

    if (res.success) {
      notification.success(res.message);
    } else {
      notification.error(res.message);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: colors.background, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
        <SettingsIcon sx={{ color: colors.primary, fontSize: 26 }} />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 600,
            color: colors.text,
          }}
        >
          Bot Instructions
        </Typography>
      </Box>

      <Card
        sx={{
          p: 3,
          color: colors.text,
          bgcolor: colors.cardBackground,
          borderRadius: "16px",
          border: `1px solid ${colors.border}`,
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            mb: 2,
            color: colors.textSecondary,
          }}
        >
          Customize how your bot should behave and respond to user queries
        </Typography>

        <form onSubmit={handleSubmit(handleSaveInstructions)}>
          <textarea
            className="w-full p-3 rounded-lg resize-none text-white"
            rows={20}
            defaultValue={instructions}
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.5)",
              border: `1px solid ${colors.border}`,
              outline: "none",
              fontSize: "14px",
            }}
            {...register("instructions", {
              required: "Instructions can't be empty.",
            })}
          />

          {errors && errors["instructions"] && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "#ff4d4f",
                mt: 1,
              }}
            >
              {errors["instructions"].message as string}
            </Typography>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{
                bgcolor: colors.primary,
                color: colors.cardBackground,
                borderRadius: "8px",
                textTransform: "none",
                height: "45px",
                px: 4,
                fontWeight: "600",
                "&:hover": {
                  bgcolor: "rgba(0, 229, 255, 0.8)",
                },
                "&:disabled": {
                  bgcolor: "rgba(0, 229, 255, 0.5)",
                  color: colors.cardBackground,
                },
              }}
            >
              {isSubmitting ? <Spinner size={18} /> : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default BotInstructions;
