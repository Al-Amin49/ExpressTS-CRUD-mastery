"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatError = (statusCode, message, description) => ({
    success: false,
    message,
    error: {
        code: statusCode,
        description: description || message,
    },
});
exports.default = formatError;
