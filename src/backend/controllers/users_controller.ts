import User from '../models/user.js';
import { ExistingUserError } from '../errors/errors.js';

import { Request, Response } from 'express';

async function createUser(req: Request, res: Response) {
  const { name, email, phone, postalCode } = req.body;
  try {
    const user = await User.save({ name, email, phone, postalCode });
    res.json(user);
  } catch (error: any) {
    if (error instanceof ExistingUserError) {
      res.status(400).json(error.message);
    } else {
      console.error(error);
      res.status(500).json(error.message);
    }
  }
}

export { createUser };
