import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(255),
    description: z.string().optional(),
    price: z.number().positive('Price must be positive'),
  }),
});

export type CreateProductDto = z.infer<typeof createProductSchema>['body'];
