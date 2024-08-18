import express from 'express';
import { createUser } from '../controllers/users_controller.js';

const router_users = express.Router();

// middleware that is specific to this router
// const timeLog = (req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// };
// router_users.use(timeLog);

// create a user
router_users.post('/', createUser);

export default router_users;
