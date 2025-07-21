"use client";
import { useState } from "react";
import FullChatView from "./FullChatView";
import MiniChatView from "./MiniChatView";
import ButtonView from "./ButtonView";
import { IBotSettingFormData } from "../../../AgentDetailPage";

export default function ChatPreview({
  agentId,
  botSettings,
  currentView = "button",
  handleStateChange,
}: {
  agentId: string;
  botSettings: IBotSettingFormData;
  currentView: "full" | "mini" | "button";
  handleStateChange: (state: "full" | "mini" | "button") => void;
}) {
  if (currentView === "full") {
    return (
      <FullChatView
        onStateChange={handleStateChange}
        botSettings={botSettings}
        agentId={agentId}
      />
    );
  }

  if (currentView === "mini") {
    return (
      <MiniChatView
        onStateChange={handleStateChange}
        botSettings={botSettings}
      />
    );
  }

  return (
    <ButtonView
      primaryColor={botSettings.primaryColor}
      image={botSettings.image}
      onStateChange={handleStateChange}
    />
  );
}
