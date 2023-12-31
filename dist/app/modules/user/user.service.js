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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(Number(userData.userId))) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select("userId username fullName age email address ");
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId: userId }, { orders: 0 }).exec();
    if (!result) {
        throw new Error('User not found');
    }
    return result;
});
const updateUserFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, { $set: userData }, { new: true, runValidators: true, projection: { orders: 0 } });
    return result;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findOneAndUpdate({ userId: userId });
    return null;
});
const insertProductToDB = (userId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, price, quantity } = productData;
    yield user_model_1.User.findOneAndUpdate({ userId, 'orders': { $exists: true } }, { $push: { 'orders': { productName, price, quantity } } }, { upsert: true, new: true });
    return null;
});
const getOrdersByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.findOne({ userId: userId }).select('orders');
    return result;
});
const calculatePriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ userId: userId }).select('orders').lean();
    if (!user) {
        throw new Error('User not found');
    }
    const totalPrice = ((user === null || user === void 0 ? void 0 : user.orders) || []).reduce((total, order) => {
        return total + (order.price || 0) * (order.quantity || 0);
    }, 0);
    return totalPrice;
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    insertProductToDB,
    getAllOrdersFromDB: getOrdersByIdFromDB,
    calculatePriceFromDB
};
