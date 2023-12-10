import express from 'express';
import { usersController } from './user.controller';

const router = express.Router();
router
  .route('/users')
  .get(usersController.getAllUser)
  .post(usersController.createUser);
router.route('/users/:userId').get(usersController.getSingleUser);

export const userRoutes = router;
