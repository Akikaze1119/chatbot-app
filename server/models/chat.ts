import ChatServices from '../services/chat_services.js';
import { IChat } from './../types/chat.js';

class Chat {
  id: string;
  userId: string;
  score: number;
  location: string | null;
  time_stamp: Date;

  constructor({ id, userId, score, location, time_stamp }: IChat) {
    this.id = id;
    this.userId = userId;
    this.score = score;
    this.location = location;
    this.time_stamp = time_stamp;
  }

  static async save({ userId, score, location }: Omit<Chat, 'id' | 'time_stamp'>) {
    const time_stamp = new Date();
    const id = await ChatServices.saveChat({ userId, score, location, time_stamp });
    const chat = new Chat({ id, userId, score, location, time_stamp });
    return chat;
  }

  static async updateScore({ id, score }: { id: string; score: number }) {
    await ChatServices.updateScore({ id, score });
  }
}

export default Chat;
