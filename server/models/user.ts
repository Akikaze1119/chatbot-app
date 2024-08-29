import { IUser } from './../types/user.js';
import UserServices from '../services/user_services.js';

class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  postalCode: string;

  constructor({ id, name, email, phone, postalCode }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.postalCode = postalCode;
  }

  static async saveOrGet({ name, email, phone, postalCode }: Omit<User, 'id'>) {
    const existingUser = await this.findByEmailOrPhone(email, phone);
    if (existingUser) return existingUser;

    const id = await UserServices.saveUser({ name, email, phone, postalCode });
    const user = new User({ id, name, email, phone, postalCode });
    return user;
  }

  static async findByEmailOrPhone(email: string, phone: string) {
    return await UserServices.getUserByEmailOrPhone(email, phone);
  }

  static async findById(id: string) {
    return await UserServices.getUserById(id);
  }
}

export default User;
