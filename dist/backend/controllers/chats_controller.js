import User from '../models/user.js';
import Chat from '../models/chat.js';
async function startChat(req, res) {
    const { name, email, phone, postalCode } = req.body;
    const user = await User.saveOrGet({ name, email, phone, postalCode });
    const chat = await Chat.save({ userId: user.id, score: 0, location: 'Vancouver, Canada' });
    res.json({ user, chat });
}
export { startChat };
