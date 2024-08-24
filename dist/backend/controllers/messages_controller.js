import Ai from '../models/ai.js';
import Message from '../models/message.js';
async function sendMessage(req, res) {
    const { chatId, content, history } = req.body;
    console.log('chatId:', chatId);
    console.log('content:', content);
    console.log('history:', history);
    // Save user message
    const message = await Message.save({ chatId, content, sender: 'user' });
    // Get AI response
    const aiResponse = await Ai.getAnswerByAi({ history, content });
    console.log('aiResponse:', aiResponse);
    // Save AI message
    const aiMessage = await Message.save({ chatId, content: aiResponse, sender: 'model' });
    res.json({ message, aiMessage });
}
export { sendMessage };
