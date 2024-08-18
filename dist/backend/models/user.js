import UserServices from '../services/user_services.js';
class User {
    id;
    name;
    email;
    phone;
    postalCode;
    constructor({ id, name, email, phone, postalCode }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.postalCode = postalCode;
    }
    static async save({ name, email, phone, postalCode }) {
        const result = await this.findByEmailOrPhone(email, phone);
        if (result)
            throw new Error('User already exists');
        console.log('result', result);
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
