import Ai from '../models/ai.js';
import Message from '../models/message.js';

import { Request, Response } from 'express';

async function sendMessage(req: Request, res: Response) {
  const { chatId, content, history } = req.body;

  // Save user message in the database
  const message = await Message.save({ chatId, content, sender: 'user' });

  // Get AI response
  const aiResponse = await Ai.getAnswerByAi({ history, content });

  // Save AI message in the database
  const aiMessage = await Message.save({ chatId, content: aiResponse, sender: 'model' });

  res.json({ message, aiMessage });
}

export { sendMessage };
