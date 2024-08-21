import { GoogleGenerativeAI } from '@google/generative-ai';
class Ai {
    content;
    history;
    constructor({ content, history }) {
        this.content = content;
        this.history = history;
    }
    static async getAnswerByAi({ history, content }) {
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
