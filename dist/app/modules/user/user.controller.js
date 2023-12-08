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
const success_1 = __importDefault(require("../../../error-handling/success"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const result = yield user_service_1.userServices.createUserIntoDB(userData);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result
        });
        (0, success_1.default)(res, 201, 'User created successfully', result);
    }
    catch (err) {
        const formatedError = (0, formatError_1.default)(500, 'Something went wrong', err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allusers = yield user_service_1.userServices.getAllUsersFromDB();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: allusers
        });
        (0, success_1.default)(res, 200, 'User retrieved successfully', allusers);
    }
    catch (err) {
        const formatedError = (0, formatError_1.default)(500, 'Something went wrong', err.message);
        res.status(formatedError.error.code).json(formatedError);
    }
});
exports.usersController = {
    createUser,
    getAllUser
};
