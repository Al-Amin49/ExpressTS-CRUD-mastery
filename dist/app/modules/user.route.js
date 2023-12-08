"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user/user.controller");
const router = express_1.default.Router();
router.route('/users').get(user_controller_1.usersController.getAllUser).post(user_controller_1.usersController.createUser);
exports.userRoutes = router;
