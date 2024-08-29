import ChatServices from '../services/chat_services.js';
class Chat {
    constructor({ id, userId, score, location, time_stamp }) {
        this.id = id;
        this.userId = userId;
        this.score = score;
        this.location = location;
        this.time_stamp = time_stamp;
    }
    static async save({ userId, score, location }) {
        const time_stamp = new Date();
        const id = await ChatServices.saveChat({ userId, score, location, time_stamp });
        const chat = new Chat({ id, userId, score, location, time_stamp });
        return chat;
    }
    static async updateScore({ id, score }) {
        await ChatServices.updateScore({ id, score });
    }
}
export default Chat;
