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
        const userData = req.body;
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
        console.log(err);
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
        const { userId } = req.params;
        const userData = req.body;
        const zodParsedData = user_validation_1.createUserValidationSchema.parse(userData);
        console.log('parse data', zodParsedData);
        const result = yield user_service_1.userServices.updateUserFromDB(userId, zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (err) {
        console.error('Error in update process:', err.message);
        if (err.message === 'User not found') {
            return res
                .status((0, formatError_1.default)(404, err.message).error.code)
                .json((0, formatError_1.default)(404, err.message));
        }
        const formatedError = (0, formatError_1.default)(500, err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deletedUser = yield user_service_1.userServices.deleteUserFromDB(Number(userId));
        if (deletedUser) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error',
        });
    }
});
exports.usersController = {
    createUser,
    getAllUser,
    getSingleUser,
    updatedUser,
    deleteUser
};
