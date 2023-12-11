"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createOrderSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
const fullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().min(1).max(15),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
});
const orderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const createUserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(1).max(20),
    fullName: fullNameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressSchema,
    orders: zod_1.z.array(orderSchema),
});
exports.createUserValidationSchema = createUserValidationSchema;
const createOrderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.createOrderSchema = createOrderSchema;
const updateUserSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(1).max(20),
    fullName: fullNameSchema.optional(), // Make the properties optional
    age: zod_1.z.number().optional(),
    email: zod_1.z.string().email().optional(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: addressSchema.optional(),
    orders: zod_1.z.array(orderSchema).optional(),
});
exports.updateUserSchema = updateUserSchema;
