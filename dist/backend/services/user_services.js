import User from '../models/user.js';
import { neon } from '@neondatabase/serverless';
class UserServices {
    static async saveUser({ name, email, phone, postalCode }) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const response = await sql `
    INSERT INTO users (name, email, phone, postal_code)
    VALUES (${name}, ${email}, ${phone}, ${postalCode})
    RETURNING id;
    `;
        return response[0].id;
    }
    static async getUserByEmailOrPhone(email, phone) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const users = await sql `
    SELECT id, name, email, phone, postal_code 
    FROM users 
    WHERE email = ${email} 
    OR phone = ${phone};
    `;
        if (users.length < 1)
            return null;
        const user = new User(users[0]);
        return user;
    }
    static async getUserById(id) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const user = await sql `
    SELECT * FROM users WHERE id = ${id};
    `;
        console.log('user getUserById:', user);
        return user.length > 0 ? user[0] : null;
    }
}
export default UserServices;
