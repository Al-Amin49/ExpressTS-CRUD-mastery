import express from 'express';
import { usersController } from './user.controller';

const router = express.Router();
router
  .route('/users')
  .get(usersController.getAllUser)
  .post(usersController.createUser);
router
  .route('/users/:userId')
  .get(usersController.getSingleUser)
  .put(usersController.updatedUser);

router.delete('/users/:userId', usersController.deleteUser);
//insert orders
router.put('/users/:userId/orders', usersController.insertProduct)
//order by id
router.get('/users/:userId/orders',usersController.getAllOrdersById)
//calculate price by id
router.get('/users/:userId/orders/total-price',usersController.calculatePrice)
 


export const userRoutes = router;
