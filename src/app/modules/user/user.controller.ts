import { Request, Response } from "express";
import formatError from "../../../error-handling/formatError";
import { userServices } from "./user.service";
import userValidationSchemaZod from "./user.validation";

const filteredUserData=(userData:any)=>{
return {
    userId:userData.userId,
    username:userData.username,
    password:userData.password,
    fullName:userData.fullName,
    age:userData.age,
    email:userData.email,
    isActive:userData.isActive,
    hobbies:userData.hobbies,
    address:userData.address
}
}
const createUser=async(req:Request, res:Response)=>{
 try{

    const {user:userData}=req.body;
    const zodParsedData= userValidationSchemaZod.parse(userData)
    const result= await userServices.createUserIntoDB(zodParsedData);
    const filteredData= filteredUserData(result)
    
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: filteredData
      });

    }catch(err:any){
        const formatedError= formatError(500, err.message)
        res.status(formatedError.error.code).json(formatedError)
    }
}

const getAllUser=async(req:Request, res:Response)=>{
    try{
        const allusers= await userServices.getAllUsersFromDB()
     
        res.status(200).json({
            success: true,
            message: 'User retrived successfully',
            data: allusers
          });
    }catch(err:any){
        const formatedError= formatError(500, err.message)
        res.status(formatedError.error.code).json(formatedError)
    }
}
const getSingleUser=async(req:Request, res:Response)=>{
    try{
        const {userId}=req.params;
        const singleUser= await userServices.getSingleUserFromDB(userId)
       
        if (singleUser === null) {
            return res.status(404).json({
              success: false,
              message: 'User not found',
            });
          }
        res.status(200).json({
            success: true,
            message: 'single user fetched successfully',
            data: singleUser
          });
    }catch(err:any){
        const formatedError= formatError(500, 'Something went wrong', err.message)
        res.status(formatedError.error.code).json(formatedError)
    }
}


export const usersController={
    createUser,
    getAllUser,
    getSingleUser
}