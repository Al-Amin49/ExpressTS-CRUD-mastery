"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route doesn't exist",
        error: {
            code: 404,
            description: "Route doesn't exist",
        },
    });
};
exports.default = notFound;
