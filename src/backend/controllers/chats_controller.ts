import User from '../models/user.js';
import Chat from '../models/chat.js';

import { Request, Response } from 'express';

async function startChat(req: Request, res: Response) {
  const { name, email, phone, postalCode } = req.body;
  const user = await User.saveOrGet({ name, email, phone, postalCode });
  const chat = await Chat.save({ userId: user.id, score: 0, location: 'Vancouver, Canada' });

  res.json({ user, chat });
}

async function restartChat(req: Request, res: Response) {
  const { userId } = req.body;

  // Validate that the user exists
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const chat = await Chat.save({ userId: user.id, score: 0, location: 'Vancouver, Canada' });

  res.json({ chat });
}

export { startChat, restartChat };
