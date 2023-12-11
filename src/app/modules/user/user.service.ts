
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
    const result = await User.find({}, {orders:0}).exec()
    return result
}
const getSingleUserFromDB=async(userId:string)=>{
    const result =await User.findOne({userId:userId}, {orders:0}).exec();
    if(!result){
        throw new Error('User not found')
    }
    return result;
}

const updateUserFromDB = async (userId: number | string, userData: Partial<TUser>)=> {
        const result = await User.findOneAndUpdate(
              {userId} ,
            {$set: userData},
            { new: true, runValidators: true ,projection: { orders: 0}}, 
        );
        return result;
    
};


const deleteUserFromDB=async(userId:number)=>{
    const result= await User.findOneAndUpdate({userId:userId})
    return result;
}
export const userServices ={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
}