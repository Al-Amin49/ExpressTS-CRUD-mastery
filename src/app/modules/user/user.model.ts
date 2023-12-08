import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";

const fullNameSchema= new Schema<TFullName>({
    firstName:{
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
        validate: {
          validator: function (value: string) {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            return firstNameStr === value; 
          },
          message: '{VALUE} is not in capitalize format',
        },
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required'],
        maxlength:[15 ,'Last Name can not be more than 15 characters']
    }
})

const addressSchema=new Schema<TAddress>({
    street:{
        type:String,
        required:[true, 'Street is required']
    },
    city:{
        type:String,
        required:[true, 'City is required']
    },
    country:{
        type:String,
        required:[true, 'Country is required']
    }
})

const orderSchema= new Schema<TOrder>({
    productName:{
        type:String,
        required:[true, 'Product name is required']
    },
    price:{
        type:Number,
        required:[true, 'Price is required']
    },
    quantity:{
        type:Number,
        required:[true, 'Quantity is required']
    }
})
const userSchema= new Schema<TUser>({
    userId:{
        type:Number,
        required:[true, 'Id is required'],
        unique:true
    },
    username:{
        type:String,
        required:[true, 'username is required'],
        unique:true
    },
    password: {
        type: String,
        required:[true, 'passwor is required'],
        maxlength:[20, 'Password can not be more than 20 characters']
      },
    fullName:{
        type:fullNameSchema,
        required:true
    },
    age:{
        type:Number,
        required:[true, 'Age is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required']
    },
    isActive:{
        type:Boolean,
        default:true
    },
    hobbies:{
        type:[String],
    },
    address:{
        type:addressSchema,
        required:true
    },
    orders:{
        type:[orderSchema]
    }
})

export const User= model<TUser>('User', userSchema);