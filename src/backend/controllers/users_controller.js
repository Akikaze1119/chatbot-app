import User from '../models/user.js';

async function createUser(req, res) {
  const { name, email, phone, postalCode } = req.body;
  try {
    const user = await User.save({ name, email, phone, postalCode });
    res.json(user);
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(400).json(error.message);
    } else {
      console.error(error);
      res.status(500).json(error.message);
    }
  }
}

export { createUser };
