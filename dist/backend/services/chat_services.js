import { neon } from '@neondatabase/serverless';
class ChatServices {
    // TODO: move SQL to scope class
    static async saveChat({ userId, score, location, time_stamp }) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const response = await sql `
    INSERT INTO chats (user_id, score, location, time_stamp)
    VALUES (${userId}, ${score}, ${location}, ${time_stamp})
    RETURNING id;
    `;
        return response[0].id;
    }
}
export default ChatServices;
