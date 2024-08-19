import User from '../models/user.js';
import Chat from '../models/chat.js';

import { Request, Response } from 'express';

async function startChat(req: Request, res: Response) {
  const { name, email, phone, postalCode } = req.body;
  const user = await User.saveOrGet({ name, email, phone, postalCode });
  const chat = await Chat.save({ userId: user.id, score: 0, location: 'Vancouver, Canada' });

  res.json({ user, chat });
}

export { startChat };
