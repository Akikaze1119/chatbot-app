import { startChat } from '../controllers/chats_controller.js';
import express from 'express';

const router_chats = express.Router();

// middleware that is specific to this router
// const timeLog = (req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// };
// router_chats.use(timeLog);

// create a user
router_chats.post('/', startChat);

export default router_chats;
