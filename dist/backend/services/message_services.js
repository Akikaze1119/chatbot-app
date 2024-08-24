import { neon } from '@neondatabase/serverless';
class MessageServices {
    static async saveMessage({ chatId, content, sender, time_stamp }) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const response = await sql `
    INSERT INTO messages (chat_id, content, sender, time_stamp)
    VALUES (${chatId}, ${content}, ${sender}, ${time_stamp})
    RETURNING id;
    `;
        return response[0].id;
    }
}
export default MessageServices;
