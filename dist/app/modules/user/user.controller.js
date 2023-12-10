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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const result = yield user_service_1.userServices.createUserIntoDB(userData);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result
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
            data: allusers
        });
    }
    catch (err) {
        const formatedError = (0, formatError_1.default)(500, err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const singleUser = yield user_service_1.userServices.getSingleUserFromDB(userId);
        if (singleUser === null) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'single user fetched successfully',
            data: singleUser
        });
    }
    catch (err) {
        const formatedError = (0, formatError_1.default)(500, 'Something went wrong', err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
exports.usersController = {
    createUser,
    getAllUser,
    getSingleUser
};
