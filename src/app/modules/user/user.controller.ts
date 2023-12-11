import { Request, Response } from 'express';
import formatError from '../../../error-handling/formatError';
import { userServices } from './user.service';
import { createOrderSchema, createUserValidationSchema, updateUserSchema } from './user.validation';

const filteredUserData = (userData: any) => {
  return {
    userId: userData.userId,
    username: userData.username,
    password: userData.password,
    fullName: userData.fullName,
    age: userData.age,
    email: userData.email,
    isActive: userData.isActive,
    hobbies: userData.hobbies,
    address: userData.address,
  };
};
const createUser = async (req: Request, res: Response) => {
  try {
    const userData  = req.body;
    const zodParsedData = createUserValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodParsedData);
    const filteredData = filteredUserData(result.toJSON());

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: filteredData,
    });
  } catch (err: any) {
    console.log(err)
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const allusers = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: allusers,
    });
  } catch (err: any) {
    console.log(err);
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const singleUser = await userServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: ' user fetched successfully',
      data: singleUser,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      return res
        .status(formatError(404, err.message).error.code)
        .json(formatError(404, err.message));
    }
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};

const updatedUser = async (req: Request, res: Response) => {
  try {

    const {userId} = req.params;
    const userData=req.body;

    const zodParsedData = updateUserSchema.parse(userData);
      const result = await userServices.updateUserFromDB(userId, zodParsedData);
     
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result,
      });
    
  } catch (err: any) {
  
    if (err.message === 'User not found') {
      return res
        .status(formatError(404, err.message).error.code)
        .json(formatError(404, err.message));
    }
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const  {userId}  = req.params;
    const deletedUser = await userServices.deleteUserFromDB(userId);

    res.status(200).json({
      success:true,
      message:'Data deleted successfully',
      data:deletedUser
    })
   
  } catch (err: any) {
    if (err.message === 'User not found') {
      return res
        .status(formatError(404, err.message).error.code)
        .json(formatError(404, err.message));
    }
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};
const insertProduct = async (req: Request, res: Response) => {
  try {
    const  {userId}  = req.params;
    const order=req.body;
    const zodParsedData= createOrderSchema.parse(order);
    const result= await userServices.insertProductToDB(userId, zodParsedData)

    res.status(200).json({
      success:true,
      message:'Order created successfully!',
      data:result
    })
   
  } catch (err: any) {
    if (err.message === 'User not found') {
      return res
        .status(formatError(404, err.message).error.code)
        .json(formatError(404, err.message));
    }
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};
const getAllOrdersById = async (req: Request, res: Response) => {
  try {
    const  {userId}  = req.params;
    const result= await userServices.getAllOrdersFromDB(userId)

    res.status(200).json({
      success:true,
      message:'Order fetched successfully!',
      data:result
    })
   
  } catch (err: any) {
    if (err.message === 'User not found') {
      return res
        .status(formatError(404, err.message).error.code)
        .json(formatError(404, err.message));
    }
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};
const calculatePrice = async (req: Request, res: Response) => {
  try {
    const  {userId}  = req.params;
    const result= await userServices.calculatePriceFromDB(userId)

    res.status(200).json({
      success:true,
      message:'Total price calculated successfully!!',
      data:result
    })
   
  } catch (err: any) {
    if (err.message === 'User not found') {
      return res
        .status(formatError(404, err.message).error.code)
        .json(formatError(404, err.message));
    }
    const formatedError = formatError(500, err.message);
    res.status(formatedError.error.code).json(formatedError);
  }
};



export const usersController = {
  createUser,
  getAllUser,
  getSingleUser,
  updatedUser,
  deleteUser,
  insertProduct,
  getAllOrdersById,
  calculatePrice
};
