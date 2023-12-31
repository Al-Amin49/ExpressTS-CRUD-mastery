import {  z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(15),
});

const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const createUserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().min(1).max(20),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema),
});
const createOrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});
const updateUserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().min(1).max(20),
  fullName: fullNameSchema.optional(), // Make the properties optional
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: addressSchema.optional(),
  orders: z.array(orderSchema).optional(),
});

export {
  createUserValidationSchema,
  createOrderSchema,
  updateUserSchema
};
