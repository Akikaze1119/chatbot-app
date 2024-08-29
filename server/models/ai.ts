import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { IAi } from './../types/ai.js';

class Ai {
  content: string;
  history: Content[];

  constructor({ content, history }: IAi) {
    this.content = content;
    this.history = history;
  }

  static async getAnswerByAi({ history, content }: IAi) {
    try {
      const googleGenAIKey = process.env.GOOGLE_GEN_AI_KEY || 'default-key';
      const getAI = new GoogleGenerativeAI(googleGenAIKey);
      const model = getAI.getGenerativeModel({ model: 'gemini-pro' });

      // Add a default message for prompting the user to start the conversation
      {
        history.unshift(
          {
            role: 'user',
            parts: [
              {
                text: 'Hello, your name is gemini. You have to help giving some information about summer night movies.',
              },
            ],
          },
          {
            role: 'model',
            parts: [
              {
                text: 'Okay, I can help with that. What would you like to know?',
              },
            ],
          }
        );
      }

      const chat = model.startChat({
        history: history,
      });
      const result = await chat.sendMessage(content);
      const response = result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error('Error in getAnswerByAi:', error);
      return 'Error in getAnswerByAi';
    }
  }
}
export default Ai;
