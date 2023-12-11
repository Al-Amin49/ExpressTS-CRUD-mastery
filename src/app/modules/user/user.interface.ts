import { Model } from 'mongoose';

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};
//implement a custom static method
export interface UserModel extends Model<TUser>{
  isUserExists(userId:number):Promise<TUser | null>
}
