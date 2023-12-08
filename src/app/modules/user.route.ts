import express from 'express';
import { usersController } from './user/user.controller';

const router=express.Router();

router.post('/users/', usersController.createUser)

export const userRoutes=router