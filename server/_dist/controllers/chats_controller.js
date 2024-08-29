import User from '../models/user.js';
import Chat from '../models/chat.js';
import getLocation from './../utils/getLocation.js';
async function startChat(req, res) {
    const { name, email, phone, postalCode } = req.body;
    const user = await User.saveOrGet({ name, email, phone, postalCode });
    const locationData = await getLocation();
    const chat = await Chat.save({ userId: user.id, score: 0, location: locationData });
    res.json({ user, chat });
}
async function restartChat(req, res) {
    const { userId, chatId, score } = req.body;
    // Update the chat score
    await Chat.updateScore({ id: chatId, score });
    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // create a new chat
    const locationData = await getLocation();
    const chat = await Chat.save({ userId: user.id, score: 0, location: locationData });
    res.json({ chat });
}
export { startChat, restartChat };
