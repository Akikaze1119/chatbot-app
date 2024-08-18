import { IUser } from '../../types/user.js';
import { neon } from '@neondatabase/serverless';

class UserServices {
  static async saveUser({ name, email, phone, postalCode }: Omit<IUser, 'id'>): Promise<number> {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    INSERT INTO users (name, email, phone, postal_code)
    VALUES (${name}, ${email}, ${phone}, ${postalCode})
    RETURNING id;
    `;
    return response[0].id;
  }

  static async getUserByEmailOrPhone(email: string, phone: string): Promise<IUser | null> {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
    SELECT id 
    FROM users 
    WHERE email = ${email} 
    OR phone = ${phone};
    `;

    console.log('user getUserByEmailOrPhone:', user);
    return user.length > 0 ? (user[0] as IUser) : null;
  }

  static async getUserById(id: number): Promise<IUser | null> {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
    SELECT * FROM users WHERE id = ${id};
    `;

    console.log('user getUserById:', user);
    return user.length > 0 ? (user[0] as IUser) : null;
  }
}

export default UserServices;
