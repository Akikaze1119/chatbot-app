import { Content } from '@google/generative-ai';

export interface IAi {
  content: string; // message content
  history: Content[]; // chat history
}
