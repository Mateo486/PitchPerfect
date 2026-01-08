import { ConversationType, Company } from './scenario';

export type RootStackParamList = {
  Home: undefined;
  ScenarioSelect: undefined;
  Conversation: {
    conversationType: ConversationType;
    company: Company | null;
    recruiterContext: string;
  };
  Feedback: {
    conversationId: string;
  };
};