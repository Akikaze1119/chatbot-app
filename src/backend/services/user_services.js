import { neon } from '@neondatabase/serverless';

class UserServices {
  static async saveUser({ name, email, phone, postalCode }) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    INSERT INTO users (name, email, phone, postal_code)
    VALUES (${name}, ${email}, ${phone}, ${postalCode})
    RETURNING id;
    `;
    return response[0].id;
  }

  static async getUserByEmailOrPhone(email, phone) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
    SELECT id 
    FROM users 
    WHERE email = ${email} 
    OR phone = ${phone};
    `;

    return user;
  }

  static async getUserById(id) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
    SELECT * FROM users WHERE id = ${id};
    `;

    return user;
  }
}

export default UserServices;
