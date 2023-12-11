
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB=async(userData:TUser)=>{
    if(await User.isUserExists(Number(userData.userId))){
        throw new Error('User aready exists')
       }
    const result= await User.create(userData)
    return result
}
const getAllUsersFromDB=async()=>{
    const result = await User.find().select(
        "userId username fullName age email address"
      );
    return result
}
const getSingleUserFromDB=async(userId:number | string)=>{
    
    const result =await User.findOne({userId:userId}, {orders:0}).exec();
    
    if(!result){
        throw new Error('User not found')
    }
    return result;
}

const updateUserFromDB = async (userId: number | string, userData:Partial<TUser>):Promise<TUser |null>=> {

    const result = await User.findOneAndUpdate(
              {userId} ,
            {$set: userData},
            { new: true, runValidators: true, projection:{orders:0} }, 
        )
        return result;
    
};


const deleteUserFromDB=async(userId:number | string)=>{
  await User.findOneAndUpdate({userId:userId})
    return null;
}
export const userServices ={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
}