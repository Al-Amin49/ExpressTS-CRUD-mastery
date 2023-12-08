import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB=async(userData:TUser)=>{
    const result = await User.create(userData)
    return result
}
const getAllUsersFromDB=async()=>{
    const result = await User.find()
    return result
}
const getSingleUserFromDB=async(id:string)=>{
    const result =await User.findOne({id:id});
    return result;
}
const updateUserFromDB=async(id:string, userData:TUser)=>{
const result= await User.findByIdAndUpdate(id, userData, {
    new:true,
    runValidators:true
})
return result
}
const deleteUserFromDB=async(id:string)=>{
    const result= await User.findByIdAndDelete(id)
    return result;
}
export const userServices ={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
}