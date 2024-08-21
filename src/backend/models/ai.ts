import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { IAi } from '../../types/ai';

class Ai {
  content: string;
  history: Content[];

  constructor({ content, history }: IAi) {
    this.content = content;
    this.history = history;
  }

  static async getAnswerByAi({ history, content }: IAi) {
    const googleGenAIKey = process.env.GOOGLE_GEN_AI_KEY || 'default-key';
    const getAI = new GoogleGenerativeAI(googleGenAIKey);
    const model = getAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: history,
    });
    const result = await chat.sendMessage(content);
    const response = result.response;
    const text = response.text();
    return text;
  }
}

export default Ai;
