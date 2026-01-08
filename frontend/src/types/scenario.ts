export type ConversationType = 
  | 'elevator_pitch'
  | 'coffee_chat'
  | 'phone_screen'
  | 'interview';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  values?: string[];
}

export interface ScenarioConfig {
  conversationType: ConversationType;
  company: Company | null;
  recruiterContext: string;
}

export interface ConversationTypeOption {
  id: ConversationType;
  title: string;
  description: string;
  icon: string;
  duration: string;
}