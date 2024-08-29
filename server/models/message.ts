import MessageServices from '../services/message_services.js';
import { IMessage } from './../types/message.js';

class Message {
  id: number;
  chatId: string;
  content: string;
  sender: string;
  time_stamp: Date;

  constructor({ id, chatId, content, sender, time_stamp }: IMessage) {
    this.id = id;
    this.chatId = chatId;
    this.content = content;
    this.sender = sender;
    this.time_stamp = time_stamp;
  }

  static async save({ chatId, content, sender }: Omit<IMessage, 'id' | 'time_stamp'>) {
    const time_stamp = new Date();
    const id = await MessageServices.saveMessage({ chatId, content, sender, time_stamp });
    const message = new Message({ id, chatId, content, sender, time_stamp });
    return message;
  }
}

export default Message;
