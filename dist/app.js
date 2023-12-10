"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user.route");
const not_found_1 = __importDefault(require("./error-handling/not-found"));
const app = (0, express_1.default)();
//adding parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use('/api', user_route_1.userRoutes);
//not found route
app.use(not_found_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
