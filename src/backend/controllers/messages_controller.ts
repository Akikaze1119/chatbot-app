import Message from '../models/message.js';

import { Request, Response } from 'express';

async function sendMessage(req: Request, res: Response) {
  const { chatId, content } = req.body;
  const sender = 'user';
  const message = await Message.save({ chatId, content, sender });

  res.json({ message });
}

export { sendMessage };
