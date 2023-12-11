"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        maxlength: [15, 'Last Name can not be more than 15 characters']
    }
}, { _id: false });
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    }
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    }
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'Id is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'passwor is required'],
        maxlength: [20, 'Password can not be more than 20 characters']
    },
    fullName: {
        type: fullNameSchema,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hobbies: {
        type: [String],
    },
    address: {
        type: addressSchema,
        required: true
    },
    orders: {
        type: [orderSchema]
    }
});
//middleware for password hashing
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const user = this;
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        catch (error) {
            next(error);
        }
        finally {
            next();
        }
    });
});
//for removing password field after response
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
userSchema.methods.isUserExists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield exports.User.findOne({ userId: userId });
    return existingUser;
});
exports.User = (0, mongoose_1.model)('User', userSchema);
