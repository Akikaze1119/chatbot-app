import User from '../models/user.js';
import Chat from '../models/chat.js';
async function startChat(req, res) {
    const { name, email, phone, postalCode } = req.body;
    const user = await User.saveOrGet({ name, email, phone, postalCode });
    const chat = await Chat.save({ userId: user.id, score: 0, location: 'Vancouver, Canada' });
    res.json({ user, chat });
}
async function restartChat(req, res) {
    const { userId } = req.body;
    console.log('userId:', userId);
    // Validate that the user exists
    const user = await User.findById(userId);
    console.log('user:', user);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const chat = await Chat.save({ userId: user.id, score: 0, location: 'Vancouver, Canada' });
    console.log('chat:', chat);
    res.json({ chat });
}
export { startChat, restartChat };
