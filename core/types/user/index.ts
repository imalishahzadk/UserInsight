export interface IBot {
  _id: string;
  name: string;
  description: string;
  role: string;
  personality: string;
  leadEmailAddress: string;
  clientId: string | null;
  createdBy: {
    _id: string;
    role: "user" | "client";
  };
  imageUrl: string;
  isActive: boolean;
  activatedAt: string;
  assistantId: string;
  botInstructions: string;
  openAIvectorStoreId: string | null;
  createdAt: string;
}

export interface IBotAppearence {
  _id: string;
  agentId: string;
  subTitle: string;
  theme: string;
  fontSize: number;
  welcomeMessage: string;
  height: number;
  width: number;
  primaryColor: string;
  suggestions: string[];
  createdAt: string;
}

export interface IBotKnowledge {
  _id: string;
  agentId: string;
  contentType: "text" | "file" | "qna" | "website" | "table" | "inventory";
  content: any;
  openAIFileId: string | null;
  createdAt: string;
}

export interface IUserPermissions {
  home: {
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  };
  bots: {
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  };
  clients: {
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  };
  usage: {
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  };
  users: {
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  };
  settings: {
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  };
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "super-admin" | "admin";
  phoneNumber: string;
  company: {
    name: string;
    address: string;
    state: string;
    zipCode: string;
    logo: string;
  };
  photoUrl: string;
  permissions: IUserPermissions;
  activePlan?: string;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt?: string;
}
