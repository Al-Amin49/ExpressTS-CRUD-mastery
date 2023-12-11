import { Types } from "mongoose";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB=async(userData:TUser)=>{
   
    const UserInfo=new User(userData);
    if(await UserInfo.isUserExists(userData.userId)){
        throw new Error('User already exists')
    }
   const result= await UserInfo.save()
    return result
}
const getAllUsersFromDB=async()=>{
    const result = await User.find({}, {orders:0, _id:false}).exec()
    return result
}
const getSingleUserFromDB=async(userId:string)=>{
    const result =await User.findOne({userId:userId}, {orders:0, _id:false}).exec();
    if(!result){
        throw new Error('User not found')
    }
    return result;
}

const updateUserFromDB = async (userId: number, userData: Partial<TUser>): Promise<TUser | null> => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            userData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw new Error('Invalid userId format');
    }
};


const deleteUserFromDB=async(userId:string)=>{
    const result= await User.findByIdAndDelete(userId)
    return result;
}
export const userServices ={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
}