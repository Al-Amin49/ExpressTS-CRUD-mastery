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
    const result = await User.find({}, {orders:0})
    return result
}
const getSingleUserFromDB=async(userId:string)=>{
    const result =await User.findOne({userId:userId});
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