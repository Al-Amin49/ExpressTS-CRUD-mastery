import { Request, Response } from 'express';
import formatError from '../../../error-handling/formatError';
import { userServices } from './user.service';
import { createUserValidationSchema, updateUserSchema } from './user.validation';

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
      message: 'User retrived successfully',
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
      message: 'single user fetched successfully',
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
      const userData = req.body;
      console.log('user data', userData)
      const userId = req.params.userId;
      const userId2 = Number(userId);
     
      const zodParsedData = updateUserSchema.safeParse({user:userData});
      console.log('parsed data', zodParsedData)
      const result = await userServices.updateUserFromDB(userId2, userData);
      console.log('result',result)
   
      res.status(200).json({
          success: true,
          message: 'User updated successfully',
          data: result,
      });
  } catch (err: any) {
    console.error('Error in update process:', err.message);
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
    const  userId  = req.params.userId;
    const deletedUser = await userServices.deleteUserFromDB(Number(userId));

    if (deletedUser) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
};



export const usersController = {
  createUser,
  getAllUser,
  getSingleUser,
  updatedUser,
  deleteUser
};
