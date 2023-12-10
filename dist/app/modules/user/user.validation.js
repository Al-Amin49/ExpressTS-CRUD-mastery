"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20).refine(value => /^[A-Z][a-z]*$/.test(value), {
        message: 'First name is not in capitalize format',
    }),
    lastName: zod_1.z.string().min(1).max(15),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
});
const orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userValidationSchemaZod = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(1).refine(value => /^[a-zA-Z0-9]+$/.test(value), {
        message: 'Username must be alphanumeric',
    }),
    password: zod_1.z.string().min(1).max(20),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number().min(1).max(99),
    email: zod_1.z.string().min(1).refine(value => /^\S+@\S+\.\S+$/.test(value), {
        message: 'Invalid email address',
    }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
    orders: zod_1.z.array(orderValidationSchema),
});
exports.default = userValidationSchemaZod;
