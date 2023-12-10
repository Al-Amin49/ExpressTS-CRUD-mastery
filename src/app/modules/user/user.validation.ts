import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).refine(value => /^[A-Z][a-z]*$/.test(value), {
    message: 'First name is not in capitalize format',
  }),
  lastName: z.string().min(1).max(15),
});

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const orderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchemaZod = z.object({
  userId: z.number(),
  username: z.string().min(1).refine(value => /^[a-zA-Z0-9]+$/.test(value), {
    message: 'Username must be alphanumeric',
  }),
  password: z.string().min(1).max(20),
  fullName: fullNameValidationSchema,
  age: z.number().min(1).max(99),
  email: z.string().min(1).refine(value => /^\S+@\S+\.\S+$/.test(value), {
    message: 'Invalid email address',
  }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
});

export default userValidationSchemaZod;
