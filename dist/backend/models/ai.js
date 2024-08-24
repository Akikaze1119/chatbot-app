import { GoogleGenerativeAI } from '@google/generative-ai';
class Ai {
    content;
    history;
    constructor({ content, history }) {
        this.content = content;
        this.history = history;
    }
    static async getAnswerByAi({ history, content }) {
        try {
            const googleGenAIKey = process.env.GOOGLE_GEN_AI_KEY || 'default-key';
            const getAI = new GoogleGenerativeAI(googleGenAIKey);
            const model = getAI.getGenerativeModel({ model: 'gemini-pro' });
            // if history is empty, add a default message
            if (history.length === 0) {
                history.push({
                    role: 'user',
                    parts: [
                        {
                            text: 'Hello, your name is gemini. You have to help giving some information about summer night movies.',
                        },
                    ],
                });
            }
            const chat = model.startChat({
                history: history,
            });
            const result = await chat.sendMessage(content);
            const response = result.response;
            const text = response.text();
            return text;
        }
        catch (error) {
            console.error('Error in getAnswerByAi:', error);
            return 'Error in getAnswerByAi';
        }
    }
}
export default Ai;
