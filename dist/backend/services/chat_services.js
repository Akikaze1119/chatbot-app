import { neon } from '@neondatabase/serverless';
class ChatServices {
    static async saveChat({ userId, score, location, time_stamp }) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const response = await sql `
    INSERT INTO chats (user_id, score, location, time_stamp)
    VALUES (${userId}, ${score}, ${location}, ${time_stamp})
    RETURNING id;
    `;
        return response[0].id;
    }
    static async updateScore({ id, score }) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        await sql `
    UPDATE chats
    SET score = ${score}
    WHERE id = ${id};
    `;
    }
}
export default ChatServices;
