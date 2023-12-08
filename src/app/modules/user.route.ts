import express from 'express';
import { usersController } from './user/user.controller';

const router=express.Router();

router.route('/users').get(usersController.getAllUser).post(usersController.createUser)

export const userRoutes=router