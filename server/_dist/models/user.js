import UserServices from '../services/user_services.js';
class User {
    constructor({ id, name, email, phone, postalCode }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.postalCode = postalCode;
    }
    static async saveOrGet({ name, email, phone, postalCode }) {
        const existingUser = await this.findByEmailOrPhone(email, phone);
        if (existingUser)
            return existingUser;
        const id = await UserServices.saveUser({ name, email, phone, postalCode });
        const user = new User({ id, name, email, phone, postalCode });
        return user;
    }
    static async findByEmailOrPhone(email, phone) {
        return await UserServices.getUserByEmailOrPhone(email, phone);
    }
    static async findById(id) {
        return await UserServices.getUserById(id);
    }
}
export default User;
