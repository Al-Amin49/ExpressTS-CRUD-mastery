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
exports.usersController = void 0;
const formatError_1 = __importDefault(require("../../../error-handling/formatError"));
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const filteredUserData = (userData) => {
    return {
        userId: userData.userId,
        username: userData.username,
        password: userData.password,
        fullName: userData.fullName,
        age: userData.age,
        email: userData.email,
        isActive: userData.isActive,
        hobbies: userData.hobbies,
        address: userData.address,
    };
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const zodParsedData = user_validation_1.createUserValidationSchema.parse(userData);
        const result = yield user_service_1.userServices.createUserIntoDB(zodParsedData);
        const filteredData = filteredUserData(result.toJSON());
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: filteredData,
        });
    }
    catch (err) {
        const formatedError = (0, formatError_1.default)(500, err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allusers = yield user_service_1.userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'User retrived successfully',
            data: allusers,
        });
    }
    catch (err) {
        console.log(err);
        const formatedError = (0, formatError_1.default)(500, err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const singleUser = yield user_service_1.userServices.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'single user fetched successfully',
            data: singleUser,
        });
    }
    catch (err) {
        if (err.message === 'User not found') {
            return res
                .status((0, formatError_1.default)(404, err.message).error.code)
                .json((0, formatError_1.default)(404, err.message));
        }
        const formatedError = (0, formatError_1.default)(500, err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
const updatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        console.log('userData:', userData);
        const { userId } = req.params;
        console.log('userId from params:', userId);
        const userId2 = Number(userId);
        // Ensure that userId is a number
        if (isNaN(userId2)) {
            throw new Error('Invalid userId format');
        }
        console.log('Parsed userId:', userId);
        const zodParsedData = user_validation_1.updateUserSchema.parse(userData);
        console.log('Parsed data:', zodParsedData);
        const result = yield user_service_1.userServices.updateUserFromDB(userId2, zodParsedData);
        console.log(result);
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Error in update process:', error.message);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.usersController = {
    createUser,
    getAllUser,
    getSingleUser,
    updatedUser
};
