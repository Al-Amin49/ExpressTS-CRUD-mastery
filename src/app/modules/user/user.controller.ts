import { Request, Response } from "express";
import formatError from "../../../error-handling/formatError";
import { userServices } from "./user.service";
import sendResponse from "../../../error-handling/success";


const createUser=async(req:Request, res:Response)=>{
 try{
    const {user:userData}=req.body;
    const result= await userServices.createUserIntoDB(userData);
    
    res.status(201).json({
        success:true,
        message:'User created successfully',
        data:result
    })
    // sendResponse(res, 201, 'User created successfully', result)

    }catch(err:any){
        const formatedError= formatError(500, 'Something went wrong', err.message)
        res.status(formatedError.error.code).json(formatedError)
    }
}
export const usersController={
    createUser
}