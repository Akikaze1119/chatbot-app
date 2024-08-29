import MessageServices from '../services/message_services.js';
class Message {
    constructor({ id, chatId, content, sender, time_stamp }) {
        this.id = id;
        this.chatId = chatId;
        this.content = content;
        this.sender = sender;
        this.time_stamp = time_stamp;
    }
    static async save({ chatId, content, sender }) {
        const time_stamp = new Date();
        const id = await MessageServices.saveMessage({ chatId, content, sender, time_stamp });
        const message = new Message({ id, chatId, content, sender, time_stamp });
        return message;
    }
}
export default Message;
