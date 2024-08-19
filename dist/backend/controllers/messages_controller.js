import Message from '../models/message.js';
async function sendMessage(req, res) {
    const { chatId, content } = req.body;
    const sender = 'user';
    const message = await Message.save({ chatId, content, sender });
    res.json({ message });
}
export { sendMessage };
