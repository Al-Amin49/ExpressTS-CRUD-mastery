import { z } from 'zod';

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
    userId: z
    .number()
    .refine((data) => data !== undefined, {
      message: 'userId is required',
    })
    .transform((data) => data as number),
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
const validUpdateData = {
  userId: 123,
  username: 'john_doe',
  // ... other fields you want to update
};


const updateUserSchema = createUserValidationSchema.partial();
const isValid = updateUserSchema.safeParse(validUpdateData);
console.log(isValid);
const updateOrderSchema = createOrderSchema.partial();

export {
  createUserValidationSchema,
  createOrderSchema,
  updateUserSchema,
  updateOrderSchema,
};
