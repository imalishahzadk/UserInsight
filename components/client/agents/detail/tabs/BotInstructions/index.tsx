import Spinner from "@/components/shared/ui/Spinner";
import useNotification from "@/hooks/shared/use-notification";
import agentService from "@/services/api/client/agent-service";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
    <div className="p-3 min-h-[100dvh]">
      <h2 className="text-3xl font-bold text-white">Bot Instructions</h2>

      <form onSubmit={handleSubmit(handleSaveInstructions)} className="mt-4">
        <textarea
          className="border border-gray-300 rounded-md outline-none w-full resize-none p-2"
          rows={30}
          defaultValue={instructions}
          {...register("instructions", {
            required: "Instructions can't be empty.",
          })}
        />

        {errors && errors["instructions"] && (
          <p className="text-sm text-red-600">
            {errors["instructions"].message as string}
          </p>
        )}

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#00e5ff",
              color: "#0a0f1e",
              borderRadius: "8px",
              textTransform: "none",
              height: "45px",
              fontWeight: "600",
              "&:hover": {
                bgcolor: "rgba(0, 229, 255, 0.8)",
              },
              "&:disabled": {
                bgcolor: "rgba(0, 229, 255, 0.5)",
                color: "#0a0f1e",
              },
            }}
          >
            {isSubmitting ? <Spinner size={18} /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BotInstructions;
