import { sendMessage } from '../controllers/messages_controller.js';
import { startChat } from '../controllers/chats_controller.js';
import express from 'express';
const router = express.Router();
// Chats
router.post('/chats', startChat);
// Messages
router.post('/messages', sendMessage);
export default router;
