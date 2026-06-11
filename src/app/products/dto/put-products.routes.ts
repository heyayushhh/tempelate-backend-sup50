import { z } from 'zod';

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid product ID'),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
  }),
});

export type UpdateProductDto = z.infer<typeof updateProductSchema>['body'];
