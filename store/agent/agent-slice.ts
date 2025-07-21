import { IBot, IBotAppearence, IBotKnowledge } from "@/core/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAgentSlice {
  botDetails: IBot;
  botAppearance: IBotAppearence;
}

const initialState: IAgentSlice = {
  botDetails: {
    _id: "",
    name: "",
    description: "",
    role: "",
    personality: "",
    leadEmailAddress: "",
    clientId: null,
    createdBy: {
      _id: "",
      role: "user",
    },
    imageUrl: "",
    isActive: false,
    activatedAt: "",
    assistantId: "",
    botInstructions: "",
    openAIvectorStoreId: null,
    createdAt: "",
  },
  botAppearance: {
    _id: "",
    agentId: "",
    subTitle: "",
    theme: "",
    fontSize: 16,
    welcomeMessage: "",
    height: 600,
    width: 420,
    primaryColor: "",
    suggestions: [],
    createdAt: "",
  },
};

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setInitialBotDetails: (
      state: IAgentSlice,
      action: PayloadAction<{ botDetails: IBot; botAppearance: IBotAppearence }>
    ) => {
      const { botDetails, botAppearance } = action.payload;

      state.botDetails = botDetails;
      state.botAppearance = botAppearance;
    },

    updateBotSettings: (state: IAgentSlice, action) => {
      const {
        name,
        imageUrl,
        theme,
        fontSize,
        primaryColor,
        subTitle,
        width,
        height,
      } = action.payload;

      if (name) {
        state.botDetails.name = name;
      }
      if (imageUrl) {
        state.botDetails.imageUrl = imageUrl;
      }
      if (theme) {
        state.botAppearance.theme = theme;
      }
      if (fontSize) {
        state.botAppearance.fontSize = fontSize;
      }
      if (primaryColor) {
        state.botAppearance.primaryColor = primaryColor;
      }
      if (subTitle) {
        state.botAppearance.subTitle = subTitle;
      }
      if (width) {
        state.botAppearance.width = width;
      }
      if (height) {
        state.botAppearance.height = height;
      }
    },

    handleChangeDetail: <K extends keyof IBot>(
      state: IAgentSlice,
      action: PayloadAction<{ key: K; value: IBot[K] }>
    ) => {
      state.botDetails[action.payload.key] = action.payload.value;
    },

    handleChangeAppearence: <K extends keyof IBotAppearence>(
      state: IAgentSlice,
      action: PayloadAction<{ key: K; value: IBotAppearence[K] }>
    ) => {
      state.botAppearance[action.payload.key] = action.payload.value;
    },
  },
});
