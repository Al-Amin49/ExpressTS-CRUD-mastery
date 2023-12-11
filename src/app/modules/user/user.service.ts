
import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB=async(userData:TUser)=>{
    if(await User.isUserExists(Number(userData.userId))){
        throw new Error('User not found')
       }
    const result= await User.create(userData)
    return result
}
const getAllUsersFromDB=async()=>{
    const result = await User.find().select(
        "userId username fullName age email address "
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
const insertProductToDB=async(userId:number|string, productData:TOrder)=>{
const {productName, price, quantity}=productData;
await User.findOneAndUpdate(
    { userId, 'orders': { $exists: true } },
    { $push: { 'orders': { productName, price, quantity } } },
    { upsert: true, new: true }
  );
return null;

}
const getOrdersByIdFromDB=async(userId:number | string)=>{
const result=User.findOne({userId:userId}).select('orders')

return result;
}
const calculatePriceFromDB=async(userId:number | string)=>{
    const user= await User.findOne({userId:userId}).select('orders').lean()
    if (!user) {
        throw new Error('User not found');
      }
      const totalPrice = (user?.orders || []).reduce(
        (total: number, order:{ price?: number; quantity: number }) => {
          return total + (order.price || 0) * (order.quantity || 0);
        },
        0
      );
      return totalPrice;
    };







export const userServices ={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    insertProductToDB,
    getAllOrdersFromDB: getOrdersByIdFromDB,
    calculatePriceFromDB
}